import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Question } from '../models/Question';

interface QuizProps {
  questions: Question[];
}

export const Quiz: React.FC<QuizProps> = ({ questions }) => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (index: number) => {
    if (index === questions[current].respostaCorreta) {
      setScore(score + 1);
    }
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <Card>
        <h2>Quiz Finalizado!</h2>
        <p>Sua pontuação: {score} / {questions.length}</p>
      </Card>
    );
  }

  const q = questions[current];

  return (
    <Card>
      <h3>{q.pergunta}</h3>
      <div className="p-d-flex p-flex-column">
        {q.opcoes.map((opcao, idx) => (
          <Button key={idx} label={opcao} className="p-mb-2" onClick={() => handleAnswer(idx)} />
        ))}
      </div>
      <p>Questão {current + 1} de {questions.length}</p>
    </Card>
  );
};
