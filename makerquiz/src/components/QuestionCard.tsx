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
    <li className="p-4 border rounded-xl shadow-sm hover:shadow transition bg-gray-50">
      <div className="flex justify-between items-center">
        <b className="text-gray-800">{question.pergunta}</b>

        <div className="flex gap-2">
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
