import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuestionService } from "../services/QuestionService";
import { Question } from "../models/Question";
import { CrudButton } from "../components/CrudButton";
import { QuestionCard } from "../components/QuestionCard";

export const QuestionList = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const data = await QuestionService.getAll();
      setQuestions(data);
    };
    load();
  }, []);

  const removeQuestion = async (id: number) => {
    await QuestionService.remove(id);
    const data = await QuestionService.getAll();
    setQuestions(data);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Listagem de Perguntas</h1>

        <CrudButton
          label="Nova Pergunta"
          variant="create"
          onClick={() => navigate("/questions/new")}
        />
      </div>

      <ul className="space-y-3">
        {questions.map((q) => (
          <QuestionCard
            key={q.id}
            question={q}
            onView={() => navigate(`/questions/${q.id}`, { state: q })}
            onEdit={() => navigate(`/questions/edit/${q.id}`, { state: q })}
            onDelete={() => removeQuestion(q.id)}
          />
        ))}
      </ul>
    </div>
  );
};
