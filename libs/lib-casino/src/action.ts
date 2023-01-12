import { TableConfig } from "@banano-casino/lib-poker-js";
import { Action } from "@banano-casino/lib-shared";
import { poker } from "@banano-casino/lib-poker-js";

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
// Refactor this to match new architecture of actions.
// Casino can depend on sub game libs? ie. import object with poker
// actions from lib-poker in lib-casino.
// export type Action = ReturnType<typeof casino[keyof typeof casino]>;

type Message = {
  text: string;
  author: string; // username?
  timestamp: string;
};

type Announcement = {
  text: string;
  title: string; // username?
  timestamp: string;
};

const chat = {
  sendChat: (msg: Message) => ({ ...Action("chat") }),
  announcement: (msg: Announcement) => ({ ...Action("announcement") }),
};

const lobby = {
  lobbyJoin: () => ({ ...Action("lobbyJoin") }),
  lobbyLeave: () => ({ ...Action("lobbyLeave") }),

  tableAdded: (arg: {}) => Action("tableAdded"), // server
  tableRemoved: () => ({ ...Action("tableRemoved") }), // server
};

const tournament = {
  // = = = tournaments = = =

  // tournament (both mtt and sngs?)
  // both join and rebuy? but want to alert other players at table, that a player
  // rebought, and not joined when they do rebuy. Probably add rebuy as separate action.
  tournamentJoin: (/* id: Tournament["id"] */) => ({ ...Action("joinTournament") }),
  buyAddOn: (/* id: Tournament["id"] */) => ({ ...Action("buyAddOn") }),
  tournamentStart: () => {},
};

const player = {};

// And then casino is the sum of all namespaces, but still nested under casino under their
// respective name.

// Will work nicely with lenses too?

// Aka. casino action.
export const casino = {
  ...poker,
  ...lobby,
  ...chat,
  ...player,
  ...tournament,
  // administer tables and private rooms
  createTable: (config: TableConfig["id"]) => Action("requestCreateTable"),

  // where to put...
  inviteToGame: (inviter: string, invitee: string) => Action("inviteToGame"),
  // ^TODO type GameRef = Cashgame["id"] | Tournament["id"];
};

export type ActionName = keyof typeof casino;

// This exists in chat lib?
type ChatMessage = {
  room: string;
  message: string;
  author: string;
  timestamp: number;
};

// Move to lobby module?
// And move lobby actions with it?
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
