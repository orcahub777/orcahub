export default function Home() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-md px-8">
        
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="text-white text-4xl font-bold tracking-tight">
            ORÇAHUB
          </h1>
          <p className="text-zinc-500 text-sm mt-2 tracking-widest uppercase">
            Orçamentos inteligentes
          </p>
        </div>

        {/* Card de login */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          <h2 className="text-white text-xl font-semibold mb-1">
            Entrar na plataforma
          </h2>
          <p className="text-zinc-500 text-sm mb-6">
            Acesse o painel da sua empresa
          </p>

          {/* Email */}
          <div className="mb-4">
            <label className="text-zinc-400 text-sm mb-1 block">
              Email
            </label>
            <input
              type="email"
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
              placeholder="••••••••"
              className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-zinc-500 placeholder-zinc-600"
            />
          </div>

          {/* Botão */}
          <button className="w-full bg-white text-black font-semibold rounded-lg py-3 text-sm hover:bg-zinc-200 transition-colors">
            Entrar
          </button>

          {/* Link cadastro */}
          <p className="text-center text-zinc-600 text-sm mt-6">
            Não tem conta?{" "}
            <span className="text-zinc-400 cursor-pointer hover:text-white transition-colors">
              Criar conta grátis
            </span>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-zinc-700 text-xs mt-8">
          © 2025 ORÇAHUB · Todos os direitos reservados
        </p>

      </div>
    </main>
  );
}