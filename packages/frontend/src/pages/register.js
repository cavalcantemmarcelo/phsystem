import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://phsysystem-api.onrender.com";

export default function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const apiUrl = baseUrl + "/auth/register";

  const checkTokenAndRedirect = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      router.push("/");
    }
  };

  useEffect(() => {
    checkTokenAndRedirect();
  }, []);

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const formData = new URLSearchParams();
      formData.append("password", password);
      formData.append("email", email);
      formData.append("role", "user");
      formData.append("fullname", name);

      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };

      const response = await axios.post(apiUrl, formData, {
        headers,
      });

      if (response.status === 201) {
        router.push("/login");
      } else {
        setError("Erro no cadastro, confira seus dados.");
      }
    } catch (error) {
      setError("Erro no cadastro, confira seus dados.");
      sessionStorage.clear();
      console.error("An error occurred:", error);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-semibold mb-4">Cadastro de Usuário</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600">
                Nome Completo:
              </label>
              <input
                type="fullname"
                id="fullname"
                name="fullname"
                className="border rounded w-full py-2 px-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600">
                E-mail:
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
                Senha:
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
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleRegistration}
              >
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
