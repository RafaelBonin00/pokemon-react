
import "./style.css"


function Resposta_api(pokemonName){
    const url_poke = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    fetch(url_poke)
    .then(response => {
      if (!response.ok) {
        throw new Error("Pokémon não encontrado!");
      }
      return response.json();
    })
    .then(data => {
        const pokemonData = `
        <h2>${data.name.toUpperCase()}</h2>
        <img src="${data.sprites.front_default}" alt="${data.name}"/>
        <img src="${data.sprites.back_default}" alt="${data.name}" />
        <img src="${data.sprites.front_shiny}" alt="${data.name}" />
        <img src="${data.sprites.back_shiny}" alt="${data.name}" />
        <img src="${data.sprites.front_default}" alt="${data.name}" class="silhouette" />
        <p><strong>National N°:</strong> ${(data.id)}</p>
        <p><strong>Tipo:</strong> ${data.types.map(type => type.type.name).join(", ")}</p>
        <p><strong>Altura:</strong> ${(data.height / 10).toFixed(2)} metros</p>
        <p><strong>Peso:</strong> ${(data.weight / 10).toFixed(2)} quilos</p>
      `;
      document.getElementById("pokemonData").innerHTML = pokemonData;
    })

}

export default Resposta_api;