import { TableConfig } from "@banano-casino/lib-poker-js";

export const testTableConfig: TableConfig = {
  access: "open",
  admins: [],
  gameConfig: {
    bettingLimit: "no-limit",
    blinds: [],
    rake: 0,
    buyin: { normal: 100, max: 100, min: 40 },
    seats: 6,
    variant: "holdem",
  },
  id: "test-table-config",
  name: "Test Table",
  owner: "foo-player",
  spectatable: true,
};
