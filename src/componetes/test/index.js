import useApi from "../../services/useApi";

const request = "type/3";

function PokemonData() {
  const { data, error, loading } = useApi(request);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p style={{ color: "red" }}>Erro: {error}</p>;
  if (!data) return null;

  return (
    <div>
      <h2>{data.name}</h2>
      <div>
        <h1>Attack</h1>
        <h2>Double damage to: {data.damage_relations.double_damage_to.map(t => t.name).join(", ")}</h2>
        <h2>Half damage to: {data.damage_relations.half_damage_to.map(t => t.name).join(", ")}</h2>
        <h2>No damage to: {data.damage_relations.no_damage_to.map(t => t.name).join(", ")}</h2>
      </div>
      <div>
        <h1>Defense</h1>
        <h2>Double damage from: {data.damage_relations.double_damage_from.map(t => t.name).join(", ")}</h2>
        <h2>Half damage from: {data.damage_relations.half_damage_from.map(t => t.name).join(", ")}</h2>
        <h2>No damage from: {data.damage_relations.no_damage_from.map(t => t.name).join(", ")}</h2>
      </div>
    </div>
  );
}

export default PokemonData;
