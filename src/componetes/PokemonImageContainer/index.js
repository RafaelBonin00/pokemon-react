import useApi from "../../services/useApi";
import PokemonImage from "../PokemonImage";
import "./style.css"

function aoClicar(id){
  console.log("click "+id)
}


const PokemonImageContainer = ({ name }) => {
  const request = `pokemon/${name}`;
  const { data, error, loading } = useApi(request);

  if (loading) return <div></div>;
  if (error) return <div>Erro ao carregar imagem</div>;
  if (!data || !data.sprites) return <div></div>;

  return (
    <div className='pokemon_item' onClick={() => aoClicar(data.name)}>
      <h2>{data.name.toUpperCase()}</h2>
      <div className='bola_escura'>
        <PokemonImage data={data}/>
      </div>
      <p><strong>N°:</strong> {data.id}</p>
    </div>
  );
};

export default PokemonImageContainer;
