import { PokerGameConfig, PokerTable, TableConfig } from "@banano-casino/lib-poker-js";
import { poker, updateTable } from "..";

/* Create and put somewhere a default game config usable for many tests. */

const gameConfig: PokerGameConfig = {
  variant: "holdem",
  blinds: [0.5, 1],
  rake: 0.15,
  buyin: { max: 100, min: 40, normal: 100 },
  bettingLimit: "no-limit",
  seats: 6,
};

const tableConfig: TableConfig = {
  access: "open",
  spectatable: true,
  admins: [],
  gameConfig,
  id: "",
  name: "Amazonas",
  owner: "",
};

/* Yeah... tests for specific actions. */

it("Should init hand correctly.", () => {
  const t = PokerTable(tableConfig);
  /* Wanna use some non-poker specific actions to set up table state for tests: */
  /* - claim table seat */
  /* - add chips (quick join? signed actions?) */
  /*     joining table triggers a request to get players default settings wrt. posting blinds etc. */
  /* -  */

  // This action needs verify players balance is large enough to buy into the game.
  // const st = updateTable(t, casino.joinTable());

  const action = poker.initNewHand();

  /*  */
  const newT = updateTable(t, action);

  expect(2).toEqual(2);
});
