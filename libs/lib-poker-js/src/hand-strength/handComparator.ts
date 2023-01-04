import { findIndex } from "fp-ts/lib/Array";
import { pipe as p } from "fp-ts/lib/function";
import * as NEA from "fp-ts/NonEmptyArray";
import * as O from "fp-ts/Option";
import { equals } from "ramda";
import { PokerHand } from "./getHandValue";

/* Does this thing satisfy fp-ts/Ord thingy? */

type handComparator = (h1: PokerHand, h2: PokerHand) => HandComparisonResult;
type HandComparisonResult =
  | -1 // h2 better
  | 0 // tie
  | 1; // h1 better
export const handComparator: handComparator = (h1, h2) => {
  const h1Strength = getHandPresedence(h1.kind);
  const h2Strength = getHandPresedence(h2.kind);
  if (h1Strength > h2Strength) return 1;
  else if (h1Strength < h2Strength) return -1;
  else if (h1Strength === h2Strength) {
    return NEA.zip(h2.cards)(h1.cards).reduce(
      (ac, [ch1, ch2]) => (ac !== 0 ? ac : ch1.rank > ch2.rank ? 1 : ch1.rank < ch2.rank ? -1 : ac),
      0
    );
  }
};

type GetHandPresedence = (handName: PokerHand["kind"], shortDeck?: boolean) => number;
const getHandPresedence: GetHandPresedence = (handName, shortDeck = false) => {
  /* TODO?: simplify this with a "swap" call? */
  const presedenceOrder: Array<PokerHand["kind"]> = shortDeck
    ? [
        "highCard",
        "pair",
        "twoPair",
        "threeOfAKind",
        "straight",
        "fullHouse",
        "flush",
        "fourOfAKind",
        "straightFlush",
        "royalFlush",
      ]
    : [
        "highCard",
        "pair",
        "twoPair",
        "threeOfAKind",
        "straight",
        "flush",
        "fullHouse",
        "fourOfAKind",
        "straightFlush",
        "royalFlush",
      ];

  return p(
    presedenceOrder,
    findIndex(equals(handName)),
    O.getOrElse(() => 0)
  );
};
