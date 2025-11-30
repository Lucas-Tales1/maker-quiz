import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuestionService } from "../services/QuestionService";
import { Question } from "../models/Question";
import { QuestionCard } from "../components/QuestionCard";
import { CrudButton } from "../components/CrudButton";

export const QuestionList = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setQuestions(QuestionService.getAll());
  }, []);

  const goToDetail = (q: Question) => {
    navigate(`/questions/${q.id}`, { state: q });
  };

  const goToEdit = (q: Question) => {
    navigate(`/questions/edit/${q.id}`, { state: q });
  };

  const removeQuestion = (id: number) => {
    QuestionService.remove(id);
    setQuestions(QuestionService.getAll());
  };

  const goToCreate = () => navigate(`/questions/new`);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          Listagem de Perguntas
        </h1>

        <CrudButton label="Nova Pergunta" variant="create" onClick={goToCreate} />
      </div>

      {questions.length === 0 ? (
        <p className="text-gray-500 text-center">Nenhuma pergunta cadastrada.</p>
      ) : (
        <ul className="space-y-4">
          {questions.map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              onView={() => goToDetail(q)}
              onEdit={() => goToEdit(q)}
              onDelete={() => removeQuestion(q.id)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
