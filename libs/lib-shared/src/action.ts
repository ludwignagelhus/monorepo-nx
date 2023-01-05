export const Action = <T extends string>(name: T) => ({ kind: name });

export const mkTableAction =
  <T extends string>(name: T) =>
  (table: string) => ({ ...Action(name), table });
