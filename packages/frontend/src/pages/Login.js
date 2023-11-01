import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const apiUrl = "http://localhost:3333/auth/login";

  const checkTokenAndRedirect = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      router.push("/");
    }
  };

  useEffect(() => {
    checkTokenAndRedirect();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const formData = new URLSearchParams();
      formData.append("password", password);
      formData.append("email", email);

      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };

      const response = await axios.post(apiUrl, formData, {
        headers,
      });

      console.log(response);

      if (response.status === 200) {
        const token = response.data.token;
        sessionStorage.setItem("token", token);
        checkTokenAndRedirect();
      } else {
        console.error("Login failed");
        setError("Usuário ou senha inválidos");
      }
    } catch (error) {
      setError("Usuário ou senha inválidos");
      sessionStorage.clear();
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="border rounded w-full py-2 px-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="border rounded w-full py-2 px-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover-bg-blue-600"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
