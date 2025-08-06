const request = require("supertest");
const app = require("./index");

describe("tests", () => {

  test("le bot retourne une direction et une action", async () => {
    const response = await request(app).get("/action");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("move");
    expect(response.body).toHaveProperty("action", "COLLECT");
  });

  test("le bot change de direction avec set-direction", async () => {
    const response = await request(app).get("/set-direction?dir=left");
    expect(response.status).toBe(200);
    expect(response.text).toContain("LEFT");
    const action = await request(app).get("/action");
    expect(action.body.move).toBe("LEFT");
  });

  test("si on envoie une mauvaise direction le serveur doit refuser", async () => {
    const response = await request(app).get("/set-direction?dir=banane");
    expect(response.status).toBe(400);
    expect(response.text).toBe("Direction invalide");
  });

  test("le bot accepte les 5 directions", async () => {
    const directions = ["UP", "DOWN", "LEFT", "RIGHT", "STAY"];
    for (const dir of directions) {
      const res = await request(app).get(`/set-direction?dir=${dir}`);
      expect(res.status).toBe(200);
      expect(res.text).toContain(dir);
    }
  });
});
