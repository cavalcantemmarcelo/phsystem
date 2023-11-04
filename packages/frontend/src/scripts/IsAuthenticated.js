import axios from "axios";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://phsysystem-api.onrender.com";

export default async function isAuthenticated() {
  if (typeof window !== "undefined") {
    const token = sessionStorage.getItem("token");
    if (token) {
      return axios.get(baseUrl + "/auth/profile", {
        headers: { Authorization: `JWT ${token}` },
      });
    }
  }
  return Promise.resolve(null);
}
