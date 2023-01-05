import { Action, mkTableAction } from "@banano-casino/lib-shared";
import { Card, Deck } from "../shared/card";
import { isPlaying, PokerTable } from "../tmp/table/table";
import { bumpPlayerToAct } from "./util";

/* TODO: some actions will have special "rules" to prevent exploits; */
/* eg. cannot leave and join same table to reduce ones stack. */
/* What do IRL casinos say about this? */

/* TODO?: write descriptions for action "side effects" which are non obvious; */
/* ie. toggling on posting blinds early also sets players "post blinds" to true. */

type PokerAction = ReturnType<typeof poker[keyof typeof poker]>;

/* TODO: when have most actions complete, use array of actions names and mkTableAction to define the actions. */
export const poker = {
  // = = = table play = = =

  initNewHand: mkTableAction("initNewHand"),
  // belonging to initNewHand
  dealHolecards: () => {},

  // hand init
  postBlind: (iBlind: number) => ({ ...Action("postBlind"), iBlind }), // split into each blind..?
  togglePostBlinds: () => mkTableAction("togglePostBlinds"), // client->server
  postBlindsEarly: () => mkTableAction("postBlindsEarly"),
  bumpDealerPosition: () => mkTableAction("bumpDealerPosition"),
  postAntes: () => mkTableAction("postAntes"), // server->client

  straddle: mkTableAction("straddle"),
  dealCards: mkTableAction("dealCards"),

  // preflop
  check: mkTableAction("check"),
  call: mkTableAction("call"),
  fold: mkTableAction("fold"),
  raise: (table: string, amount: number) => ({ ...Action("raise"), amount, table }),

  //
  reqDealTwice: mkTableAction("reqDealTwice"),
  dealTwice: mkTableAction("dealTwice"),

  // server initiated game actions
  flop: (cards: [Card, Card, Card], table: string) => ({ ...Action("flop"), cards, table }),
  turn: (cards: [Card, Card, Card], table: string) => ({ ...Action("turn"), cards, table }),
  river: (cards: [Card, Card, Card], table: string) => ({ ...Action("river"), cards, table }),

  // showdown events
  // Reveal and find players hand when their holecards are turned over.
  // Server reveals hole cards, but don't need to announce hand strength and winner;
  // All this can be re computed client side->minimize network traffic.
  // What is usually bottleneck on websocket servers?
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

type updateTable = (table: PokerTable, action: TableAction) => [PokerTable, TableAction[]];
export const updateTable: updateTable = (table, action) => {
  return [table, [action]];
};
