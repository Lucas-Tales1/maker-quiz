import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { QuestionService } from "../services/QuestionService";
import { Question } from "../models/Question";
import { CrudButton } from "../components/CrudButton";

interface Props {
  mode: "create" | "edit";
}

export const QuestionForm = ({ mode }: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const stateQuestion = location.state as Question | undefined;

  const [pergunta, setPergunta] = useState("");
  const [opcoes, setOpcoes] = useState<string[]>(["", "", "", ""]);
  const [respostaCorreta, setRespostaCorreta] = useState<number>(0);

  useEffect(() => {
    if (mode === "edit" && id) {
      const load = async () => {
        const q =
          stateQuestion ||
          (await QuestionService.getById(Number(id)));

        if (q) {
          setPergunta(q.pergunta);
          setOpcoes(q.opcoes);
          setRespostaCorreta(q.respostaCorreta);
        }
      };

      load();
    }
  }, [mode, id, stateQuestion]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!pergunta.trim()) {
      alert("A pergunta não pode ser vazia!");
      return;
    }

    if (opcoes.some((op) => !op.trim())) {
      alert("Todas as opções devem ser preenchidas!");
      return;
    }

    if (mode === "create") {
      await QuestionService.create({
        pergunta,
        opcoes,
        respostaCorreta,
      });
    } else if (mode === "edit" && id) {
      await QuestionService.update({
        id: Number(id),
        pergunta,
        opcoes,
        respostaCorreta,
      });
    }

    navigate("/questions");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">
        {mode === "create" ? "Criar Pergunta" : "Editar Pergunta"}
      </h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="font-semibold">Pergunta:</label>
          <input
            className="w-full p-2 border rounded mt-1"
            value={pergunta}
            onChange={(e) => setPergunta(e.target.value)}
          />
        </div>

        <div>
          <label className="font-semibold">Opções:</label>
          {opcoes.map((op, idx) => (
            <input
              key={idx}
              className="w-full p-2 border rounded mt-2"
              value={op}
              onChange={(e) => {
                const newOp = [...opcoes];
                newOp[idx] = e.target.value;
                setOpcoes(newOp);
              }}
              placeholder={`Opção ${idx + 1}`}
            />
          ))}
        </div>

        <div>
          <label className="font-semibold block">Resposta Correta:</label>
          <select
            className="w-full p-2 border rounded mt-1"
            value={respostaCorreta}
            onChange={(e) => setRespostaCorreta(Number(e.target.value))}
          >
            {opcoes.map((_, idx) => (
              <option key={idx} value={idx}>
                Opção {idx + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3 justify-between pt-4">
          <CrudButton
            label={mode === "create" ? "Criar" : "Salvar Alterações"}
            variant="create"
            onClick={() => null}
          />

          <CrudButton
            label="Voltar"
            variant="view"
            onClick={() => navigate("/questions")}
          />
        </div>
      </form>
    </div>
  );
};
