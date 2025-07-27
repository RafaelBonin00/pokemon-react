import "./style.css";
import Tipo from "../Tipo";



const requests = Array.from({ length: 18 }, (_, i) => i + 1);

function Header_Tipos() {
  return (
    <div className="HeaderTiposContainer">
      <h2>Tipos dos Pokémons</h2>
      <div className="HeaderTipos">
        {requests.map((tipos) => (
          <Tipo key={tipos} request={`type/${tipos}`}></Tipo>
        ))}
      </div>
    </div>
  );
}

export default Header_Tipos;
