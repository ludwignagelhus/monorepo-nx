import { Card, Deck } from "../shared/card";
import { isPlaying, PokerTable } from "../tmp/table/table";
import { bumpPlayerToAct } from "./util";

/* Some of these things can be lenses? */
/* Can use same lenses on config objects and tables. */
/* ?If so, put lenses next to their types? */
/* Can also think about using the other kind of lens... which is not called a lens. */
/* "Optional" lenses. Is some kind of optic, anyway. */

/* One action per kind of "thing" which can happen on the table. */
/* Each thing is representable as something which happens on the players screen. */

/* TODO: some actions will have special "rules" to prevent exploits; */
/* eg. cannot leave and join same table to reduce ones stack. */
/* What do IRL casinos say about this? PokerStars doesn't allow it. */

/* TODO?: have a stash which has some code for actions. */
/* Some overlap, but also some things which are missing now? */
/* Find out what is missing and useful and copy the code over to HEAD. */

/* Somewhere want a union type of app actions in app... */

/* Ie. table action. */
export type TableAction =
  | { kind: "call" }
  | { kind: "fold" }
  | { kind: "check" }
  | { kind: "raise"; chips: number }
  | { kind: "straddle" }
  | { kind: "postOtherBlind"; blindIndex: number } // for when have more than 2 blinds.
  | { kind: "postBigBlind" }
  | { kind: "postSmallBlind" }
  | { kind: "togglePostBlindsEarly" } // when player doesn't want to wait for big blind to begin playing
  | { kind: "postAntes" }
  | { kind: "toggleTimebank" }
  | { kind: "sitOut" }
  | { kind: "sitIn" }
  | { kind: "claimSeat" }
  | { kind: "leaveSeat" }
  | { kind: "addChips"; chips: number }
  | { kind: "changeGameConfig"; chips: number } // hmm... or table refers to config object?
  | { kind: "dealHoleCards"; holecardSth: Card[][] } // hmm
  | { kind: "communityCards"; cards: Card[] }
  | { kind: "startNewHand" }; // clears

// table-prop only used to "route action to the right place".
type ClientTableAction = TableAction & { table: PokerTable["id"] };

const fa: ClientTableAction = { kind: "addChips", chips: 50, table: "foo" };

const call = (table: PokerTable) => {
  /* can call? */
  /* - has cards is in the hand? (how can check for this? enough if player has cards i think...) */
  /* - street bet is 0. */
  /* - player is not already all in */
  const t = table;
  const seat = t.seats[t.playerToAct];

  if (seat.kind !== "taken") return table;
  const player = seat.player;

  const hasChips = player.stack;

  // t.playerToAct[]
  // t.seats[t.playerToAct]

  return table;
};

const fold = (table: PokerTable) => {
  let t = table;
  const seat = t.seats[t.playerToAct];
  if (seat.kind !== "taken") return t;
  seat.player.cards = [];
  t = bumpPlayerToAct(t);
  return t;
};

/* Maybe some clock thing? For modes when want to rotate game configs/tournaments etc. */
type initHand = (table: PokerTable) => [PokerTable, TableAction[]];
export const initHand: initHand = (table) => {
  const t = table;
  const actions: TableAction[] = [];

  t.deck = Deck();

  if (t.dealer < 0) {
    // n players...
    const nPlayers = t.seats.filter((s) => s.kind === "taken" && isPlaying(s.player));
  }

  /* what if some players went bust last hand... */
  /* auto rebuy/top-up? */
  /* top up happens after winner is declared, and before initHand. */
  /* can reload during next hand/before next bb; */
  /*   have already posted blinds, so can join again without posting blinds. */

  /* - bump dealer position. */
  /* - new shuffled deck. */
  /* - position blinds. */
  /* - post bb+sb for new players not waiting for bb. */
  /* - post antes */
  /* - check for straddles. (should be able to straddle from beginning of hand, until cards have been dealt). */
  /*     how should card dealing work? see 1 and 1 card, or wait to see all of ones hole cards, until they have all been dealt? */

  /* straddling complicates things... if wanna support straddle, players need time to be able to click straddle. */
  /*   after a player straddles, a couple seconds should be given to next player to be able to double-straddle. */
  /*   But this means straddling and dealing cards cannot be part of the same state machine action? */
  /*   -> Split into action/initHand, action/straddle, and action/dealHoleCards? */

  /* - deal cards to players. */

  return [t, actions];
};

type updateTable = (table: PokerTable, action: TableAction) => [PokerTable, TableAction[]];
export const updateTable: updateTable = (table, action) => {
  return [table, [action]];
};
