import { Routes, Route } from "react-router-dom";
import Inicio from "../../pages/inicio";
import Type from "../../pages/type";
import SubType from "../../pages/subtype"; // componente para o tipo dinâmico
import Pokelist from "../../pages/PokeList";
import Pokemon from "../../pages/pokemon";
import SubPokemon from "../../pages/subPokemon";
import Movimentos from "../../pages/Movimentos";
import Itens from "../../pages/Itens";


const ServRotas = () => {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/movimentos" element={<Movimentos />} />
      <Route path="/itens" element={<Itens />} />

      {/* Rota pai /tipos */}
      <Route path="/tipos" element={<Type />}>
        {/* Rota filha para o parâmetro dinâmico :tipo */}
        <Route path=":tipo" element={<SubType />} />
      </Route>
      <Route path="/pokemon" element={<Pokemon />}>
        {/* Rota filha para o parâmetro dinâmico :tipo */}
        <Route path=":pokemon" element={<SubPokemon/>} />
      </Route>
      <Route path="/pokelist" element={<Pokelist />} />
    </Routes>
  );
};

export default ServRotas;
