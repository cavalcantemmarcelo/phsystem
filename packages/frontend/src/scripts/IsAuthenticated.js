export default function isAuthenticated() {
  if (typeof window !== "undefined") {
    const token = sessionStorage.getItem("token");
    return token;
  }
  return "";
}
