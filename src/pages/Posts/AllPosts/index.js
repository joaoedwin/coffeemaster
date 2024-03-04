// AllPosts.js

// React e Hooks
import React, { useState, useEffect } from 'react';

// API
import api from '../../../services/api';

// Componentes
import Header from 'pages/Header';
import Footer from 'pages/Footer';
import CardAllPosts from '../../Home/Card/CardAllPosts/index'; // Importe o componente Card que você criou

const AllPosts = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(3);

  useEffect(() => {
    // Busca os posts iniciais ao montar o componente
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    // Busca os posts com limite baseado no número de posts visíveis
    api.get(`/posts?_limit=${visiblePosts}`)
      .then(response => {
        setAllPosts(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar posts:', error);
      });
  };

  const loadMorePosts = () => {
    // Aumenta o número de posts visíveis ao clicar no botão
    setVisiblePosts(prev => prev + 3);
  };

  useEffect(() => {
    // Recarrega os posts sempre que o número de posts visíveis é atualizado
    fetchPosts();
  }, [visiblePosts]);

  return (
    <>
      <Header />

      <section className="container-svc">
        <div className="row flex-center flex-wrap">
          {allPosts.map(post => (
            <CardAllPosts key={post.id} content={post} />
          ))}
        </div>
      </section>

      {allPosts.length >= visiblePosts && (
          <div className="text-center flex-center-column mt-1 mb-6">
            <a className="btn btn-click" onClick={loadMorePosts}>
              Ver mais posts
            </a>
          </div>
        )}

      <Footer />
    </>
  );
};

export default AllPosts;