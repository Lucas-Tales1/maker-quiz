import { Question } from "../models/Question";
import { CrudButton } from "./CrudButton";

interface Props {
  question: Question;
  onView: () => void;
  onEdit: () => void;
  onDelete?: () => void;
}

export const QuestionCard = ({ question, onView, onEdit, onDelete }: Props) => {
  return (
    <li className="p-5 border rounded-2xl shadow-sm hover:shadow-md transition bg-white">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <p className="text-gray-900 font-semibold text-lg">
            {question.pergunta}
          </p>

          <p className="text-sm text-gray-600 mt-1">
            {question.opcoes?.length} opções | Resposta correta:{" "}
            <span className="font-medium text-gray-700">
              {question.respostaCorreta}
            </span>
          </p>
        </div>

        <div className="flex gap-2 h-fit">
          <CrudButton label="Ver" variant="view" onClick={onView} />
          <CrudButton label="Editar" variant="edit" onClick={onEdit} />

          {onDelete && (
            <CrudButton label="Excluir" variant="delete" onClick={onDelete} />
          )}
        </div>
      </div>
    </li>
  );
};
