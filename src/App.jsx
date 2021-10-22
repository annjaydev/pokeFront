import React, { useState, useEffect } from 'react';
import { PokeCard } from './components/pokeCard/PokeCard';
import axios from 'axios';

export const App = () => {

  const [pokemonsNames, setPokemonsNames] = useState([]);
  const [pokemonsInfo, setPokemonsInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(10);

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=${pokemonsPerPage}&offset=${pokemonsPerPage*(currentPage-1)}`;
    axios.get(url).then(res => {
      setPokemonsNames(res.data.results);
    }); 
  }, [currentPage]);

  useEffect(() => {
    setPokemonsInfo([]);
    const pokeInfoRequests = pokemonsNames.map(pokemonName => axios.get(pokemonName.url));

    Promise.all(pokeInfoRequests).then(res => {
      res.map(resItem => setPokemonsInfo(pokemonsInfo => [...pokemonsInfo, resItem.data]));
    });
  }, [pokemonsNames]);

  return (
    <div className='app-container'>
      <h1 className='title'>Choose your fighter</h1>
      <div className='app__pokemons'>
        {
          pokemonsInfo.map(pokemon => (<PokeCard pokeInfo={pokemon}/>))
        }
      </div>
    </div>
  );
}
