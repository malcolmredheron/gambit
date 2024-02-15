import client from "./client";

export const userAPIs = {
  async register(data: { name: string; email: string; password: string }) {
    return await client.post("/auth/register", data);
  },

  async login(data: { email: string, password: string}) {
    return await client.post("/auth/login", data);
  },

  async getProfile() {
    return await client.get("/auth/profile");
  },

  async loginOrRegisterWithGoogle(data: { token: string; }) {
    return await client.post("/auth/login/google", data);
  },
};
