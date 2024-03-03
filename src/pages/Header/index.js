import { Link } from 'react-router-dom';
import Logo from '../../svg/logo-favicon.svg';



const Header = () => {
    return (
        <>
            <header className="py-1 px-2">
                <nav>
                    <div className="logo">
                        <Link to="/"><img src={Logo} alt="" /></Link>
                    </div>
                    <ul className="menu">
                        <li><Link to="/about" className="p-1">Sobre</Link></li>
                        <li><Link to="/products" className="p-1">Produtos</Link></li>
                        <li><Link to="/posts" className="p-1">Blog</Link></li>
                        <li><Link to="/contact" className="p-1">Contato</Link></li>
                    </ul>
                </nav>
                <div className="bx"></div>
                <div className="flex-start-row">
                    <div className="cta-desktop ml-3">
                        <Link to="/login" className="btn">Acessar</Link>
                    </div>
                    <div className="cta-mobile mr-1">
                        <Link to="/login" className="link">Acessar</Link>
                    </div>
                </div>
            </header>



            <div className="relative">
                <div className="menu-mobile">
                    <ul className="nav-mobile">
                        <li><Link to="/about" className="link-menu-mobile">Sobre</Link></li>
                        <li><Link to="/products" className="link-menu-mobile">Produtos</Link></li>
                        <li><Link to="/posts" className="link-menu-mobile">Blog</Link></li>
                        <li><Link to="/contact" className="link-menu-mobile">Contato</Link></li>
                    </ul>
                </div>
            </div>

        </>
    );
}

export default Header