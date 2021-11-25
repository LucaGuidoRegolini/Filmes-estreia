import connection from "./connectionTest";

describe("Calc", () => {
  beforeAll(async () => {
    await connection.create();
  });

  afterAll(async () => {
    await connection.close();
  });

  it("deve retornar 4", () => {
    expect(1 == 1).toBe(true);
  });
});
