"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [companyName, setCompanyName] = useState("");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const { data: sessionData } = await supabase.auth.getSession();

      if (!sessionData.session) {
        router.push("/");
        return;
      }

      const userId = sessionData.session.user.id;

      const { data: userData } = await supabase
        .from("users")
        .select("company_id, companies(name)")
        .eq("id", userId)
        .single();

      if (userData && userData.companies) {
        const company = userData.companies as unknown as { name: string };
        setCompanyName(company.name);
      }

      setChecking(false);
    }

    checkAuth();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-zinc-500 text-sm">Carregando...</p>
      </div>
    );
  }

  const linkClass = "block px-3 py-2 rounded-lg text-sm text-zinc-300 hover:bg-zinc-900 hover:text-white transition-colors";

  return (
    <div className="min-h-screen bg-black flex">
      <aside className="w-64 border-r border-zinc-800 flex flex-col">
        <div className="p-6 border-b border-zinc-800">
          <Image src="/logo.png" alt="ORCAHUB" width={140} height={50} />
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <a href="/dashboard" className={linkClass}>Inicio</a>
          <a href="/dashboard/produtos" className={linkClass}>Produtos</a>
          <a href="/dashboard/categorias" className={linkClass}>Categorias</a>
          <a href="/dashboard/orcamentos" className={linkClass}>Orcamentos</a>
          <a href="/dashboard/clientes" className={linkClass}>Clientes</a>
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <p className="text-zinc-500 text-xs mb-2 truncate">
            {companyName || "Minha Empresa"}
          </p>
          <button onClick={handleLogout} className={linkClass + " w-full text-left"}>
            Sair
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}