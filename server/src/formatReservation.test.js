const formatReservations = require("./formatReservations");

describe("formatReservations", () => {
  it("Should return a formatted reservation with id", () => {
    const reservation = {
      _id: "507f1f77bcf86cd799439011",
      partySize: 4,
      date: "2023-11-17T06:30:00.000Z",
      userId: "mock-user-id",
    };
    const results = formatReservations(reservation);
    const expected = {
      id: "507f1f77bcf86cd799439011",
      partySize: 4,
      date: "2023-11-17T06:30:00.000Z",
      userId: "mock-user-id",
    };
    expect(results).toEqual(expected);
  });
});
