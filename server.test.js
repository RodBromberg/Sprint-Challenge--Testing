const server = require("./api/server");
const request = require("supertest");

describe("get games", () => {
  it("should return  200", () => {
    return request(server)
      .get("/games")
      .then(res => {
        expect(res.status).toBe(200);
      });
  });
  it("should return empty arr when empty", async () => {
    const res = await request(server).get("/games");
    expect(res.body).toEqual([]);
  });
  it("should return an array", async () => {
    const res = await request(server).get("/games");
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe("Post to games", () => {
  it("should return status 201", async () => {
    const res = await request(server)
      .post("/games")
      .send({
        title: "GTA",
        genre: "Crime",
        releaseYear: 2013
      });
    expect(res.status).toBe(201);
  });
  it("should return 422 upon missing title, body or genre", async () => {
    const game = { genre: "lame" };
    const res = await request(server)
      .post("/games")
      .send(game);
    expect(res.status).toBe(422);
  });
  it("should return 404 upon entering incorrect route", async () => {
    const game = { genre: "lame" };
    const res = await request(server)
      .post("/game")
      .send(game);
    expect(res.status).toBe(404);
  });
});
