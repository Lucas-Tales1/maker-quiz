import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Tag } from 'primereact/tag';
import { Question } from '../models/Question';
import { AppButton } from './AppButton';
import { CardContainer } from './CardContainer';
import { Button } from 'primereact/button';

export const QuestionCrud: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [current, setCurrent] = useState<Question>({
    id: 0,
    pergunta: '',
    opcoes: ['', '', '', ''],
    respostaCorreta: 0,
  });

  const openNew = () => {
    setCurrent({ id: 0, pergunta: '', opcoes: ['', '', '', ''], respostaCorreta: 0 });
    setDialogVisible(true);
  };

  const save = () => {
    if (current.pergunta.trim() === '') return;

    if (current.id === 0) {
      setQuestions([...questions, { ...current, id: questions.length + 1 }]);
    } else {
      setQuestions(questions.map((q) => (q.id === current.id ? current : q)));
    }
    setDialogVisible(false);
  };

  const edit = (q: Question) => {
    setCurrent(q);
    setDialogVisible(true);
  };

  const remove = (q: Question) => {
    setQuestions(questions.filter((item) => item.id !== q.id));
  };

  const detailBody = (q: Question) => (
    <Button
      icon="pi pi-eye"
      className="!rounded-full !bg-sky-500 hover:!bg-sky-600 !border-none !p-2 shadow-sm"
      onClick={() => alert(`Pergunta: ${q.pergunta}\nRespostas: ${q.opcoes.join(', ')}`)}
    />
  );

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        <CardContainer title="Gerenciar Perguntas do Quiz">
          <div className="flex justify-between items-center mb-4">
            <AppButton label="Nova Pergunta" icon="pi pi-plus" color="success" onClick={openNew} />
            <span className="text-sm text-gray-500">{questions.length} perguntas cadastradas</span>
          </div>

          <DataTable
            value={questions}
            stripedRows
            responsiveLayout="scroll"
            className="rounded-lg overflow-hidden border border-gray-200 shadow-sm"
            emptyMessage="Nenhuma pergunta cadastrada ainda."
          >
            <Column field="id" header="ID" style={{ width: '10%' }}></Column>
            <Column field="pergunta" header="Pergunta"></Column>
            <Column
              header="Correta"
              body={(rowData) => (
                <Tag value={`#${rowData.respostaCorreta + 1}`} severity="success" />
              )}
            />
            <Column
              header="Ações"
              body={(rowData) => (
                <div className="flex gap-2 justify-center">
                  {detailBody(rowData)}
                  <Button
                    icon="pi pi-pencil"
                    className="!rounded-full !bg-emerald-500 hover:!bg-emerald-600 !border-none !p-2"
                    onClick={() => edit(rowData)}
                  />
                  <Button
                    icon="pi pi-trash"
                    className="!rounded-full !bg-red-500 hover:!bg-red-600 !border-none !p-2"
                    onClick={() => remove(rowData)}
                  />
                </div>
              )}
            />
          </DataTable>
        </CardContainer>
      </div>

      <Dialog
        visible={dialogVisible}
        style={{ width: '500px' }}
        header="Nova Pergunta"
        modal
        onHide={() => setDialogVisible(false)}
      >
        <div className="flex flex-col gap-5">
          <div>
            <label
              htmlFor="pergunta"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Pergunta
            </label>
            <InputText
              id="pergunta"
              value={current.pergunta}
              onChange={(e) => setCurrent({ ...current, pergunta: e.target.value })}
              className="w-full border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg p-2 bg-gray-50 text-gray-800 transition-all duration-150"
              placeholder="Digite a pergunta aqui..."
            />
          </div>

          <div>
            <h5 className="font-semibold text-gray-700 mb-2">Opções</h5>
            <div className="flex flex-col gap-3">
              {current.opcoes.map((op, idx) => (
                <div key={idx}>
                  <label
                    htmlFor={`op${idx}`}
                    className="block text-sm font-medium text-gray-600 mb-1"
                  >
                    Opção {idx + 1}
                  </label>
                  <InputText
                    id={`op${idx}`}
                    value={op}
                    onChange={(e) => {
                      const novas = [...current.opcoes];
                      novas[idx] = e.target.value;
                      setCurrent({ ...current, opcoes: novas });
                    }}
                    className="w-full border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg p-2 bg-gray-50 text-gray-800 transition-all duration-150"
                    placeholder={`Digite o texto da opção ${idx + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="respostaCorreta"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Índice da Resposta Correta (0–3)
            </label>
            <InputNumber
              id="respostaCorreta"
              value={current.respostaCorreta}
              min={0}
              max={3}
              onValueChange={(e) =>
                setCurrent({ ...current, respostaCorreta: e.value ?? 0 })
              }
              className="w-full border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg p-2 bg-gray-50 text-gray-800 transition-all duration-150"
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <Button
              label="Cancelar"
              icon="pi pi-times"
              onClick={() => setDialogVisible(false)}
              className="!bg-gray-200 hover:!bg-gray-300 !text-gray-800 !border-none"
            />
            <Button
              label="Salvar"
              icon="pi pi-check"
              onClick={save}
              className="!bg-blue-600 hover:!bg-blue-700 !border-none"
            />
          </div>
        </div>
      </Dialog>
              
    </div>
  );
};
