import React, { useEffect, useState } from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [FeaturedData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader]   = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      let originals     = list.filter(i => i.slug == 'originals');
      let randomChosen  = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen        = originals[0].items.results[randomChosen];
      let chosenInfo    = await Tmdb.GetMovieInfo(chosen.id, 'tv');

      setFeaturedData(chosenInfo);
    }
 
    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener  = () => {
      if(window.scrollY > 10){
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);
    return() => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return (
    <div className="page">

      <Header black={blackHeader}/>

      {FeaturedData && 
        <FeaturedMovie item={FeaturedData}/>
      }
      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>

      <footer>
          Feito com amor por João Vitor Ramos Tonolli<br/>
          Direitos de imagem para NETFLIX<br/>
          Dados pegos do site themoviedb.com<br/>
      </footer>

      {movieList.length <= 0 &&
        <div className="loading">
            <img src="https://media3.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif" alt="Carregando" />
        </div>
      }
    </div>
  );
}