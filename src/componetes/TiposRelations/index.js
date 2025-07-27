import React from "react";
import { Link } from "react-router-dom";
import TipoImage from "../tipoimage";

function Tiposrelations({ data, relation }) {
  const types = data.damage_relations[relation];

  return (
    <>
      {types.map((t) => (
        <Link to={`/tipos/${t.name}`} className="link-tipo" key={t.name}>
          <div className="tipo-item">
            <TipoImage tipo_imagem={t.name} />
          </div>
        </Link>
      ))}
    </>
  );
}

export default Tiposrelations;
