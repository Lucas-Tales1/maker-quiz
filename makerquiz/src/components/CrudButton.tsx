interface CrudButtonProps {
  label: string;
  variant?: "view" | "edit" | "delete" | "create";
  onClick: () => void;
}

const colors = {
  view: "bg-green-600 hover:bg-green-700",
  edit: "bg-yellow-500 hover:bg-yellow-600",
  delete: "bg-red-600 hover:bg-red-700",
  create: "bg-blue-600 hover:bg-blue-700",
};

export const CrudButton = ({ label, variant = "view", onClick }: CrudButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 text-black rounded-lg shadow transition ${colors[variant]}`}
    >
      {label}
    </button>
  );
};
