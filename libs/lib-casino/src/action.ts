import { TableConfig } from "@banano-casino/lib-poker-js";
import { Action, mkTableAction } from "@banano-casino/lib-shared";

/* # # # Actions for making things happen. # # # */

// Convention: prefix with "req" for requests which can fail.
// Also, such actions will typically be client->server, and on success will result in
// different-yet similar-action being broadcasted to listeners.
// ...or naa. Only use prefix req, when client initiating an action does not have all necessary info
// for action to be shared with other clints. What are examples of such situations?

// Hence; there are 2 kinds of actions:
// first kind of action are client made, used to update server state and finally broadcast back
// to listening clients in their original form--the other kind is also made by clients and used to do state changes,
// but result in a different message being broadcasted to listening clients than the original action itself.

// All actions should also have an id? And also the id of prev action.
// Keep track of last action sent in a room; then clients will always know
// whether they have received all actions.
// Server keeps some actions in a list such that clients who have not received all actions can
// have the missing actions re-sent.

// Move this to somewhere else...
export type Action = ReturnType<typeof mkAction[keyof typeof mkAction]>;
// const fooAction: Action = { kind: "sitIn" };

/* TODO?: considering putting poker related actions into the poker lib. */
/* Table actions, lobby etc can stay in casino lib, though. */

export const mkAction = {
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
  tableVisit: (arg: {}) => Action("tableVisit"),
  tableLeave: (arg: {}) => Action("tableAdded"),
  tableRemoved: mkTableAction("tableRemoved"), // server

  // = = = misc = = =
  // misc. things to be implemented later

  // sending chat; results in
  sendChat: (room: string, text: string) => ({ ...mkTableAction("chat") }),
  chatMessage: (msg: ChatMessage) => ({ ...Action("chatMessage"), ...msg }),

  // = = = tournaments = = =

  // tournament (both mtt and sngs?)
  // both join and rebuy? but want to alert other players at table, that a player
  // rebought, and not joined when they do rebuy. Probably add rebuy as separate action.
  tournamentJoin: (/* id: Tournament["id"] */) => ({ ...mkTableAction("joinTournament") }),
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
