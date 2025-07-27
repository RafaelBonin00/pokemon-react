import { Link } from "react-router-dom";
import useApi from "../../services/useApi";
import "./style.css";
import PokemonImageContainer from "../PokemonImageContainer";

const ListPokemonTipo = ({ tipo }) => {
  const request = tipo ? `type/${tipo}` : null;
  const { data, error, loading } = useApi(request);

  if (!tipo) return null;
  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar dados</div>;
  if (!data || !data.pokemon) return <div>Nenhum Pokémon encontrado</div>;

  return (
    <div className="pokemon_div">
      {data.pokemon
        .filter((item) => {
          const urlParts = item.pokemon.url.split("/").filter(Boolean);
          const id = Number(urlParts[urlParts.length - 1]);
          return id <= 386;
        })
        .map((item, index) => (
          <Link to={`/pokemon/${item.pokemon.name}`} key={index} className="pokemon_link">
            <PokemonImageContainer name={item.pokemon.name} />
          </Link>
        ))}
    </div>
  );
};

export default ListPokemonTipo;
