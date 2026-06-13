"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Cadastro() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function slugify(text: string) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // 1. Criar usuário no Supabase Auth
   const { data: authData, error: authError } = await supabase.auth.signUp({
  email,
  password,
});

if (authError) {
  setLoading(false);
  setError("Erro ao criar conta: " + authError.message);
  return;
}

const userId = authData.user?.id;

// Garante que a sessão está ativa antes de continuar
const { data: sessionData } = await supabase.auth.getSession();

if (!sessionData.session) {
  setLoading(false);
  setError("Conta criada, mas sessão não iniciou. Tente fazer login.");
  return;
}

    if (!userId) {
      setLoading(false);
      setError("Não foi possível criar o usuário. Tente novamente.");
      return;
    }

    // 2. Criar empresa na tabela companies
    const slug = slugify(companyName) + "-" + Math.floor(Math.random() * 1000);

    const { data: companyData, error: companyError } = await supabase
      .from("companies")
      .insert({
        name: companyName,
        slug: slug,
        plan: "starter",
      })
      .select()
      .single();

    if (companyError) {
      setLoading(false);
      setError("Erro ao criar empresa: " + companyError.message);
      return;
    }

    // 3. Vincular o usuário à empresa na tabela users
    const { error: userError } = await supabase.from("users").insert({
      id: userId,
      company_id: companyData.id,
      name: companyName,
      role: "owner",
    });

    setLoading(false);

    if (userError) {
      setError("Erro ao vincular usuário: " + userError.message);
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

        {/* Card de cadastro */}
        <form
          onSubmit={handleSignup}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8"
        >
          <h2 className="text-white text-xl font-semibold mb-1">
            Criar sua conta
          </h2>
          <p className="text-zinc-500 text-sm mb-6">
            Comece a usar o ORÇAHUB gratuitamente
          </p>

          {/* Erro */}
          {error && (
            <div className="bg-red-950 border border-red-900 text-red-400 text-sm rounded-lg px-4 py-3 mb-4">
              {error}
            </div>
          )}

          {/* Nome da empresa */}
          <div className="mb-4">
            <label className="text-zinc-400 text-sm mb-1 block">
              Nome da empresa
            </label>
            <input
              type="text"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Minha Empresa"
              className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-zinc-500 placeholder-zinc-600"
            />
          </div>

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
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-zinc-500 placeholder-zinc-600"
            />
          </div>

          {/* Botão */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-semibold rounded-lg py-3 text-sm hover:bg-zinc-200 transition-colors disabled:opacity-50"
          >
            {loading ? "Criando conta..." : "Criar conta grátis"}
          </button>

          {/* Link login */}
          <p className="text-center text-zinc-600 text-sm mt-6">
            Já tem conta?{" "}
            <a href="/" className="text-zinc-400 hover:text-white transition-colors">
              Entrar
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