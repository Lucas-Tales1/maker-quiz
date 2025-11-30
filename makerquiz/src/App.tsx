import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QuestionList } from "./pages/QuestionList";
import { QuestionDetail } from "./pages/QuestionDetail";
import { QuestionForm } from "./pages/QuestionForm";
import { AppHeader } from "./components/AppHeader";

export default function App() {
  return (
    <BrowserRouter>
      <AppHeader />
      
      <Routes>
        <Route path="/questions" element={<QuestionList />} />
        <Route path="/questions/new" element={<QuestionForm mode="create" />} />
        <Route path="/questions/edit/:id" element={<QuestionForm mode="edit" />} />
        <Route path="/questions/:id" element={<QuestionDetail />} />

        <Route path="*" element={<Navigate to="/questions" />} />
      </Routes>
    </BrowserRouter>
  );
}
