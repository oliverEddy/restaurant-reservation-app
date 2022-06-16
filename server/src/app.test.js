const request = require("supertest");
const app = require("./app");

describe("app", () => {
  test("GET /restaurants should return all restaurants", async () => {
    const expected = [
      {
        id: "616005cae3c8e880c13dc0b9",
        name: "Curry Place",
        description:
          "Bringing you the spirits of India in the form of best authentic grandma's recipe dishes handcrafted with love by our chefs!",
        image: "https://i.ibb.co/yftcRcF/indian.jpg",
      },
      {
        id: "616005e26d59890f8f1e619b",
        name: "Thai Isaan",
        description:
          "We offer guests a modern dining experience featuring the authentic taste of Thailand. Food is prepared fresh from quality ingredients and presented with sophisticated elegance in a stunning dining setting filled with all the richness of Thai colour, sound and art.",
        image: "https://i.ibb.co/HPjd2jR/thai.jpg",
      },
      {
        id: "616bd284bae351bc447ace5b",
        name: "Italian Feast",
        description:
          "From the Italian classics, to our one-of-a-kind delicious Italian favourites, all of our offerings are handcrafted from the finest, freshest ingredients available locally. Whether you're craving Italian comfort food like our Ravioli, Pappardelle or something with a little more Flavour like our famous Fettuccine Carbonara.",
        image: "https://i.ibb.co/0r7ywJg/italian.jpg",
      },
    ];
    await request(app)
      .get("/restaurants")
      .expect(200)
      .expect((response) => {
        expect(response.body).toEqual(expected);
      });
  });
  test("GET/restaurants/:id should return a single restaurant with matching Id", async () => {
    const expected = {
      id: "616005cae3c8e880c13dc0b9",
      name: "Curry Place",
      description:
        "Bringing you the spirits of India in the form of best authentic grandma's recipe dishes handcrafted with love by our chefs!",
      image: "https://i.ibb.co/yftcRcF/indian.jpg",
    };
    await request(app)
      .get("/restaurants/616005cae3c8e880c13dc0b9")
      .expect(200)
      .expect((response) => {
        expect(response.body).toEqual(expected);
      });
  });
  test("GET/restaurants/:invalid-id should return a status code of 400 invalid id provided", async () => {
    const expected = {
      error: "invalid id provided",
    };
    await request(app)
      .get("/restaurants/616005cae3c8e880c13dc0b")
      .expect(400)
      .expect((response) => {
        expect(response.body).toEqual(expected);
      });
  });
  test("GET/restaurants/:bad-id should return a status code of 404 restaurant not found", async () => {
    const expected = {
      error: "restaurant not found",
    };
    await request(app).get("/restaurants/616005cae3c8e880c13dc0b7").expect(404);
    expect((response) => {
      expect(response.body).toEqual(expected);
    });
  });
  test("POST /reservations should create a new reservation with userId and add it to the data base", async () => {
    const body = {
      partySize: 4,
      date: "2023-11-17T06:30:00.000Z",
      restaurantName: "Island Grill",
    };
    const expectedStatus = 201;
    await request(app).post("/reservations").send(body).expect(expectedStatus);
    expect((response) => {
      expect(response.body).toEqual(expect.objectContaining(body));
      expect(response.body.id).toBeTruthy();
    });
  });
  test("GET /reservations should return all reservation made by the user trying to access them", async () => {
    const expected = [
      {
        date: "2023-11-17T06:30:00.000Z",
        id: "507f1f77bcf86cd799439011",
        partySize: 4,
        restaurantName: "Island Grill",
        userId: "mock-user-id",
      },
      {
        date: "2023-12-03T07:00:00.000Z",
        id: "614abf0a93e8e80ace792ac6",
        partySize: 2,
        restaurantName: "Green Curry",
        userId: "mock-user-id",
      },
    ];
    await request(app)
      .get("/reservations")
      .expect(200)
      .expect((response) => {
        expect(response.body).toEqual(expected);
      });
  });
  test("GET/reservations/:id should return a single reservation by id", async () => {
    const expected = {
      id: "507f1f77bcf86cd799439011",
      partySize: 4,
      date: "2023-11-17T06:30:00.000Z",
      userId: "mock-user-id",
      restaurantName: "Island Grill",
    };
    await request(app)
      .get("/reservations/507f1f77bcf86cd799439011")
      .expect(200)
      .expect((response) => {
        expect(response.body).toEqual(expected);
      });
  });
  test("GET/reservations/:invalid-id should return a status code of 400 invalid id provided", async () => {
    const expected = {
      error: "invalid id provided",
    };
    await request(app)
      .get("/reservations/507f1f77bcf86cd79943901")
      .expect(400)
      .expect((response) => {
        expect(response.body).toEqual(expected);
      });
  });
  test("GET/reservation/:id should forbidden access when trying to get another users reservation and return a status of 403", async () => {
    const expected = {
      error: "user does not have permission to access this reservation",
    };
    await request(app)
      .get("/reservations/61679189b54f48aa6599a7fd")
      .expect(403);
    expect((response) => {
      expect(response.body).toEqual(expected);
    });
  });

  test("GET/reservations/:bad-id should return a status code of 404 reservation not found", async () => {
    const expected = {
      error: "not found",
    };
    await request(app)
      .get("/reservations/507f1f77bcf86cd799439010")
      .expect(404);
    expect((response) => {
      expect(response.body).toEqual(expected);
    });
  });
  it("should return a status code of 400 if required validation error happens on POST /reservations", async () => {
    const reqBody = {};
    const response = await request(app).post("/reservations").send(reqBody);

    expect(response.status).toBe(400);
  });

  it("should return a status code of 400 if partySize is less than 0 on POST /reservations", async () => {
    const reqBody = {
      partySize: -4,
      date: "2023-11-17T06:30:00.000Z",
      restaurantName: "Island Grill",
    };
    const response = await request(app).post("/reservations").send(reqBody);

    expect(response.status).toBe(400);
  });
});
