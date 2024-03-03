
import Header from '../Header';
import Footer from '../Footer';

import IconFacebook from '../../svg/icon-facebook.svg';
import IconInstagram from '../../svg/icon-instagram.svg';
import IconTwitter from '../../svg/icon-twitter.svg';

const Contact = () => {

  function onSubmit(event){
    event.preventDefault();
  }

  return (
    <>
      <Header />
      <section className="container-contact">
          <div className="row">
            <div className="grid-6">
              <h3>Entre em contato</h3>
              <p>
                Informe na mensagem com o maior detalhamento possível o serviço sobre o qual deseja falar.
              </p>
              <form onSubmit={onSubmit}>
                <input type="text" name="name" className="mt-2" placeholder="Nome" />
                <input type="email" name="email" className="mt-2"placeholder="E-mail" />
                <textarea name="content" rows="8" className="mt-2"placeholder="Mensagem"></textarea>
                <button className="btn mt-2">Enviar</button>
              </form>
            </div>
            <div className="grid-1 disappear"></div>
            <div className="grid-5">
              <h5 className="mt-4">Algumas informações</h5>

              <h6 className="color-primary mt-4">Info.</h6>
              <p>O CoffeeMaster foi pensado para oferecer os melhores serviços para o seu negócio.</p>

              <h6 className="color-primary mt-4">Endereço</h6>
              <p>Belo Horizonte, MG.</p>

              <h6 className="color-primary mt-4">E-mail</h6>
              <p>email@email.com.br</p>

              <h6 className="color-primary mt-4">Redes sociais</h6>
              <div className="mt-2">
                <img src={IconFacebook} className="icon-s" alt="" />
                <img src={IconInstagram} className="icon-s ml-2" alt="" />
                <img src={IconTwitter} className="icon-s ml-2" alt="" />
              </div>
            </div>
          </div>
      </section>
      <Footer />
    </>
  );
}
  
export default Contact;
  