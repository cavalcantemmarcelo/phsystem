import axios from "axios";

export default async function isAuthenticated() {
  if (typeof window !== "undefined") {
    const token = sessionStorage.getItem("token");
    if (token) {
      return axios.get("http://localhost:3333/auth/profile", {
        headers: { Authorization: `JWT ${token}` },
      });
    }
  }
  return Promise.resolve(null); // Resolve with null if not authenticated
}
