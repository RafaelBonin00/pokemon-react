import { MdCatchingPokemon} from "react-icons/md";

import "./style.css"
import { Link } from "react-router-dom";

function Header(){
    return(
        <div className="HeaderContainer">
            <Link className="links_navegacao" to='/'><MdCatchingPokemon className="pokeball"/>Inicio</Link>
            <Link className="links_navegacao" to='/pokelist'><MdCatchingPokemon className="pokeball"/>Pokedex</Link>
            <Link className="links_navegacao" to='/movimentos'><MdCatchingPokemon className="pokeball"/>Movimentos</Link>
            <Link className="links_navegacao" to='/tipos'><MdCatchingPokemon className="pokeball"/>Tipos</Link>
            <Link className="links_navegacao" to='/itens'><MdCatchingPokemon className="pokeball"/>Itens</Link>
        </div>

    )
}

export default Header