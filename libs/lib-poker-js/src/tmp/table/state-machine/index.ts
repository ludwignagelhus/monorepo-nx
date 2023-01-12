import { table } from "@banano-casino/lib-casino";
import { Card, Deck, isPlaying, PokerTable } from "@banano-casino/lib-poker-js";
import { Action } from "@banano-casino/lib-shared";
import { bumpPlayerToAct } from "./util";

/* TODO: some actions will have special "rules" to prevent exploits; */
/* eg. cannot leave and join same table to reduce ones stack. */
/* What do IRL casinos say about this? */

/* TODO?: write descriptions for action "side effects" which are non obvious; */
/* ie. toggling on posting blinds early also sets players "post blinds" to true. */

export type PokerAction = ReturnType<typeof poker[keyof typeof poker]>;

/* TODO: when have most actions complete, use array of actions names and Action to define the actions. */
export const poker = {
  ...table,
  // = = = table play = = =

  initNewHand: () => Action("initNewHand"), // server
  // belonging to initNewHand
  dealHolecards: () => {},

  // hand init
  postBlind: (iBlind: number) => ({ ...Action("postBlind"), iBlind }), // split into each blind..?
  togglePostBlinds: (seat: number) => ({ ...Action("togglePostBlinds"), seat }), // client->server
  postBlindsEarly: () => Action("postBlindsEarly"),
  bumpDealerPosition: () => Action("bumpDealerPosition"),
  postAntes: () => Action("postAntes"), // server->client

  straddle: () => Action("straddle"), // client->server
  dealCards: () => Action("dealCards"), // server->client

  // preflop
  check: () => Action("check"),
  call: () => Action("call"),
  fold: () => Action("fold"),
  raise: (amount: number) => ({ ...Action("raise"), amount }),

  // misc gameplay
  reqDealTwice: () => Action("reqDealTwice"),
  dealTwice: () => Action("dealTwice"),

  // server initiated game actions
  flop: (cards: [Card, Card, Card]) => ({ ...Action("flop"), cards }),
  turn: (cards: [Card, Card, Card]) => ({ ...Action("turn"), cards }),
  river: (cards: [Card, Card, Card]) => ({ ...Action("river"), cards }),

  // showdown events
  // Reveal and find players hand when their holecards are turned over.
  // Server reveals hole cards and winner(s).;
  showHolecards: (seat: number, cards: Card[]) => ({ ...Action("showHolecards"), seat, cards }),
  announceWinner: (seat: number) => ({ ...Action("announceWinner") }), // how exactly will work?
};

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
/* That can be done in parent scope with setTimeout probably. */
type initHand = (table: PokerTable) => [PokerTable, PokerAction[]];
export const initHand: initHand = (table) => {
  const t = table;
  const actions: PokerAction[] = [];

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

/* Actually... new plan: */
/* room name will be table name; ie. don't take table name to update a table in state. */

type updateTable = (t: PokerTable, action: PokerAction) => [PokerTable, PokerAction[]];
export const updateTable: updateTable = (table, action) => {
  return [table, [action]];
};
