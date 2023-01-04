import { tuple } from "fp-ts-std";
import * as A from "fp-ts/Array";
import { flow as f, pipe as p } from "fp-ts/lib/function";
import { fst, snd } from "fp-ts/lib/Tuple";
import * as NEA from "fp-ts/NonEmptyArray";
import { Card } from "../shared/card";
import { getHandValueHelper } from "./getHandValue";
import { handComparator } from "./handComparator";
import { ConfigHandStrength } from "./shared";

type Index = number;

/* TODO: clean up these comments. */

/* 1. who is the winner? -> getWinners(holecards, community cards) */
/* 2. which hand values do the various hole cards form? -> getHandValue(cards for finding) */

/* Need to go deeper before can see the solution/how to layout logic. */

/* Also, what to return? only indexes of winners, or indexes AND the card making up their hand? */
/* Writing tests for this will make it clearer? */

/* Where to figure out which of a player's holecard permutation is the best? */
/* Means config must be passed around for the recursive calls? */

/* Maybe "need" logic to give suits "presedence" for being used in a made hand in case mutiple cards may be used for some hand. */
/* Or maybe nah? If a tie, want both players to use the same amount of holecards for their hand. */
/* In such a case... would need to tag cards with either "" or "". */

/* TODO: should take hand values. should not find hand values. */
/*   -> want to separate domains of functions. */
type getWinners = (
  cardsOfPlayers: NEA.NonEmptyArray<Card[]>, // TODO: Learn naming conventions for nested arrays.
  communityCards: Card[],
  config?: ConfigHandStrength
) => NEA.NonEmptyArray<Index>;
export const getWinners: getWinners = (cardsOfPlayers, communityCards) => {
  const hands = p(cardsOfPlayers, NEA.map(f(NEA.concat(communityCards), getHandValueHelper)));

  const [head, tail] = NEA.unprepend(hands);
  const psIAndHand = tail.reduce((ac, h, i) => {
    const res = handComparator(h, snd(NEA.head(ac)));
    if (res === 1) return NEA.of(tuple.create([i + 1, h]));
    if (res === 0) return A.append(tuple.create([i + 1, h]))(ac);
    return ac;
  }, NEA.of(tuple.create([0, head])));

  return NEA.map(fst)(psIAndHand);
};

/* Can make use of some fp-ts generic fn type here? Comparator? */
