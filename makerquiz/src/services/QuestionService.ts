// src/services/QuestionService.ts

import { Question } from "../models/Question";

const STORAGE_KEY = "questions_data";

function load(): Question[] {
  const json = localStorage.getItem(STORAGE_KEY);
  return json ? JSON.parse(json) : [];
}

function save(data: Question[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export const QuestionService = {
  getAll(): Question[] {
    return load();
  },

  getById(id: number): Question | null {
    return load().find(q => q.id === id) || null;
  },

  create(question: Question): Question {
    const data = load();
    const newQuestion = { ...question, id: data.length + 1 };
    data.push(newQuestion);
    save(data);
    return newQuestion;
  },

  update(question: Question): Question {
    const data = load().map(q => (q.id === question.id ? question : q));
    save(data);
    return question;
  },

  remove(id: number): void {
    const data = load().filter(q => q.id !== id);
    save(data);
  }
};
