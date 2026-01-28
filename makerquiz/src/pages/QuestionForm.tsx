import { signal, computed } from "@preact/signals-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { QuestionService } from "../services/QuestionService";
import { Question } from "../models/Question";
import { CrudButton } from "../components/CrudButton";

// Signals Globais
const perguntaS = signal<string>("");
const opcoesS = signal<string[]>(["", "", "", ""]);
const respostaCorretaS = signal<number>(0);

const isFormValidS = computed(() => {
  return (
    perguntaS.value.trim() !== "" &&
    opcoesS.value.every((op: string) => op.trim() !== "")
  );
});

export const QuestionForm = ({ mode }: { mode: "create" | "edit" }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [version, setVersion] = useState(0);
  const refresh = () => setVersion(v => v + 1);

  useEffect(() => {
    const stateQuestion = location.state as Question | undefined;
    const load = async () => {
      let q = stateQuestion;
      if (mode === "edit" && id && !q) {
        q = (await QuestionService.getById(Number(id))) || undefined;
      }
      if (q) {
        perguntaS.value = q.pergunta;
        opcoesS.value = [...q.opcoes];
        respostaCorretaS.value = q.respostaCorreta;
        refresh();
      } else {
        perguntaS.value = "";
        opcoesS.value = ["", "", "", ""];
        respostaCorretaS.value = 0;
        refresh();
      }
    };
    load();
  }, [mode, id, location.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValidS.value) return;

    const payload = {
      pergunta: perguntaS.value,
      opcoes: opcoesS.value,
      respostaCorreta: respostaCorretaS.value,
    };

    try {
      if (mode === "create") {
        await QuestionService.create(payload);
      } else if (mode === "edit" && id) {
        await QuestionService.update({ id: Number(id), ...payload });
      }
      navigate("/questions");
    } catch (error) {
      alert("Erro ao salvar.");
    }
  };

return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-start justify-center">
        
        {/* CARD DO FORMULÁRIO */}
        <div className="w-full lg:max-w-xl bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-200">
          <div className="bg-gradient-to-r from-blue-600 to-sky-500 px-8 py-6">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              {mode === "create" ? "Criar Questão" : "Editar Questão"}
            </h1>
          </div>

          <form className="p-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Enunciado</label>
              <textarea
                rows={3}
                className="w-full p-4 bg-slate-100 border-2 border-slate-200 rounded-2xl outline-none text-slate-800 font-bold"
                value={perguntaS.value}
                onInput={(e) => { perguntaS.value = e.currentTarget.value; refresh(); }}
                placeholder="Digite a pergunta..."
              />
            </div>

            <div className="space-y-4">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Alternativas e Gabarito</label>
              <div className="grid gap-3">
                {opcoesS.value.map((op: string, idx: number) => {
                  const isCorrect = respostaCorretaS.value === idx;
                  return (
                    <div key={idx} className="flex items-center gap-3">
                      {/* BOTÃO DA LETRA - USANDO !IMPORTANT NO STYLE */}
                      <button
                        type="button"
                        onClick={() => { respostaCorretaS.value = idx; refresh(); }}
                        style={{
                          backgroundColor: isCorrect ? '#2563eb' : '#e2e8f0',
                          color: isCorrect ? '#ffffff' : '#64748b',
                          borderColor: isCorrect ? '#1e40af' : '#cbd5e1',
                          display: 'flex',
                          opacity: '1'
                        }}
                        className="shrink-0 w-10 h-10 rounded-xl border-2 font-black transition-all items-center justify-center shadow-sm"
                      >
                        {String.fromCharCode(65 + idx)}
                      </button>

                      <input
                        style={{
                           backgroundColor: isCorrect ? '#eff6ff' : '#f1f5f9',
                           borderColor: isCorrect ? '#3b82f6' : '#e2e8f0',
                           color: '#1e293b'
                        }}
                        className="flex-1 p-3 border-2 rounded-xl text-sm font-bold outline-none"
                        value={op}
                        onInput={(e) => {
                          const newOps = [...opcoesS.value];
                          newOps[idx] = e.currentTarget.value;
                          opcoesS.value = newOps;
                          refresh();
                        }}
                        placeholder={`Opção ${String.fromCharCode(65 + idx)}`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row gap-4">
              {/* BOTÃO SALVAR - AZUL SÓLIDO */}
              <button
                type="submit"
                disabled={!isFormValidS.value}
                style={{ 
                  backgroundColor: isFormValidS.value ? '#2563eb' : '#cbd5e1',
                  color: '#ffffff',
                  opacity: '1'
                }}
                className="flex-1 py-4 rounded-2xl font-black shadow-xl uppercase tracking-widest text-xs transition-all border-none"
              >
                {mode === "create" ? "Confirmar Criação" : "Salvar Alterações"}
              </button>
              
              {/* BOTÃO VOLTAR - PRETO/SLATE SÓLIDO */}
              <button 
                type="button"
                onClick={() => navigate("/questions")}
                style={{ 
                  backgroundColor: '#1e293b', 
                  color: '#ffffff',
                  opacity: '1',
                  display: 'inline-block'
                }}
                className="px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg border-none transition-all hover:bg-slate-700"
              >
                Voltar
              </button>
            </div>
          </form>
        </div>

        {/* PREVIEW (Mantido perfeito) */}
        <div className="w-full lg:max-w-md lg:sticky lg:top-10">
          <div className="bg-gradient-to-br from-blue-700 to-sky-500 rounded-[2.5rem] p-8 text-white shadow-[0_20px_50px_rgba(37,99,235,0.3)] min-h-[500px] flex flex-col border border-white/20">
            <div className="mb-8 flex justify-between items-center">
              <span className="bg-black/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase border border-white/10">
                Visualização
              </span>
              <div className={`w-3 h-3 rounded-full ${isFormValidS.value ? 'bg-amber-400' : 'bg-white/20'}`}></div>
            </div>

            <div className="flex-1">
              <h2 className="text-3xl font-extrabold leading-tight mb-10 drop-shadow-lg">
                {perguntaS.value || <span className="opacity-40 italic font-medium text-2xl">Título da Questão...</span>}
              </h2>

              <div className="space-y-4">
                {opcoesS.value.map((op: string, idx: number) => {
                  const isCorrect = respostaCorretaS.value === idx;
                  return (
                    <div 
                      key={idx}
                      className={`p-4 rounded-2xl border-2 transition-all duration-300 flex items-center gap-4 ${
                        isCorrect 
                          ? 'bg-amber-400 border-amber-300 text-slate-900 font-black shadow-[0_10px_20px_rgba(251,191,36,0.4)] scale-105' 
                          : 'bg-white/10 border-white/10 text-white/90 shadow-sm'
                      }`}
                    >
                      <span className={`w-8 h-8 flex items-center justify-center rounded-xl font-black text-sm ${isCorrect ? 'bg-slate-900 text-amber-400' : 'bg-white/20 text-white'}`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-lg font-bold truncate">{op || "..."}</span>
                      {isCorrect && (
                        <div className="ml-auto bg-slate-900 text-white text-[9px] px-2 py-1 rounded-md font-black">
                          CORRETA
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-10 text-center opacity-30 border-t border-white/10 pt-6">
              <p className="text-[10px] font-bold tracking-widest uppercase">Maker Quiz Reativo</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};