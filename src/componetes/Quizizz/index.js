import React, { useEffect, useState } from "react";

const Quiziz= ()=>{

    
    const perguntasQuiz = [
        {
        pergunta: "Qual desses tipos é fraco contra o tipo Água?",
        opcoes: ["Fogo", "Planta", "Elétrico", "Dragão"],
        resposta: "Fogo",
        },
        {
        pergunta: "Qual tipo é imune ao tipo Normal?",
        opcoes: ["Fantasma", "Lutador", "Inseto", "Fada"],
        resposta: "Fantasma",
        },
        {
        pergunta: "Qual tipo é forte contra o tipo Dragão?",
        opcoes: ["Gelo", "Fada", "Aço", "Água"],
        resposta: "Fada",
        },
        {
        pergunta: "Qual desses não é um tipo Pokémon?",
        opcoes: ["Sombrio", "Luz", "Fada", "Aço"],
        resposta: "Luz",
        },
    ];

    const [perguntaAtual, setPerguntaAtual] = useState({});
    const [respostaSelecionada, setRespostaSelecionada] = useState("");
    const [respostaCorreta, setRespostaCorreta] = useState(null);

    useEffect(() => {   
        const indexPergunta = Math.floor(Math.random() * perguntasQuiz.length);
        setPerguntaAtual(perguntasQuiz[indexPergunta]);
      }, []);

    const verificarResposta = (opcao) => {
        setRespostaSelecionada(opcao);
        setRespostaCorreta(opcao === perguntaAtual.resposta);
    };

    return(
        <section className="quiz_section">
            <h2>Mini Quiz Pokémon</h2>
            <p className="pergunta_quiz">{perguntaAtual.pergunta}</p>
            <div className="opcoes_quiz">
            {perguntaAtual.opcoes && perguntaAtual.opcoes.map((opcao, idx) => (
                <button
                key={idx}
                onClick={() => verificarResposta(opcao)}
                className={`quiz_opcao ${respostaSelecionada === opcao ? (respostaCorreta ? "correta" : "incorreta") : ""}`}
                >
                {opcao}
                </button>
            ))}
            </div>
            {respostaSelecionada && (
            <p className="feedback_quiz">
                {respostaCorreta ? "✅ Resposta correta!" : `❌ Resposta incorreta! A resposta certa é ${perguntaAtual.resposta}.`}
            </p>
            )}
      </section>
    )
}

export default Quiziz

