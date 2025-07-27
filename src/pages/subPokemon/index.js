import { useParams } from "react-router-dom";
import Pokemon from "../pokemon";

const SubPokemon = () => {
  const { pokemon } = useParams();
  return <Pokemon pokemon={pokemon} />;
};

export default SubPokemon;
