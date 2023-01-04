import { repeat } from "ramda";
import { Card } from "../../shared/card";
import { CasinoTable } from "../../shared/casinoTable";

export type PokerTable = CasinoTable & {
  deck: Card[];
  communityCards: Card[];
  playerToAct: number;
  dealer: number; // seat index
  gameConfig: PokerConfig;
  seats: Seat[];
};

export type PokerConfig = {
  variant: PokerVariant;
  blinds: number[]; // not a [number, number]-tuple to allow for more than sb and bb.
  rake: number;
  buyin: BuyinConfig;
  bettingLimit: "no-limit" | "pot-limit" | "limit";
  seats: number;
};

type PokerVariant = "holdem" | "omaha";

export type Seat =
  | { kind: "empty" }
  | { kind: "reserved"; timestamp: number }
  | { kind: "taken"; player: TablePlayer };

export type TablePlayer = {
  bet: number; // chips currently on the table; either by betting or calling.
  cards: Card[];
  displayName: string; // point to a player?
  stack: number;
  isSittigOut: boolean;
};

export const isPlaying = (p: TablePlayer) => {
  return p.isSittigOut === false && p.stack > 0;
};

export type TableConfig = {
  id: string;
  name: string;
  gameConfig: PokerConfig;
  admins: string[]; // id of players?

  /* How to handle passwords and invitations? */
  /* Same for tournaments etc? */
  /* Could be an array? if part of some "group", can join, otherwise need */
  /* to provide correct password (if password is enabled). */
  access: "password" | "invitationOnly" | "open";

  spectatable: boolean;

  owner: string; // player.id
};

export const PokerTable: (c: TableConfig) => PokerTable = (config) => {
  /* TableConfig is a subset of table? if so, can do spread? */
  const t: PokerTable = {
    chat: [],
    id: "",
    deck: [],
    gameConfig: config.gameConfig,
    name: config.name,
    seats: repeat({ kind: "empty" }, config.gameConfig.seats),
    spectators: [],
    dealer: 0,
    playerToAct: 0,
    waitingList: [],
    communityCards: [],
  };
  return t;
};

/* On pokerconf or table conf? */
/* Maybe table? like, some (very rarely) might switch between game types on a single table; */
/* like if decide to create HORSE game mode. */
/* Actually... maybe have both? Normally will be configure timebank on... table. */
/* But in some cases, like above, want timebank to persist between different modes. */
/* Also, maybe could create "speed modes", ie. very short time to act, and/or short timebanks. */
/* Do some more reflection on this after gameplay is working. */
type TimebankConfig = {
  // config for how timebank is refilled
  initial: number; // seconds
  refill: {
    kind: "perHand";
    value: number; // seconds to add per time
  };
  max: number;
};

/* Type for buyin? */
/* Cash game buyin & tournament buyin? Will allow for easier type definition. */
type BuyinConfig = {
  min: number;
  max: number;
  normal: number; // rename to "default"?
};

type HandHistoryEntry = {
  players: [null][];
  stake: number;
  tableName: string;
};

/* Maybe one file per type and their lenses? */
type SetPokerConfig = { kind: "setPokerConfig"; config: PokerConfig };

/* How does elm and/or haskell declare type for state machines? */
