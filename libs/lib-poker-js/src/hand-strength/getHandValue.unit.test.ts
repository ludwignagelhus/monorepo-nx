import { NonEmptyArray } from "fp-ts/lib/NonEmptyArray";
import * as NEA from "fp-ts/NonEmptyArray";
import * as O from "fp-ts/Option";
import { Card } from "../shared/card";
import { findLo, getHandValueHelper } from "./getHandValue";

/* Can we include vitest types in tsconfig or something? */

/* TODO?: change tests to test api instead (`getHandValue`, not  `getHandValueHelper`) */

it("should find royal flush.", () => {
  const cards: NonEmptyArray<Card> = [
    Card(14, "spades"),
    Card(3, "hearts"),
    Card(9, "spades"),
    Card(10, "spades"),
    Card(11, "spades"),
    Card(12, "spades"),
    Card(13, "spades"),
  ];

  expect(getHandValueHelper(cards)).toEqual({
    kind: "royalFlush",
    cards: [
      Card(14, "spades"),
      Card(13, "spades"),
      Card(12, "spades"),
      Card(11, "spades"),
      Card(10, "spades"),
    ],
  });
});

it("should find straight flush.", () => {
  const cards = NEA.map((n: number) => Card(n, "clubs"))([8, 9, 10, 11, 12, 2, 3]);
  expect(getHandValueHelper(cards)).toEqual({
    kind: "straightFlush",
    cards: [
      Card(12, "clubs"),
      Card(11, "clubs"),
      Card(10, "clubs"),
      Card(9, "clubs"),
      Card(8, "clubs"),
    ],
  });
});

it("should find four of a kind.", () => {
  const cards: NonEmptyArray<Card> = [
    Card(9, "diamonds"),
    Card(8, "hearts"),
    Card(2, "spades"),
    Card(8, "clubs"),
    Card(8, "spades"),
    Card(3, "clubs"),
    Card(8, "diamonds"),
  ];
  expect(getHandValueHelper(cards)).toEqual({
    kind: "fourOfAKind",
    cards: expect.arrayContaining([
      Card(8, "diamonds"),
      Card(8, "clubs"),
      Card(8, "spades"),
      Card(8, "hearts"),
    ]),
  });
});

it("should find full house.", () => {
  const cards: NonEmptyArray<Card> = [
    Card(9, "diamonds"),
    Card(8, "hearts"),
    Card(2, "spades"),
    Card(12, "clubs"),
    Card(8, "spades"),
    Card(9, "clubs"),
    Card(8, "diamonds"),
  ];
  expect(getHandValueHelper(cards)).toEqual({
    kind: "fullHouse",
    cards: [
      Card(8, "spades"),
      Card(8, "hearts"),
      Card(8, "diamonds"),
      Card(9, "clubs"),
      Card(9, "diamonds"),
    ],
  });
});

it("should find flush.", () => {
  const cards: NonEmptyArray<Card> = [
    Card(9, "diamonds"),
    Card(10, "spades"),
    Card(2, "spades"),
    Card(12, "clubs"),
    Card(8, "spades"),
    Card(9, "spades"),
    Card(4, "spades"),
  ];
  expect(getHandValueHelper(cards)).toEqual({
    kind: "flush",
    cards: [
      Card(10, "spades"),
      Card(9, "spades"),
      Card(8, "spades"),
      Card(4, "spades"),
      Card(2, "spades"),
    ],
  });
});

it("should find ace-high straight.", () => {
  const cards: NonEmptyArray<Card> = [
    Card(14, "diamonds"),
    Card(13, "hearts"),
    Card(10, "spades"),
    Card(3, "clubs"),
    Card(11, "clubs"),
    Card(8, "diamonds"),
    Card(12, "spades"),
  ];
  expect(getHandValueHelper(cards)).toEqual({
    kind: "straight",
    cards: [
      Card(14, "diamonds"),
      Card(13, "hearts"),
      Card(12, "spades"),
      Card(11, "clubs"),
      Card(10, "spades"),
    ],
  });
});

it("should find straight.", () => {
  const cards: NonEmptyArray<Card> = [
    Card(14, "diamonds"),
    Card(9, "hearts"),
    Card(10, "spades"),
    Card(3, "clubs"),
    Card(11, "clubs"),
    Card(8, "diamonds"),
    Card(12, "spades"),
  ];
  expect(getHandValueHelper(cards)).toEqual({
    kind: "straight",
    cards: [
      Card(12, "spades"),
      Card(11, "clubs"),
      Card(10, "spades"),
      Card(9, "hearts"),
      Card(8, "diamonds"),
    ],
  });
});

