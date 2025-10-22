import { Quiz } from './components/Quiz';
import { Question } from './models/Question';

const questions: Question[] = [
  { id: 1, pergunta: 'Qual linguagem é usada no React?', opcoes: ['Python', 'JavaScript', 'Java'], respostaCorreta: 1 },
  { id: 2, pergunta: 'PrimeReact é uma biblioteca para?', opcoes: ['Backend', 'UI', 'Banco de dados'], respostaCorreta: 1 },
  { id: 3, pergunta: 'TypeScript é?', opcoes: ['Superset de JavaScript', 'Framework', 'Banco de dados'], respostaCorreta: 0 },
];

function App() {
  return (
    <div className="p-m-4">
      <h1>MakerQuiz</h1>
      <Quiz questions={questions} />
    </div>
  );
}

export default App;
