"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError("Email ou senha incorretos.");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-md px-8">
        
        {/* Logo */}
<div className="text-center mb-12">
  <Image
    src="/logo.png"
    alt="ORÇAHUB"
    width={320}
    height={116}
    className="mx-auto"
    priority
  />
</div>

        {/* Card de login */}
        <form
          onSubmit={handleLogin}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8"
        >
          <h2 className="text-white text-xl font-semibold mb-1">
            Entrar na plataforma
          </h2>
          <p className="text-zinc-500 text-sm mb-6">
            Acesse o painel da sua empresa
          </p>

          {/* Erro */}
          {error && (
            <div className="bg-red-950 border border-red-900 text-red-400 text-sm rounded-lg px-4 py-3 mb-4">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="mb-4">
            <label className="text-zinc-400 text-sm mb-1 block">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-zinc-500 placeholder-zinc-600"
            />
          </div>

          {/* Senha */}
          <div className="mb-6">
            <label className="text-zinc-400 text-sm mb-1 block">
              Senha
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-zinc-500 placeholder-zinc-600"
            />
          </div>

          {/* Botão */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-semibold rounded-lg py-3 text-sm hover:bg-zinc-200 transition-colors disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          {/* Link cadastro */}
          <p className="text-center text-zinc-600 text-sm mt-6">
            Não tem conta?{" "}
            <a href="/cadastro" className="text-zinc-400 hover:text-white transition-colors">
  Criar conta grátis
</a>
          </p>
        </form>

        {/* Footer */}
        <p className="text-center text-zinc-700 text-xs mt-8">
          © 2025 ORÇAHUB · Todos os direitos reservados
        </p>

      </div>
    </main>
  );
}