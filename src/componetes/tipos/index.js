import useApi from "../../services/useApi";
import Tiposrelations from '../TiposRelations';
import "./style.css"


function Tipos({ tipo_name }) {
  const request = `type/${tipo_name}`;
  const { data, error, loading } = useApi(request);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p style={{ color: "red" }}>Erro: {error}</p>;
  if (!data) return null;

  return (
    <div className="container-tipo">
      <h2>Pokemon do Tipo <strong>{data.name}</strong> são:</h2>

      <div className="secao">
        <h1>Ataque</h1>
        <h2>
          Forte Contra:
          <div className="tipos-container">
            <Tiposrelations data={data} relation="double_damage_to" />
          </div>
        </h2>
        <h2>
          Normal Contra:
          <div className="tipos-container">
            <Tiposrelations data={data} relation="half_damage_to" />
          </div>
        </h2>
        <h2>
          Fraco Contra:
          <div className="tipos-container">
            <Tiposrelations data={data} relation="no_damage_to" />
          </div>
        </h2>
      </div>

      <div className="secao">
        <h1>Defense</h1>
        <h2>
          Fraco Contra:
          <div className="tipos-container">
            <Tiposrelations data={data} relation="double_damage_from" />
          </div>
        </h2>
        <h2>
          Normal Contra:
          <div className="tipos-container">
            <Tiposrelations data={data} relation="half_damage_from" />
          </div>
        </h2>
        <h2>
          Forte Contra:
          <div className="tipos-container">
            <Tiposrelations data={data} relation="no_damage_from" />
          </div>
        </h2>
      </div>
    </div>
  );
}

export default Tipos;
