import { Question } from "../models/Question";

const API_URL = "http://localhost:8000/api/questions/";

export const QuestionService = {
  async getAll(): Promise<Question[]> {
    const res = await fetch(API_URL);
    return await res.json();
  },

  async getById(id: number): Promise<Question | null> {
    const res = await fetch(`${API_URL}${id}/`);
    if (!res.ok) return null;
    return await res.json();
  },

  async create(question: Omit<Question, "id">): Promise<Question> {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(question),
    });
    return await res.json();
  },

  async update(question: Question): Promise<Question> {
    const res = await fetch(`${API_URL}${question.id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(question),
    });
    return await res.json();
  },

  async remove(id: number): Promise<void> {
    await fetch(`${API_URL}${id}/`, {
      method: "DELETE",
    });
  },
};
