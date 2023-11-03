import axios from "axios";

export default async function isAuthenticated() {
  if (typeof window !== "undefined") {
    const token = sessionStorage.getItem("token");
    if (token) {
      return axios.get("https://phsysystem-api.onrender.com/auth/profile", {
        headers: { Authorization: `JWT ${token}` },
      });
    }
  }
  return Promise.resolve(null); // Resolve with null if not authenticated
}
