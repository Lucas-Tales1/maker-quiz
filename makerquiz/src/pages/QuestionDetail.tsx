import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { QuestionService } from "../services/QuestionService";
import { Question } from "../models/Question";
import { CrudButton } from "../components/CrudButton";

export const QuestionDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [question, setQuestion] = useState<Question | null>(state || null);

  useEffect(() => {
    const load = async () => {
      if (!question && id) {
        const found = await QuestionService.getById(Number(id));
        setQuestion(found);
      }
    };
    load();
  }, [id, question]);

  if (!question) return <p>Carregando...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">Detalhes da Pergunta</h1>

      <p className="mt-3 text-lg"><b>Pergunta:</b> {question.pergunta}</p>

      <h2 className="mt-4 font-semibold">Opções:</h2>
      <ul className="list-disc ml-6">
        {question.opcoes.map((op, i) => (
          <li key={i}>{op}</li>
        ))}
      </ul>

      <p className="mt-4">
        <b>Resposta correta:</b> #{question.respostaCorreta + 1}
      </p>

      <div className="mt-6">
        <CrudButton
          label="Voltar"
          variant="view"
          onClick={() => navigate("/questions")}
        />
      </div>
    </div>
  );
};
