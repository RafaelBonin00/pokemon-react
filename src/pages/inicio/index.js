import React, { useEffect, useState } from "react";
import "./inicio.css";
import { Link } from "react-router-dom";
import Curiosidade from "../../componetes/Curiosidades";
import Quiziz from "../../componetes/Quizizz";
import PokemonAleatorioteste from "../../componetes/PokemonAleatorio";
import DescribrirPokemon from "../../componetes/DescrobrirPokemon";

const Inicio = () => {

  useEffect(() => {
    document.title = `PokeBoni - Início`;
  }, []);



  return (
    <div className="inicio_container">
      <header className="intro_section">
        <h1>Bem-vindo ao PokeBoni!</h1>
        <p>
          Explore o incrível mundo dos Pokémon! Aqui você pode navegar pela Pokédex, conferir movimentos,
          tipos e itens usados pelos treinadores. Se você é fã da franquia, este site é para você!
        </p>
        <p>
          Comece conhecendo um Pokémon aleatório e descubra suas características principais.
          Use os links abaixo para explorar mais.
        </p>

        <Curiosidade/>
      </header>
      
      <PokemonAleatorioteste/>
      <Quiziz/>
      <DescribrirPokemon/>
    </div>
  );
};

export default Inicio;
