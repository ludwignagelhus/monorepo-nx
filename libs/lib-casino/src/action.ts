import { Card, TableConfig } from "@banano-casino/lib-poker-js";
import * as R from "fp-ts/Record";

/* # # # Actions for making things happen. # # # */

// Convention: prefix with "req" for requests which can fail.
// Also, such actions will typically be client->server, and on success will result in
// different-yet similar-action being broadcasted to listeners.

// Hence; there are 2 kinds of actions:
// first kind of action are client made, used to update server state and finally broadcast back
// to listening clients in their original form--the other kind is also made by clients and used to do state changes,
// but result in a different message being broadcasted to listening clients than the original action itself.

// All actions should also have an id? And also the id of prev action.
// Keep track of last action sent in a room; then clients will always know
// whether they have received all actions.
// Server keeps some actions in a list such that clients who have not received all actions can
// have the missing actions re-sent.

const Action = <T extends string>(name: T) => ({ kind: name });

const mkTableAction =
  <T extends string>(name: T) =>
  (table: string) => ({ ...Action(name), table });

export type Action = ReturnType<typeof mkAction[keyof typeof mkAction]>;
// const fooAction: Action = { kind: "sitIn" };

export const mkAction = {
  // = = = table play = = =

  // preflop
  initNewHand: mkTableAction("initNewHand"),

  reqStraddle: mkTableAction("reqStraddle"),
  straddle: mkTableAction("straddle"),

  dealCards: mkTableAction("dealCards"),

  check: mkTableAction("check"),
  call: mkTableAction("call"),
  fold: mkTableAction("fold"),
  raise: (table: string, amount: number) => ({ ...Action("raise"), amount, table }),

  // pre-showdown
  reqDealTwice: mkTableAction("reqDealTwice"),
  dealTwice: mkTableAction("dealTwice"),

  // server initiated game actions
  flop: (cards: [Card, Card, Card], table: string) => ({ ...Action("flop"), cards, table }),
  turn: (cards: [Card, Card, Card], table: string) => ({ ...Action("turn"), cards, table }),
  river: (cards: [Card, Card, Card], table: string) => ({ ...Action("river"), cards, table }),

  // showdown events
  // Find players hand when their holecards are turned over.
  showHolecards: (seat: number, cards: Card[]) => ({ ...Action("showHolecards"), seat, cards }),
  announceWinner: (seat: number) => ({ ...Action("announceWinner") }), // how exactly will work?

  // = = = table misc = = =
  // Some actions are a bit different? Actions pertainig to joing/leaving things
  //   >> "transactional" in nature.
  // In these situations... client->server and server->SM may be different?
  // Or needn't be? Here can also verify that incoming transaction actions are valid.

  reqSeat: (seat: number) => ({ ...mkTableAction("requestSeat"), seat }),
  occupySeat: (arg: { seat: number; displayName: string; chips: number }) => ({
    ...mkTableAction("occupySeat"),
    ...arg,
  }),

  addChips: (amount: number) => ({ ...mkTableAction("addChips"), amount }),

  sitOut: mkTableAction("sitOut"),
  sitIn: (postBlinds: boolean) => ({ ...mkTableAction("sitIn"), postBlinds }),

  seatLeave: (seat: number) => ({ ...mkTableAction("reserveSeat"), seat }),

  // = = = other misc. = = =
  lobbyJoin: () => ({ ...Action("lobbyJoin") }),
  lobbyLeave: () => ({ ...Action("lobbyLeave") }),
  /* TODO: data needed to display table in lobby */
  tableAdded: (arg: {}) => Action("tableAdded"), // server
  tableRemoved: mkTableAction("tableRemoved"), // server

  // = = = misc = = =
  // misc. things to be implemented later

  // hmm...

  // sending chat; results in
  sendChat: (room: string, text: string) => ({ ...mkTableAction("chat") }),
  chatMessage: (msg: ChatMessage) => ({ ...Action("chatMessage"), ...msg }),

  // = = = tournaments = = =

  // tournament (both mtt and sngs?)
  tournamentJoin: (/* id: Tournament["id"] */) => ({ ...mkTableAction("joinTournament") }), // both join and rebuy
  buyAddOn: (/* id: Tournament["id"] */) => ({ ...Action("buyAddOn") }),
  tournamentStart: () => {},

  // administer tables and private rooms
  reqCreateTable: (config: TableConfig["id"]) => Action("requestCreateTable"),
  inviteToGame: (inviter: string, invitee: string) => Action("inviteToGame"),
  // ^TODO type GameRef = Cashgame["id"] | Tournament["id"];
};

export type ActionName = keyof typeof mkAction;

// This exists in chat lib?
type ChatMessage = {
  room: string;
  message: string;
  author: string;
  timestamp: number;
};

// Move to lobby module?
// TODO
type LobbyTournament = {
  kind: "lobbyTournament";
  name: string;
  start: number;
  buyin: [price: number, fee?: number];
  // need some game config things, too.
};
// Does not need to be a complete table? Only need parts of table to display it in lobby. Use `Pick<PokerTable>`, then.
type LobbyCashTable = {
  kind: "lobbyCashTable";
  seats: ({ chips: number; displayName: string } | null)[];
  name: string;
  blinds: number[];
  betLimit: "";
};
