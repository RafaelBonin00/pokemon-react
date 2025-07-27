import React, { useState } from "react";
import { Link } from "react-router-dom";
import useApi from "../../services/useApi";
import PokemonImage from "../PokemonImage";
import "./style.css";

const geracoes = {
  gen1: { min: 1, max: 151, label: "Geração 1 (1-151)" },
  gen2: { min: 152, max: 251, label: "Geração 2 (152-251)" },
  gen3: { min: 252, max: 386, label: "Geração 3 (252-386)" },
  gen4: { min: 387, max: 493, label: "Geração 4 (387-493)" },
  gen5: { min: 494, max: 649, label: "Geração 5 (494-649)" },
  gen6: { min: 650, max: 721, label: "Geração 6 (650-721)" },
  gen7: { min: 722, max: 809, label: "Geração 7 (722-809)" },
  gen8: { min: 810, max: 898, label: "Geração 8 (810-898)" },
  gen9: { min: 899, max: 1010, label: "Geração 9 (899-1010)" },
};

const getRandomIdFromSelectedGens = (selectedGens) => {
  if (selectedGens.length === 0) selectedGens = Object.keys(geracoes);
  let todosIds = [];

  selectedGens.forEach((genKey) => {
    const { min, max } = geracoes[genKey];
    for (let i = min; i <= max; i++) {
      todosIds.push(i);
    }
  });

  const randomIndex = Math.floor(Math.random() * todosIds.length);
  return todosIds[randomIndex];
};

const DescribrirPokemon = () => {
  const [selectedGenerations, setSelectedGenerations] = useState(["gen1"]);
  const [pokemonId, setPokemonId] = useState(getRandomIdFromSelectedGens(["gen1"]));
  const [inputValor, setInputValor] = useState("");
  const [correto, setCorreto] = useState(false);
  const [mostrarMensagem, setMostrarMensagem] = useState(false);
  const [tentativas, setTentativas] = useState(0);
  const [nivelDica, setNivelDica] = useState(0);
  const [indicesRevelados, setIndicesRevelados] = useState(new Set());
  const [bloqueado, setBloqueado] = useState(false);

  const { data: pokemonAleatorio } = useApi(`/pokemon/${pokemonId}`);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setSelectedGenerations((prev) => {
      return checked ? [...prev, value] : prev.filter((gen) => gen !== value);
    });
  };

  const sortearOutroPokemon = () => {
    const novoId = getRandomIdFromSelectedGens(selectedGenerations);
    setPokemonId(novoId);
    setInputValor("");
    setCorreto(false);
    setMostrarMensagem(false);
    setTentativas(0);
    setNivelDica(0);
    setIndicesRevelados(new Set());
    setBloqueado(false);
  };

  const gerarDica = (nome, indices) => {
    const letras = nome.split("");
    return letras
      .map((letra, idx) => (indices.has(idx) ? letra : "_"))
      .join(" ");
  };

  const obterDicaAtual = () => {
    if (!pokemonAleatorio) return "";
    return gerarDica(pokemonAleatorio.name.toLowerCase(), indicesRevelados);
  };

  const pedirNovaDica = () => {
    if (!pokemonAleatorio || nivelDica >= 3) return;

    const nome = pokemonAleatorio.name.toLowerCase();
    const porcentagens = [10, 30, 50];
    const novaPorcentagem = porcentagens[nivelDica];
    const totalParaMostrar = Math.ceil(nome.length * (novaPorcentagem / 100));

    const novosIndices = new Set(indicesRevelados);
    while (novosIndices.size < totalParaMostrar) {
      const randomIndex = Math.floor(Math.random() * nome.length);
      novosIndices.add(randomIndex);
    }

    setIndicesRevelados(novosIndices);
    setNivelDica(nivelDica + 1);
  };

  const handleChange = (e) => {
    setInputValor(e.target.value);
  };

  const verificarResposta = () => {
    if (!pokemonAleatorio || bloqueado || inputValor.trim() === "") return;

    const ehCorreto = pokemonAleatorio.name.toLowerCase() === inputValor.trim().toLowerCase();

    if (ehCorreto) {
      setCorreto(true);
      setMostrarMensagem(true);
      setBloqueado(true);
    } else {
      const novaTentativa = tentativas + 1;
      setTentativas(novaTentativa);
      if (novaTentativa >= 3) {
        setBloqueado(true);
        setMostrarMensagem(true);
      }
    }
  };

  return (
    <section className="pokemon_aleatorio_section">
      <h2>Quem é esse Pokémon?</h2>
      <div className="container_horizontal">
        <fieldset className="generations_fieldset">
          <legend>Escolha a(s) geração(ões):</legend>
          {Object.entries(geracoes).map(([key, { label }]) => (
            <label key={key} className="generation_label">
              <input
                type="checkbox"
                value={key}
                checked={selectedGenerations.includes(key)}
                onChange={handleCheckboxChange}
              />
              {label}
            </label>
          ))}
        </fieldset>

        <div className="pokemon_visualizacao_linha">
          <div className="pokemon_card principal">
            <input
              value={inputValor}
              onChange={handleChange}
              placeholder="Digite o nome do Pokémon"
              disabled={bloqueado}
            />

            <button
              onClick={verificarResposta}
              disabled={bloqueado || inputValor.trim() === ""}
            >
              Verificar
            </button>

            {pokemonAleatorio && (
              <>
                <p><strong>Tentativas:</strong> {tentativas} / 3</p>
                {correto ? (
                  <Link to={`/pokemon/${pokemonAleatorio.name}`} className="pokemon_link">
                    <PokemonImage data={pokemonAleatorio} className="pokemon_img" />
                  </Link>
                ) : (
                  <div className="pokemon_img_disabled">
                    <PokemonImage data={pokemonAleatorio} className="pokemon_img sombra" />
                  </div>
                )}

                <h3 className="pokemon_name">
                  {correto || bloqueado ? pokemonAleatorio.name : "???"}
                </h3>

                {mostrarMensagem && correto && (
                  <p className="acerto_mensagem">🎉 Parabéns! Você acertou!</p>
                )}

                {mostrarMensagem && !correto && (
                  <p className="erro_mensagem">
                    ❌ Limite de tentativas atingido! Era: <strong>{pokemonAleatorio.name}</strong>
                  </p>
                )}

                <p><strong>N°:</strong> {correto || bloqueado ? pokemonAleatorio.id : "???"}</p>

                {nivelDica > 0 && (
                  <p className="dica_texto">Dica: {obterDicaAtual()}</p>
                )}

                {nivelDica < 3 && !bloqueado && (
                  <button onClick={pedirNovaDica}>
                    Dica {nivelDica + 1}
                  </button>
                )}
              </>
            )}

            <button onClick={sortearOutroPokemon} className="btn_novo_pokemon">
              Sortear outro Pokémon
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DescribrirPokemon;
