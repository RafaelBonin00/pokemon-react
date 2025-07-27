import { useState, useEffect } from "react";
import "./style.css";

const PokemonTipo = ({ tipos }) => {
  const [damageRelations, setDamageRelations] = useState({
    doubleDamageTo: [],
    doubleDamageFrom: [],
    halfDamageTo: [],
    noDamageTo: [],
    halfDamageFrom: [],
    noDamageFrom: []
  });

  useEffect(() => {
    async function fetchDamageRelations() {
      if (!tipos || tipos.length === 0) return;

      const sets = {
        doubleDamageTo: new Set(),
        doubleDamageFrom: new Set(),
        halfDamageTo: new Set(),
        noDamageTo: new Set(),
        halfDamageFrom: new Set(),
        noDamageFrom: new Set()
      };

      const addToSet = (set, list) => {
        list.forEach(item => set.add(item.name));
      };

      const responses = await Promise.all(
        tipos.map(({ type }) =>
          fetch(`https://pokeapi.co/api/v2/type/${type.name}`).then(res => res.json())
        )
      );

      responses.forEach(data => {
        const rel = data.damage_relations;
        addToSet(sets.doubleDamageTo, rel.double_damage_to);
        addToSet(sets.doubleDamageFrom, rel.double_damage_from);
        addToSet(sets.halfDamageTo, rel.half_damage_to);
        addToSet(sets.noDamageTo, rel.no_damage_to);
        addToSet(sets.halfDamageFrom, rel.half_damage_from);
        addToSet(sets.noDamageFrom, rel.no_damage_from);
      });

      setDamageRelations({
        doubleDamageTo: Array.from(sets.doubleDamageTo),
        doubleDamageFrom: Array.from(sets.doubleDamageFrom),
        halfDamageTo: Array.from(sets.halfDamageTo),
        noDamageTo: Array.from(sets.noDamageTo),
        halfDamageFrom: Array.from(sets.halfDamageFrom),
        noDamageFrom: Array.from(sets.noDamageFrom)
      });
    }

    fetchDamageRelations();
  }, [tipos]);

  const renderList = (title, list) => (
    <div className="damage-section">
      <h3>{title}:</h3>
      <ul>
        {list.map((tipo, idx) => (
          <li key={idx}>{tipo}</li>
        ))}
      </ul>
    </div>
  );


  return (
    <div className="TiposDiv">
      <div>
        <h1>Ataque</h1>
        {renderList("Forte Contra", damageRelations.doubleDamageTo)}
        {renderList("Normal Contra", damageRelations.halfDamageTo)}
        {renderList("Fraco Contra", damageRelations.noDamageTo)}
      </div>

      <div>
        <h1>Defesa</h1>
        {renderList("Fraco Contra", damageRelations.doubleDamageFrom)}
        {renderList("Normal Contra", damageRelations.halfDamageFrom)}
        {renderList("Forte Contra", damageRelations.noDamageFrom)}
      </div>
    </div>
  );
};

export default PokemonTipo;
