import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Question } from '../models/Question';
import { Tag } from 'primereact/tag';

export const QuestionCrud: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [current, setCurrent] = useState<Question>({
    id: 0,
    pergunta: '',
    opcoes: ['', '', '', ''],
    respostaCorreta: 0,
  });

  // abrir diálogo para nova pergunta
  const openNew = () => {
    setCurrent({ id: 0, pergunta: '', opcoes: ['', '', '', ''], respostaCorreta: 0 });
    setDialogVisible(true);
  };

  // salvar (criar ou editar)
  const save = () => {
    if (current.pergunta.trim() === '') return;

    if (current.id === 0) {
      setQuestions([...questions, { ...current, id: questions.length + 1 }]);
    } else {
      setQuestions(questions.map(q => (q.id === current.id ? current : q)));
    }
    setDialogVisible(false);
  };

  // editar
  const edit = (q: Question) => {
    setCurrent(q);
    setDialogVisible(true);
  };

  // deletar
  const remove = (q: Question) => {
    setQuestions(questions.filter(item => item.id !== q.id));
  };

  // detalhar
  const detailBody = (q: Question) => (
    <Button
      icon="pi pi-eye"
      className="p-button-rounded p-button-info p-mr-2"
      onClick={() => alert(`Pergunta: ${q.pergunta}\nRespostas: ${q.opcoes.join(', ')}`)}
    />
  );

  return (
    <div className="p-m-4">
      <h2>Gerenciar Perguntas do Quiz</h2>
      <Button label="Nova Pergunta" icon="pi pi-plus" onClick={openNew} className="p-mb-3" />

      <DataTable value={questions} responsiveLayout="scroll">
        <Column field="id" header="ID" style={{ width: '10%' }}></Column>
        <Column field="pergunta" header="Pergunta"></Column>
        <Column
          header="Correta"
          body={(rowData) => <Tag value={`#${rowData.respostaCorreta + 1}`} severity="success" />}
        ></Column>
        <Column
          header="Ações"
          body={(rowData) => (
            <>
              {detailBody(rowData)}
              <Button
                icon="pi pi-pencil"
                className="p-button-rounded p-button-success p-mr-2"
                onClick={() => edit(rowData)}
              />
              <Button
                icon="pi pi-trash"
                className="p-button-rounded p-button-danger"
                onClick={() => remove(rowData)}
              />
            </>
          )}
        />
      </DataTable>

      <Dialog
        visible={dialogVisible}
        style={{ width: '500px' }}
        header="Pergunta"
        modal
        onHide={() => setDialogVisible(false)}
      >
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="pergunta">Pergunta</label>
            <InputText
              id="pergunta"
              value={current.pergunta}
              onChange={(e) => setCurrent({ ...current, pergunta: e.target.value })}
            />
          </div>

          <h5>Opções</h5>
          {current.opcoes.map((op, idx) => (
            <div className="p-field" key={idx}>
              <label htmlFor={`op${idx}`}>Opção {idx + 1}</label>
              <InputText
                id={`op${idx}`}
                value={op}
                onChange={(e) => {
                  const novas = [...current.opcoes];
                  novas[idx] = e.target.value;
                  setCurrent({ ...current, opcoes: novas });
                }}
              />
            </div>
          ))}

          <div className="p-field">
            <label htmlFor="respostaCorreta">Índice da Resposta Correta (0–3)</label>
            <InputNumber
              id="respostaCorreta"
              value={current.respostaCorreta}
              min={0}
              max={3}
              onValueChange={(e) =>
                setCurrent({ ...current, respostaCorreta: e.value ?? 0 })
              }
            />
          </div>

          <div className="p-d-flex p-jc-end p-mt-3">
            <Button
              label="Cancelar"
              icon="pi pi-times"
              onClick={() => setDialogVisible(false)}
              className="p-button-text p-mr-2"
            />
            <Button label="Salvar" icon="pi pi-check" onClick={save} />
          </div>
        </div>
      </Dialog>
    </div>
  );
};
