import "./style.css";
import { Link } from "react-router-dom";
import useApi from "../../services/useApi";
import PokemonImageContainer from "../PokemonImageContainer";

function PokeListContainer({ id, busca, tipoFiltro }) {
  const { data: pokemon, erro, carregando } = useApi(`pokemon/${id}`);

  if (erro) return null;
  if (carregando || !pokemon) return null;

  function contemSomenteNumero(busca) {
    return /^\d+$/.test(busca);
  }

  // Filtrar por busca (nome ou ID)
  if (busca) {
    if (contemSomenteNumero(busca)) {
      if (!String(pokemon.id).includes(busca)) {
        return null;
      }
    } else {
      if (!pokemon.name.toLowerCase().includes(busca.toLowerCase())) {
        return null;
      }
    }
  }

  // Filtrar por tipo
  if (tipoFiltro) {
    const tipos = pokemon.types.map(t => t.type.name);
    if (!tipos.includes(tipoFiltro)) {
      return null;
    }
  }

  return (
    <Link to={`/pokemon/${pokemon.name}`} className="pokemon_link">
      <PokemonImageContainer name={pokemon.name} />
    </Link>
  );
}

export default PokeListContainer;
