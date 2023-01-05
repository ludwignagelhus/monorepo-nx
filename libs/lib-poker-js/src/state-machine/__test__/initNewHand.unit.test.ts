import { poker, updateTable } from "..";
import { PokerConfig, PokerTable, TableConfig } from "../../tmp/table";

/* Create and put somewhere a default game config usable for many tests. */

const gameConfig: PokerConfig = {
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
  const t = new PokerTable(tableConfig);
  const action = poker.initNewHand("foo");

  /*  */
  const newT = updateTable(t, action);

  expect(2).toEqual(2);
});
