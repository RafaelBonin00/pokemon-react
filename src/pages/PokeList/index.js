import { useEffect, useState } from "react";
import PokeListContainer from "../../componetes/PokeListContainer";
import "./style.css";

const Num_poke = Array.from({ length: 493 }, (_, i) => i + 1);

const geraFiltroGeracao = (gen) => {
  switch(gen) {
    case "gen1": return (id) => id >= 1 && id <= 151;
    case "gen2": return (id) => id >= 152 && id <= 251;
    case "gen3": return (id) => id >= 252 && id <= 386;
    case "gen4": return (id) => id >= 387 && id <= 493;
    case "gen5": return (id) => id >= 494 && id <= 649;
    case "gen6": return (id) => id >= 650 && id <= 721;
    case "gen7": return (id) => id >= 722 && id <= 809;
    case "gen8": return (id) => id >= 810 && id <= 898;
    case "gen9": return (id) => id >= 899 && id <= 1010;
    default: return () => true;
  }
}




const Pokelist = () => {
  const [busca, setBusca] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState(""); 
  const [geracaoFiltro, setGeracaoFiltro] = useState("");
  const [ordenarPor, setOrdenarPor] = useState("id-asc"); // id-asc, id-desc, nome-asc, nome-desc

    const limparFiltros = () => {
    setBusca("");
    setTipoFiltro("");
    setGeracaoFiltro("");
    setOrdenarPor("id-asc");
    };

  useEffect(() => {
    document.title = `PokeBoni - List`;
  }, []);

  const listaFiltradaPorGeracao = Num_poke.filter(geraFiltroGeracao(geracaoFiltro));


  const listaOrdenada = [...listaFiltradaPorGeracao].sort((a,b) => {
    if (ordenarPor === "id-asc") return a - b;
    if (ordenarPor === "id-desc") return b - a;
    return 0;
  });

  return (
    <div>
      <div className="filtros_container">


    <label>
    Buscar Pokémon:
    <input
        type="text"
        placeholder="Nome ou número..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
    />
    </label>


  <label>
    Filtrar por tipo:
    <select value={tipoFiltro} onChange={(e) => setTipoFiltro(e.target.value)}>
        <option value="">Todos</option>
        <option value="normal">Normal</option>
        <option value="fire">Fogo</option>
        <option value="water">Água</option>
        <option value="grass">Planta</option>
        <option value="electric">Elétrico</option>
        <option value="ice">Gelo</option>
        <option value="fighting">Lutador</option>
        <option value="poison">Veneno</option>
        <option value="ground">Terra</option>
        <option value="flying">Voador</option>
        <option value="psychic">Psíquico</option>
        <option value="bug">Inseto</option>
        <option value="rock">Pedra</option>
        <option value="ghost">Fantasma</option>
        <option value="dragon">Dragão</option>
        <option value="dark">Noturno</option>
        <option value="steel">Aço</option>
        <option value="fairy">Fada</option>
    </select>
  </label>

  <label>
    Filtrar por geração:
    <select value={geracaoFiltro} onChange={(e) => setGeracaoFiltro(e.target.value)}>
      <option value="">Todas</option>
        <option value="gen1">Geração 1 (1-151)</option>
        <option value="gen2">Geração 2 (152-251)</option>
        <option value="gen3">Geração 3 (252-386)</option>
        <option value="gen4">Geração 4 (387-493)</option>
        <option value="gen5">Geração 5 (494-649)</option>
        <option value="gen6">Geração 6 (650-721)</option>
        <option value="gen7">Geração 7 (722-809)</option>
        <option value="gen8">Geração 8 (810-898)</option>
        <option value="gen9">Geração 9 (899-1010)</option>
    </select>
  </label>

  <label>
    Ordenar por:
    <select value={ordenarPor} onChange={(e) => setOrdenarPor(e.target.value)}>
      <option value="id-asc">ID Ascendente</option>
      <option value="id-desc">ID Descendente</option>
      {/* Opcional: nome-asc/desc */}
    </select>
    </label>
    <label className="filtro-btn-x">
    <button onClick={limparFiltros} className="btn-limpar-filtros">×</button>
    </label>
</div>


      <div className="pokemon_div">
        {listaOrdenada.map((id) => (
          <PokeListContainer
            key={id}
            id={id}
            busca={busca}
            tipoFiltro={tipoFiltro}
          />
        ))}
      </div>
    </div>
  );
};

export default Pokelist;
