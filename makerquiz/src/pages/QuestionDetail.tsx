import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Question } from "../models/Question";
import { QuestionService } from "../services/QuestionService";
import { CrudButton } from "../components/CrudButton";

export const QuestionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [question, setQuestion] = useState<Question | null>(state || null);

  useEffect(() => {
    if (!question && id) {
      const found = QuestionService.getById(Number(id));
      setQuestion(found || null);
    }
  }, [id, question]);

  if (!question) {
    return (
      <div className="p-6 text-center text-gray-600">
        Carregando...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Detalhes da Pergunta
      </h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Pergunta:</h2>
        <p className="text-gray-700 mt-2">{question.pergunta}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Opções:</h2>
        <ul className="mt-2 space-y-2">
          {question.opcoes.map((op: string, index: number) => (
            <li
              key={index}
              className={`p-3 border rounded-lg ${
                question.respostaCorreta === index
                  ? "bg-green-100 border-green-400 text-green-700 font-bold"
                  : "bg-gray-100 border-gray-300"
              }`}
            >
              {index + 1}. {op}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-3 mt-6">
        <CrudButton
          label="Voltar"
          variant="view"
          onClick={() => navigate("/questions")}
        />

        <CrudButton
          label="Editar"
          variant="edit"
          onClick={() =>
            navigate(`/questions/edit/${question.id}`, { state: question })
          }
        />
      </div>
    </div>
  );
};
