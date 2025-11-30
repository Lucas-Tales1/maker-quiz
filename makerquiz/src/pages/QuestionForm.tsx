import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { QuestionService } from "../services/QuestionService";
import { CrudButton } from "../components/CrudButton";

export const QuestionForm = ({ mode }: { mode: "create" | "edit" }) => {
    const navigate = useNavigate();
    const { state } = useLocation();

    const [pergunta, setPergunta] = useState(state?.pergunta || "");
    const [opcoes, setOpcoes] = useState(state?.opcoes || ["", "", "", ""]);
    const [respostaCorreta, setRespostaCorreta] = useState(state?.respostaCorreta ?? 0);

    const save = () => {
        if (mode === "create") {
            QuestionService.create({
                id: Date.now(),
                pergunta,
                opcoes,
                respostaCorreta,
            });
        } else {
            QuestionService.update({
                id: state.id,
                pergunta,
                opcoes,
                respostaCorreta,
            });
        }

        navigate("/questions");
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
            <h1 className="text-2xl font-semibold mb-4">
                {mode === "create" ? "Criar Pergunta" : "Editar Pergunta"}
            </h1>

            <label className="block mb-3">
                <span className="font-medium">Pergunta:</span>
                <input
                    className="w-full border rounded p-2 mt-1"
                    value={pergunta}
                    onChange={(e) => setPergunta(e.target.value)}
                />
            </label>

            <div className="mb-4">
                <span className="font-medium">Opções:</span>

                {opcoes.map((op: string, i: number) => (
                    <input
                        key={i}
                        value={op}
                        onChange={(e) => {
                            const updated = [...opcoes];
                            updated[i] = e.target.value;
                            setOpcoes(updated);
                        }}
                        className="w-full border rounded p-2 mt-2"
                    />
                ))}

            </div>

            <label className="block mb-4">
                <span className="font-medium">Resposta Correta (0-3):</span>
                <input
                    type="number"
                    className="w-full border rounded p-2 mt-1"
                    value={respostaCorreta}
                    min={0}
                    max={3}
                    onChange={(e) => setRespostaCorreta(Number(e.target.value))}
                />
            </label>

            <CrudButton
                label={mode === "create" ? "Cadastrar" : "Salvar Alterações"}
                variant="create"
                onClick={save}
            />
        </div>
    );
};
