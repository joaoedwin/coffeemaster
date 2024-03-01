import Logo from '../../svg/logo-favicon.svg';



const Header = () => {
    return (
        <>
            <header className="py-1 px-2">
                <nav>
                    <div className="logo">
                        <a href=""><img src={Logo} alt="" /></a>
                    </div>
                    <ul className="menu">
                        <li><a href="" className="p-1">Sobre</a></li>
                        <li><a href="" className="p-1">Produtos</a></li>
                        <li><a href="" className="p-1">Serviços</a></li>
                        <li><a href="" className="p-1">Blog</a></li>
                        <li><a href="" className="p-1">Contato</a></li>
                    </ul>
                </nav>
                <div className="bx"></div>
                <div className="flex-start-row">
                    <div className="cta-desktop ml-3">
                        <a href="" className="btn">Acessar</a>
                    </div>
                    <div className="cta-mobile mr-1">
                        <a href="" className="link">Acessar</a>
                    </div>
                </div>
            </header>



            <div className="relative">
                <div className="menu-mobile">
                    <ul className="nav-mobile">
                        <li><a href="#" className="link-menu-mobile">Sobre</a></li>
                        <li><a href="#" className="link-menu-mobile">Produtos</a></li>
                        <li><a href="#" className="link-menu-mobile">Serviços</a></li>
                        <li><a href="#" className="link-menu-mobile">Blog</a></li>
                        <li><a href="#" className="link-menu-mobile">Contato</a></li>
                    </ul>
                </div>
            </div>

        </>
    );
}

export default Header