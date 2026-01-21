import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QuestionList } from "./pages/QuestionList";
import { QuestionDetail } from "./pages/QuestionDetail";
import { QuestionForm } from "./pages/QuestionForm";
import { Login } from "./pages/Login";
import { AppHeader } from "./components/AppHeader";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppHeader />
        
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route
            path="/questions"
            element={
              <ProtectedRoute>
                <QuestionList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/questions/new"
            element={
              <ProtectedRoute>
                <QuestionForm mode="create" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/questions/edit/:id"
            element={
              <ProtectedRoute>
                <QuestionForm mode="edit" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/questions/:id"
            element={
              <ProtectedRoute>
                <QuestionDetail />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/questions" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
