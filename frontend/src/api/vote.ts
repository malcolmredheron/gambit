import client from "./client";

interface Vote {
  ballot1: boolean;
  ballot2: boolean;
  ballot3: boolean;
}

export const voteAPIs = {
  async postVotes(data: { ballots: Vote }) {
    return await client.post("/vote/ballots", data);
  },

  async getVotes() {
    return await client.get("/vote/ballots");
  },
};
