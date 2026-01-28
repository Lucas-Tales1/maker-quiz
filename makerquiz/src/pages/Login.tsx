import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(username, password);
      } else {
        if (password !== password2) {
          throw new Error('As senhas não coincidem');
        }
        await register(username, password, password2, email);
        await login(username, password);
      }
      navigate('/questions');
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro inesperado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        
        {/* Cabeçalho com o Gradiente da Marca */}
        <div className="bg-gradient-to-r from-blue-600 to-sky-500 p-8 text-center">
          <h1 className="text-3xl font-black text-white tracking-tight">
            {isLogin ? 'Bem-vindo!' : 'Criar Conta'}
          </h1>
          <p className="text-blue-100 mt-2 text-sm font-medium">
            {isLogin ? 'Acesse o Maker Quiz para continuar' : 'Preencha os dados para começar'}
          </p>
        </div>

        <div className="p-8">
          {/* Mensagem de Erro (Substituindo o Message do Prime) */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl">
              <p className="text-red-700 text-sm font-bold flex items-center">
                <span className="mr-2">⚠️</span> {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Campo Username */}
            <div className="space-y-1">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Usuário</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:bg-white focus:border-blue-500 outline-none transition-all font-semibold text-slate-700 placeholder:text-slate-300"
                placeholder="Seu nome de usuário"
                required
              />
            </div>

            {/* Campo Email (Apenas no Registro) */}
            {!isLogin && (
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:bg-white focus:border-blue-500 outline-none transition-all font-semibold text-slate-700 placeholder:text-slate-300"
                  placeholder="exemplo@email.com"
                  required
                />
              </div>
            )}

            {/* Campo Senha */}
            <div className="space-y-1">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:bg-white focus:border-blue-500 outline-none transition-all font-semibold text-slate-700 placeholder:text-slate-300"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Campo Confirmar Senha (Apenas no Registro) */}
            {!isLogin && (
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Confirmar Senha</label>
                <input
                  type="password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:bg-white focus:border-blue-500 outline-none transition-all font-semibold text-slate-700 placeholder:text-slate-300"
                  placeholder="Repita sua senha"
                  required
                />
              </div>
            )}

            {/* Botão Principal com Estilo Forçado */}
            <button
              type="submit"
              disabled={loading}
              style={{ backgroundColor: '#2563eb' }}
              className={`w-full py-4 mt-4 rounded-2xl font-black text-white shadow-xl transition-all uppercase tracking-widest text-sm flex justify-center items-center ${
                loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700 active:scale-95 shadow-blue-200'
              }`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                isLogin ? 'Entrar' : 'Cadastrar'
              )}
            </button>
          </form>

          {/* Toggle Login/Register */}
          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm font-medium">
              {isLogin ? "Ainda não tem conta?" : "Já possui uma conta?"}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
                className="ml-2 text-blue-600 font-black hover:underline underline-offset-4"
              >
                {isLogin ? 'Registre-se' : 'Faça Login'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};