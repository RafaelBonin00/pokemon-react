import { useParams } from "react-router-dom";
import Tipos from "../../componetes/tipos";

const SubType = () => {
  const { tipo } = useParams();
  return <Tipos tipo_name={tipo} />;
};

export default SubType;
