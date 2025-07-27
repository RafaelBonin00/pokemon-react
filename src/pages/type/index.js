import { Outlet, useParams } from "react-router-dom";
import Header_Tipos from "../../componetes/header_types";
import ListPokemonTipo from "../../componetes/ListPokemonTipo";
import { useEffect } from "react";

const Type = () => {
  const {tipo} = useParams()

  document.title = `PokeBoni - Types`;


  useEffect(() => {
  if (tipo) {
    const formatTipo = tipo
      .split('-')
      .map(t => t.charAt(0).toUpperCase() + t.slice(1))
      .join(' ');
    
    document.title = `PokeBoni - ${formatTipo}`;
  }
  }, [tipo]);;

  return (
    <div>
      <Header_Tipos />
      <Outlet />
      <ListPokemonTipo tipo={tipo}/>
    </div>
  );
};

export default Type;
