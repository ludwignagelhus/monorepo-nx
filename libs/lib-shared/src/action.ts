// ??
export const Action = <T extends string>(name: T) => ({ kind: name });

export const table = {
  reqSeat: (seat: number) => ({ ...Action("requestSeat"), seat }),
  addChips: (amount: number) => ({ ...Action("addChips"), amount }), // <- needs check
  sitOut: () => Action("sitOut"),
  sitIn: (postBlinds: boolean) => ({ ...Action("sitIn"), postBlinds }),
  seatLeave: (seat: number) => ({ ...Action("reserveSeat"), seat }),
  tableLeave: (arg: {}) => Action("tableAdded"),
  tableVisit: (arg: {}) => Action("tableVisit"),

  // Also pass some optional player gameplay settings? post-blinds etc.
  // Or, when player joins, create a promise to get and potentially apply players settings from db...
  // Not sure which yet.
  seatOccupy: (arg: { seat: number; displayName: string; chips: number }) => ({
    // ^needs check
    ...Action("occupySeat"),
    ...arg,
  }),
};
