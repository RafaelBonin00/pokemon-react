import React, { useState, useEffect } from "react";
import "./style.css";
import useApi from "../../services/useApi";
import { Link } from "react-router-dom";
import PokemonImage from "../PokemonImage";
import { GrCaretNext } from "react-icons/gr";


function PokemonEvolution({ pokemon }) {
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [error, setError] = useState(null);
  const [loadingChain, setLoadingChain] = useState(true);


  const {
    data: pokemonData,
    error: apiError,
    loading: apiLoading,
  } = useApi(pokemon ? `/pokemon/${pokemon.toLowerCase()}` : null);

  useEffect(() => {
    const fetchEvolutionData = async () => {
      if (!pokemonData) return;
      setLoadingChain(true);
      setError(null);
      setEvolutionChain([]);

      try {
        // Busca dados da espécie
        const type = await fetch(pokemonData.species.url);
        if (!type.ok) throw new Error("Espécie não encontrada");
        const speciesData = await type.json();

        // Busca a cadeia de evolução
        const evolution_chain = await fetch(speciesData.evolution_chain.url);
        if (!evolution_chain.ok) throw new Error("Chain de evolução não encontrada");
        const chainData = await evolution_chain.json();

        // Extrai nomes da cadeia
        const names = [];
        const extractChain = (chain) => {
          names.push(chain.species.name);
          if (chain.evolves_to.length > 0) {
            extractChain(chain.evolves_to[0]);
          }
        };
        extractChain(chainData.chain);


        const detailedData = await Promise.all(
          names.map(async (name) => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
            if (!response.ok) throw new Error(`Erro ao buscar dados de ${name}`);
            const data = await response.json();
            return { data }; 
          })
        );

        setEvolutionChain(detailedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingChain(false);
      }
    };

    if (pokemonData) {
      fetchEvolutionData();
    }
  }, [pokemonData]);

  if (apiLoading || loadingChain) return <p>Carregando...</p>;
  if (apiError || error) return <p className="error-msg">Erro: {apiError || error}</p>;

  return (
    <div className="evolution-container">
      <h2>Evoluções</h2>
      <div className="evolution-chain">
        {evolutionChain.map(({ data: pokemon }, idx) => (
          <React.Fragment key={pokemon.id}>
            <div className="pokemon-card">
              <Link to={`/pokemon/${pokemon.name}`} className="pokemon_link">
                <PokemonImage data={pokemon} />
                <h4>{pokemon.name.toUpperCase()}</h4>
                <h4>Nº {pokemon.id}</h4>
              </Link>
            </div>
            {idx < evolutionChain.length - 1 && (
              <span className="arrow"><GrCaretNext /></span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default PokemonEvolution;
