import { Question } from "../models/Question";
import { httpClient } from "./HttpClient";

const API_URL = "http://localhost:8000/api/questions/";

export const QuestionService = {
  async getAll(): Promise<Question[]> {
    return await httpClient.get(API_URL);
  },

  async getById(id: number): Promise<Question | null> {
    try {
      return await httpClient.get(`${API_URL}${id}/`);
    } catch {
      return null;
    }
  },

  async create(question: Omit<Question, "id">): Promise<Question> {
    return await httpClient.post(API_URL, question);
  },

  async update(question: Question): Promise<Question> {
    return await httpClient.put(`${API_URL}${question.id}/`, question);
  },

  async remove(id: number): Promise<void> {
    await httpClient.delete(`${API_URL}${id}/`);
  },
};
