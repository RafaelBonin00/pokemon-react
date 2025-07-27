import useApi from "../../services/useApi";
import { Link } from "react-router-dom";
import TipoImage from "../tipoimage";



function Tipo({ request }) {
  const { data, error, loading } = useApi(request);

  if (loading) return <></>;
  if (error) return <p style={{ color: "red" }}>Erro: {error}</p>;
  if (!data) return null;

  return (
    <Link to={`/tipos/${data.name}`}>
      <TipoImage tipo_imagem={data.name} />
    </Link>
  );
}

export default Tipo