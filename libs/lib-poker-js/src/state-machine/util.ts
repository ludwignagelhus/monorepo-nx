import { tuple } from "fp-ts-std";
import { PokerTable } from "../tmp/table/table";
import * as A from "fp-ts/Array";

/* Needs this a bunch of places. */
/* Put in util module? */

/* This is probably some of the most complicated game logic. */
export const bumpPlayerToAct = (table: PokerTable) => {
  const t = table;
  const iCurrent = table.playerToAct;

  /* Rearrange seats so that current is at index 0. */
  const psIAndSeat = table.seats.map((s, i) => tuple.create([i, s]));
  const rearranged = A.rotate(t.playerToAct)(psIAndSeat);

  const next = rearranged.find(([i, s]) => canAct(s));

  /* who is the next player... */
  /* - has cards */
  /* - has chips */
  /* - */

  /* how to handle when nextToAct is sitting out... */

  /* handle in state machine? */
  /* after ... an action */

  /* when player to act gets bumped... also handle folding when next to act is sitting out? */
  /* ie. depend on fold action. */

  return t;
};

export const canAct = (seat: Seat) =>
  seat.kind === "taken" && seat.player.cards.length > 0 && seat.player.stack > 0;
