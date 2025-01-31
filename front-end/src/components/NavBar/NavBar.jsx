import { useState, useEffect, useRef } from "react";
import "./styles.css";
import "./responsivo.css";
import imgLogo from "../../img/GREENMIND.png";
import UserModal from "../Users/inputs/UserModal";
import CadastroModal from "../Users/inputs/CadastratModal";
import { Menu } from "lucide-react";

const NavBar = () => {
  // Estado para controlar a exibição do modal de login
  const [abrirCadastrado, setAbrirCadastrado] = useState(false);

  // Estado para controlar a exibição do modal de cadastro
  const [abrirCadastrar, setAbrirCadastrar] = useState(false);

  // Estado para controlar a abertura e fechamento do menu hambúrguer
  const [menuAberto, setMenuAberto] = useState(false);

  // useRef para referenciar o menu e detectar cliques fora dele
  const menuRef = useRef(null);

  // Função para alternar a visibilidade do menu
  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  // Efeito para fechar o menu quando o usuário clica fora dele
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Se o clique for fora do menu, ele é fechado
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAberto(false);
      }
    };

    // Adiciona o evento de clique ao documento quando o menu está aberto
    if (menuAberto) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Limpa o evento ao desmontar ou ao alterar o estado
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuAberto]);

  return (
    <main className="navbar-container" id="home">
      <div className="container-links">
        <img src={imgLogo} alt="imagem logo" />
        {/* Botão para abrir o menu hambúrguer */}
        <button className="menu-toggle" onClick={toggleMenu}>
          <Menu size={35} />
        </button>
      </div>
      {/* Menu lateral que se abre quando menuAberto for true */}
      <div ref={menuRef} className={`menu ${menuAberto ? "open" : ""}`}>
        <ul>
          <a href="#home">Home</a>
          <a href="#product">Products</a>
          <a href="#aboutus">About us</a>
        </ul>

        <div className="login">
          <button onClick={() => setAbrirCadastrado(true)}>Login</button>
          <button onClick={() => setAbrirCadastrar(true)}>Cadastrar</button>
        </div>
      </div>

      <UserModal
        abrirCadastrado={abrirCadastrado}
        fecharCadastrado={() => setAbrirCadastrado(false)}
      />
      <CadastroModal
        abrirCadastrar={abrirCadastrar}
        fecharCadastrar={() => setAbrirCadastrar(false)}
      />
    </main>
  );
};

export default NavBar;
