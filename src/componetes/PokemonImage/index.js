import "./style.css"


const PokemonImage = ({ data, className =""}) => {

  const Pokemon_url_image = data.sprites.other["official-artwork"].front_default;

  return (
        <img src={Pokemon_url_image} alt={data.name} className={className} />
  );
};

export default PokemonImage;
