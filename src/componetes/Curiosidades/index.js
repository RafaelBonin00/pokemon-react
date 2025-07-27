import React, { useEffect, useState } from "react";

const Curiosidade  =()=>{
    
    const curiosidades = [
        "O Pokémon mais leve é Gastly, com apenas 0.1 kg!",
        "Arceus é conhecido como o criador do universo Pokémon.",
        "Ditto pode se transformar em qualquer outro Pokémon.",
        "Existem mais de 1000 Pokémon na Pokédex!",
        "Pikachu era originalmente mais gordinho nos primeiros designs.",
        "Eevee pode evoluir para 8 formas diferentes!",
        "Magikarp é inútil no começo, mas evolui para Gyarados!",
      ];
    const [curiosidade, setCuriosidade] = useState("");

    useEffect(() => {  
        const indexCuriosidade = Math.floor(Math.random() * curiosidades.length);
        setCuriosidade(curiosidades[indexCuriosidade]);
    }, []);
    
    return(
        <p className="curiosidade_texto"><h1>Curiosidade:</h1> {curiosidade}</p>

    )

}

export default Curiosidade


  