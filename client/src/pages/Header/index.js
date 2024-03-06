import Logo from '../../svg/icon-logo.svg'; // ou blog-logo.svg conforme o seu arquivo
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Context from 'pages/Context';
import api from 'services/api';

const Header = () => {
  const { token, idUser, setToken, setIdUser } = useContext(Context);
  const [nameUser, setNameUser] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    if (token && idUser) {
      api.get(`/users/${idUser}`) // Certifique-se de que a rota está correta conforme a API
        .then((response) => {
          setNameUser(response.data.name); // Ajuste conforme a estrutura da sua resposta da API
        })
        .catch((error) => {
          console.error("Erro ao buscar informações do usuário", error);
        });
    }
  }, [idUser, token]);

  const handleLogout = () => {
    setToken('');
    setIdUser('');
    sessionStorage.removeItem('token');
    navigate('/');
  };

  return (
    <>
      <header className="py-1 px-2">
        <nav>
          <div className="logo">
            <Link to="/"><img src={Logo} alt="Logo" /></Link>
          </div>
          <ul className="menu">
            <li><Link to="/about" className="p-1">Sobre</Link></li>
            <li><Link to="/products" className="p-1">Produtos</Link></li>
            <li><Link to="/allposts" className="p-1">Blog</Link></li>
            <li><Link to="/contact" className="p-1">Contato</Link></li>
          </ul>
        </nav>
        <div className="flex-start-row">
        {

!token
? (
  <>
    <div className="cta-desktop ml-3">
      <Link to="/login" className="btn">Acessar</Link>
    </div>
    <div className="cta-mobile mr-1">
      <Link to="/login" className="link h7">Acessar</Link>
    </div>
  </>
          )
          : (
            <>
              <div className="cta-desktop ml-3">
                <Link to="/profile" className="link">{nameUser}</Link>
                <span> &nbsp; | &nbsp;</span>
                <a href="#" onClick={handleLogout} className="link">Sair</a>
              </div>
              <div className="cta-mobile mr-1">
                <Link to="/profile" className="link">{nameUser}</Link>
                <span> &nbsp; | &nbsp;</span>
                <a href="#" onClick={handleLogout} className="link">Sair</a>
              </div>
            </>
          )

        }

        </div>
      </header>
      {/* Adicione aqui outros elementos, se necessário */}
    </>
  );
};

export default Header;