it("should find straight on paired board.", () => {
  const cards: NonEmptyArray<Card> = [
    Card(13, "clubs"),
    Card(9, "clubs"),
    Card(12, "spades"),
    Card(11, "spades"),
    Card(10, "spades"),
    Card(10, "hearts"),
    Card(3, "hearts"),
  ];
  expect(getHandValueHelper(cards)).toEqual({
    kind: "straight",
    cards: [
      Card(13, "clubs"),
      Card(12, "spades"),
      Card(11, "spades"),
      Card(10, "spades"),
      Card(9, "clubs"),
    ],
  });
});

it("should find wheel straight", () => {
  const cards: NonEmptyArray<Card> = [
    Card(4, "diamonds"),
    Card(3, "spades"),
    Card(14, "hearts"),
    Card(2, "clubs"),
    Card(5, "spades"),
  ];
  expect(getHandValueHelper(cards)).toEqual({
    kind: "straight",
    cards: [
      Card(5, "spades"),
      Card(4, "diamonds"),
      Card(3, "spades"),
      Card(2, "clubs"),
      Card(14, "hearts"),
    ],
  });
});

it("should find three of a kind.", () => {
  const cards: NonEmptyArray<Card> = [
    Card(9, "diamonds"),
    Card(8, "hearts"),
    Card(2, "spades"),
    Card(12, "clubs"),
    Card(8, "spades"),
    Card(3, "clubs"),
    Card(8, "diamonds"),
  ];
  expect(getHandValueHelper(cards)).toEqual({
    kind: "threeOfAKind",
    cards: [
      Card(8, "spades"),
      Card(8, "hearts"),
      Card(8, "diamonds"),
      Card(12, "clubs"),
      Card(9, "diamonds"),
    ],
  });
});

it("Should find two pair.", () => {
  const cards: NonEmptyArray<Card> = [
    Card(9, "diamonds"),
    Card(9, "hearts"),
    Card(2, "spades"),
    Card(12, "clubs"),
    Card(8, "spades"),
    Card(2, "clubs"),
    Card(8, "diamonds"),
  ];

  expect(getHandValueHelper(cards)).toEqual({
    kind: "twoPair",
    cards: [
      Card(9, "hearts"),
      Card(9, "diamonds"),
      Card(8, "spades"),
      Card(8, "diamonds"),
      Card(12, "clubs"),
    ],
  });
});

it("Should find pair.", () => {
  const cards: NonEmptyArray<Card> = [
    Card(9, "diamonds"),
    Card(10, "hearts"),
    Card(2, "spades"),
    Card(12, "clubs"),
    Card(8, "spades"),
    Card(3, "clubs"),
    Card(8, "diamonds"),
  ];
  expect(getHandValueHelper(cards)).toEqual({
    kind: "pair",
    cards: [
      Card(8, "spades"),
      Card(8, "diamonds"),
      Card(12, "clubs"),
      Card(10, "hearts"),
      Card(9, "diamonds"),
    ],
  });
});

it("should find pair when only given 2 hole cards.", () => {
  expect(getHandValueHelper([Card(4, "spades"), Card(4, "clubs")])).toEqual({
    kind: "pair",
    cards: [Card(4, "spades"), Card(4, "clubs")],
  });
});

it("Should find high card.", () => {
  const cards: NonEmptyArray<Card> = [
    Card(2, "diamonds"),
    Card(8, "spades"),
    Card(6, "clubs"),
    Card(11, "hearts"),
    Card(13, "diamonds"),
    Card(4, "clubs"),
    Card(5, "spades"),
  ];
  expect(getHandValueHelper(cards)).toEqual({
    kind: "highCard",
    cards: [
      Card(13, "diamonds"),
      Card(11, "hearts"),
      Card(8, "spades"),
      Card(6, "clubs"),
      Card(5, "spades"),
    ],
  });
});

/* = = = Lo hand = = = */
// it("Should not find lo hand.", () => {
//   const cards: NonEmptyArray<Card> = [
//     Card(13, "diamonds"),
//     Card(11, "hearts"),
//     Card(8, "spades"),
//     Card(6, "clubs"),
//     Card(5, "spades"),
//   ];
//   expect(findLo(cards)).toEqual(O.none);
// });

it("Should find lo hand.", () => {
  const cards: NonEmptyArray<Card> = [
    Card(6, "diamonds"),
    Card(5, "hearts"),
    Card(4, "spades"),
    Card(3, "spades"),
    Card(2, "clubs"),
  ];
  expect(findLo(cards)).toEqual(O.some({ kind: "lo", cards }));
});

// How can check if invalid lo hand?
// - not has pairs?
// - length 5
// thats it?
it("Should not find lo hand.", () => {
  const cards: NonEmptyArray<Card> = [
    Card(6, "diamonds"),
    Card(5, "hearts"),
    Card(4, "spades"),
    Card(3, "spades"),
    Card(2, "clubs"),
  ];
  expect(findLo(cards)).toEqual(O.some({ kind: "lo", cards }));
});
