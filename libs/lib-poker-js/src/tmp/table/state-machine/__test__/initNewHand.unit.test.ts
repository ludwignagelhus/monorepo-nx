import { PokerTable } from "@banano-casino/lib-poker-js";
import { poker, updateTable } from "..";
import { testTableConfig } from "./test-util";

/* ??Create and put somewhere a default game config usable for many tests?? */

/* Yeah... tests for specific actions. */

it("Should init hand correctly.", () => {
  let t = PokerTable(testTableConfig);
  /* Wanna use some non-poker specific actions to set up table state for tests: */
  /* - joins table with chips 4x */
  [t] = updateTable(t, poker.seatOccupy({ chips: 100, displayName: "foo", seat: 0 }));
  [t] = updateTable(t, poker.seatOccupy({ chips: 100, displayName: "bar", seat: 0 }));
  [t] = updateTable(t, poker.seatOccupy({ chips: 100, displayName: "baz", seat: 0 }));

  /* - posting blinds */

  const action = poker.initNewHand();

  /*  */
  const newT = updateTable(t, action);

  expect(2).toEqual(2);
});
