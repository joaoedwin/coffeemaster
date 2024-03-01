


//Components
import Hero from './Hero';
import Card from './Card';

const Home = () => {
    return (
        <>


            <Hero/>





            <div className="bg-section">
                <section className="container">
                    <div className="container-about">
                        <img src="svg/icon-blog.svg" className="about-img ml-2" alt=""></img><h3 className="ml-2">Blog</h3>    
                    </div>
                    <div className="row">
                        

                    <Card />

                    <Card />

                    <Card />

            
                    </div>

                    <div className="container flex-center">
                        <div>
                            <a href="" className="btn">Explorar mais artigos</a>
                        </div>
                    </div>
                </section>
            </div>


        </>
    );
}

export default Home;