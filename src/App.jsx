import React, { useState, useEffect } from 'react';
import { PokeCard } from './components/pokeCard/PokeCard';
import { Pagination } from './components/pagination/Pagination';
import { TypeFilter } from './components/typeFilter/TypeFilter';
import axios from 'axios';

export const App = () => {

  const pokemonsOnPage = [
    { id: '1n1', number: 10, value: 'Show 10 pokemons' },
    { id: '1n2', number: 20, value: 'Show 20 pokemons' },
    { id: '1n3', number: 50, value: 'Show 50 pokemons' }
  ];

  const [typesList, setTypesList] = useState({});

  const [pokemonsNames, setPokemonsNames] = useState([]);
  const [pokemonsInfo, setPokemonsInfo] = useState([]);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    pokemonsOnPage: 10,
    pageNumbers: null,
    nextRequest: null,
    prevRequest: null
  });

  const [filter, setFilter] = useState({
    filterName: '',
    filterType: []
  });

  const filterByTypes = () => {
    filter.filterType.map(filterTypeItem => {
      axios.get(typesList[filterTypeItem])
        .then(res => console.log(res.data.pokemon))
    })
  }

  useEffect(() => {
    let data = [];

    axios.get('https://pokeapi.co/api/v2/type/')
      .then(res => {
        data = res.data.results;
        const types = {};
        data.forEach(dataItem => {
          types[dataItem.name] = dataItem.url;
        });
        setTypesList(types);
      });
  }, []);

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=${pagination.pokemonsOnPage}&offset=${pagination.pokemonsOnPage * (pagination.currentPage - 1)}`;

    axios.get(url).then(res => {
      setPokemonsNames(res.data.results);
      setPagination({
        ...pagination,
        pageNumbers: Math.ceil(res.data.count / pagination.pokemonsOnPage),
        nextRequest: res.data.next,
        prevRequest: res.data.previous
      })

    });
  }, [pagination.currentPage, pagination.pokemonsOnPage]);

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
      <div className='app__pokemons-show'>
        <label>Pokemon per page:</label>
        <select className='base-input' onChange={(e => setPagination({ ...pagination, pokemonsOnPage: +e.target.value }))}>
          {
            pokemonsOnPage.map(option => (
              <option
                key={option.id}
                value={option.number}
              >
                {option.value}
              </option>
            ))
          }
        </select>
      </div>

      {
        Object.keys(typesList).length > 0 &&
        <TypeFilter
          collection={typesList}
          setFilter={setFilter}
          filter={filter}
          filterByTypes={filterByTypes}
        />
      }

      <Pagination pagInfo={pagination} setPagInfo={setPagination} />
      <div className='app__pokemons'>
        {
          pokemonsInfo.map(pokemon => (<PokeCard key={pokemon.id} pokeInfo={pokemon} />))
        }
      </div>
    </div>
  );
}
