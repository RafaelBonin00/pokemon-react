import React, { useState } from "react";
import { Link } from "react-router-dom";
import useApi from "../../services/useApi";
import PokemonImage from "../PokemonImage";


const totalPokemons = 1010;

const PokemonAleatorioteste = () => {
  const [pokemonId, setPokemonId] = useState(
    Math.floor(Math.random() * totalPokemons) + 1
  );

  const { data: pokemonAleatorio, loading: carregandoPokemon } = useApi(`/pokemon/${pokemonId}`);
  const { data: pokemonAnterior } = useApi(pokemonId > 1 ? `/pokemon/${pokemonId- 1}`  : null);
  const { data: pokemonProximo } = useApi(pokemonId < totalPokemons ? `/pokemon/${pokemonId+ 1}`  : null);

  const sortearOutroPokemon = () => {
    const novoId = Math.floor(Math.random() * totalPokemons) + 1;
    setPokemonId(novoId);
  };

  const escolherVizinho = (id) => {
    setPokemonId(id);
  };

  return (
    <section className="pokemon_aleatorio_section">
      <h2>Pokémon Aleatório</h2>
      {carregandoPokemon ? (
        <p>Carregando Pokémon...</p>
      ) : (
        pokemonAleatorio && (
          <div>
            <div className="pokemon_visualizacao_linha">
              {pokemonAnterior && (
                <div className="pokemon_vizinho" onClick={() => escolherVizinho(pokemonAnterior.id)}>
                    <PokemonImage data={pokemonAnterior}/>
                  <p>#{pokemonAnterior.id}</p>
                  <p>{pokemonAnterior.name}</p>
                </div>
              )}

              <div className="pokemon_card principal">
                <Link to={`/pokemon/${pokemonAleatorio.name}`} className="pokemon_link">
                    <PokemonImage data={pokemonAleatorio} className="pokemon_img"/>
                </Link>
                <h3 className="pokemon_name">{pokemonAleatorio.name}</h3>
                <p><strong>N°:</strong> {pokemonAleatorio.id}</p>
                <p><strong>Tipos:</strong> {pokemonAleatorio.types.map(t => t.type.name).join(", ")}</p>
                <p><strong>Altura:</strong> {(pokemonAleatorio.height / 10).toFixed(1)} m</p>
                <p><strong>Peso:</strong> {(pokemonAleatorio.weight / 10).toFixed(1)} kg</p>
                <button onClick={sortearOutroPokemon} className="btn_novo_pokemon">
                  Sortear outro Pokémon
                </button>
              </div>

              {pokemonProximo && (
                <div className="pokemon_vizinho" onClick={() => escolherVizinho(pokemonProximo.id)}>
                  <PokemonImage data={pokemonProximo}/>
                  <p>#{pokemonProximo.id}</p>
                  <p>{pokemonProximo.name}</p>
                </div>
              )}
            </div>
          </div>
        )
      )}
    </section>
  );
};

export default PokemonAleatorioteste;
