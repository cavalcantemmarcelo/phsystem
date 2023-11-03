import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      fetchUserData(token)
        .then((userData) => {
          setUser(userData);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  async function fetchUserData(token) {
    try {
      console.log(process.env.BASE_URL);
      const response = await fetch(process.env.BASE_URL + "/auth/profile", {
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

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}
