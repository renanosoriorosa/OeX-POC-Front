"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,  
    });
    if (result?.error) {
      setError("Usuário ou senha inválidos!"); // 🔹 Apenas exibe o erro
    } else {
      router.push("/dashboard"); // 🔹 Apenas redireciona se for bem-sucedido
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded w-64"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded w-64"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-64">
          Entrar
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
