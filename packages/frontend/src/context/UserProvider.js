import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const UserContext = createContext();
const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://phsysystem-api.onrender.com";
const apiLogin = baseUrl + "/auth/login";

export function UserProvider({ children }) {
  const [user, setUser] = useState();
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      fetchUserData(token)
        .then((userData) => {
          setUser(userData);
          router.push("/");
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  async function fetchUserData(token) {
    try {
      const response = await fetch(baseUrl + "/auth/profile", {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        return data.user_info;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  async function login(email, password) {
    try {
      const formData = new URLSearchParams();
      formData.append("password", password);
      formData.append("email", email);

      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };

      const response = await axios.post(apiLogin, formData, {
        headers,
      });

      if (response.status === 200) {
        const token = response.data.token;
        sessionStorage.setItem("token", token);

        const userData = await fetchUserData(token);
        setUser(userData);
        sessionStorage.setItem("token", token);
        router.push("/");
      } else {
        console.error("Login failed");
        setError("Usuário ou senha inválidos");
      }
    } catch (error) {
      setError("Usuário ou senha inválidos");
      sessionStorage.clear();
      console.error("An error occurred:", error);
    }
  }

  function logout() {
    setUser(null);
  }

  return (
    <UserContext.Provider value={{ user, logout, login }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
