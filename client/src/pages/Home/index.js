// Header e Footer
import Header from '../Header'
import Footer from '../Footer'

// Components
import Hero from './Hero';
import Card from './Card';

// API
import api from '../../services/api';

// Hooks
import { useState, useEffect } from 'react';

// Link
import { Link } from 'react-router-dom';


const Home = () => {
    
     // State variables
     const [card, setCard] = useState([]);

     // Faça isso quando o componente montar
     useEffect(() => {
 
         //Requisição para card
         api.get('/posts?_sort=-date&_limit=3')
         .then((response) => {
             setCard(response.data);
         })
 
     }, [])


    return (
        <>

            <Header />


            <Hero/>





            <div className="bg-section">
                <section className="container">
                    <div className="container-about">
                        <img src="svg/icon-blog.svg" className="about-img ml-2" alt=""></img><h3 className="ml-2">Blog</h3>    
                    </div>
                    <div className="row">

                        {
                            
                        card.map(function(item) {
                            console.log('Dados do item:', item);
                            return <Card key={item.id} content={item} />;
                        })
                        
                        }
                        
            
                    </div>

                    <div className="container flex-center">
                        <div>
                            <Link to="/allposts" className="btn">Explorar mais artigos</Link>
                        </div>
                    </div>
                </section>
            </div>


            <Footer />

        </>
    );
}

export default Home;