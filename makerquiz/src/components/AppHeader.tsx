import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const AppHeader = () => {
  const navigate = useNavigate();
  const { isAuthenticated, username, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="w-full bg-gradient-to-r from-blue-600 to-sky-500 shadow">
      <div className="flex justify-between items-center px-6 py-6">
        <h1 className="text-4xl font-extrabold text-white tracking-wide">
          Maker Quiz
        </h1>
        {isAuthenticated && (
          <div className="flex items-center gap-4">
            <span className="text-white font-semibold">{username}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
