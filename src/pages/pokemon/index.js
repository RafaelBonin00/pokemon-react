import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import useApi from "../../services/useApi";
import PokemonTipo from "../../componetes/PokemonTipo";
import PokemonEvolution from "../../componetes/PokemonEvolution";
import PokemonStatus from "../../componetes/PokemonStatus";
import PokemonImageContainer from "../../componetes/PokemonImageContainer";

const Pokemon = () => {
  const { pokemon } = useParams();

  useEffect(() => {
        document.title = `PokeBoni - ${pokemon.charAt(0).toUpperCase() + pokemon.slice(1)}`;
    }, [pokemon]);

  const request = pokemon ? `pokemon/${pokemon}` : null;
  const { data, error, loading } = useApi(request);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar dados</div>;
  if (!data || !data.name) return <div>Nenhum Pokémon encontrado</div>;

  // Chama o hook SEMPRE, mas ele pode lidar com request null
  return (
  <div>
    <PokemonImageContainer name={data.name}/>
    <PokemonStatus data={data}/>
    <PokemonTipo tipos={data.types}/>
    <PokemonEvolution pokemon={pokemon}/>
  </div>
  );
};

export default Pokemon;

