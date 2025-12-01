interface CrudButtonProps {
  label: string;
  variant?: "view" | "edit" | "delete" | "create";
  onClick: () => void;
}

const colors = {
  view: "bg-green-600 hover:bg-green-700 focus:ring-green-300",
  edit: "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-300",
  delete: "bg-red-600 hover:bg-red-700 focus:ring-red-300",
  create: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-300",
};

export const CrudButton = ({
  label,
  variant = "view",
  onClick,
}: CrudButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 
        rounded-lg 
        shadow 
        text-black
        font-medium
        transition
        focus:outline-none 
        focus:ring-2 
        ${colors[variant]}
      `}
    >
      {label}
    </button>
  );
};
