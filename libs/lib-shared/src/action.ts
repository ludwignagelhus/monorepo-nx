export const Action = <T extends string>(name: T) => ({ kind: name });
