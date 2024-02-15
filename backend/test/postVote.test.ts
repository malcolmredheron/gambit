const { request } = require("supertest");
import { Ballot } from "../src/models/ballot";
import app from "../src/app";

describe("addBallot API", () => {
  it("should create a new ballot and return success", async () => {
    const mockReqBody = {
      ballots: [1, 2, 3], // Example request body
    };

    const response = await request(app)
      .post("/api/vote/addBallot")
      .send(mockReqBody);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.ballot).toBeDefined();

    // Optional: You can also assert the created ballot in the database
    const createdBallot = await Ballot.findOne({
      where: { user_id: "user_id" },
    });
    expect(createdBallot).toBeDefined();
    expect(createdBallot?.value).toBe(JSON.stringify(mockReqBody.ballots));
    expect(createdBallot?.user_id).toBe("user_id");
  });

  it("should return an error if there is an exception", async () => {
    // Mocking the Ballot.create function to throw an error
    jest
      .spyOn(Ballot, "create")
      .mockRejectedValueOnce(new Error("Mocked error"));

    const mockReqBody = {
      ballots: [1, 2, 3], // Example request body
    };

    const response = await request(app)
      .post("/api/vote/addBallot")
      .send(mockReqBody);

    expect(response.status).toBe(500);
    expect(response.body.error).toBe("Mocked error");
  });
});
