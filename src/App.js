import React, { useEffect, useState } from 'react'
import Modal from './components/Modal';
import Searchbar from './components/Searchbar';
import Pokedex from './components/Pokedex';
import { getPokemonData, getPokemons, searchPokemon } from './api';

const App = () => {

  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [searching, setSearching] = useState(false);
  const [stateModal, setStateModal] = useState(false);

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const data = await getPokemons(15, 15 * page);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
      })
      const results = await Promise.all(promises);
      setPokemons(results);
      setLoading(false)
      setTotal(Math.ceil(data.count / 15));
      setNotFound(false);
    } catch (error) {

    }
  }

  useEffect(() => {
    if (!searching) {
      fetchPokemons();
    }
  }, [page]);


  const onSearch = async (pokemon) => {
    if (!pokemon) {
      return fetchPokemons();
    }
    setLoading(true);
    setNotFound(false);
    setSearching(true);
    const result = await searchPokemon(pokemon);
    if (!result) {
      setNotFound(true);
      setLoading(false)
      return;
    } else {
      setPokemons([result]);
      setPage(0);
      setTotal(1);
    }
    setLoading(false);
    setSearching(false);
  }


  return (
    <div className="app-container">
      <img className="poke-logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png" />

      <Searchbar onSearch={onSearch} />
      {notFound ?
        <div> No se encontro el Pokémon</div>
        : (
          <Pokedex
            loading={loading}
            pokemons={pokemons}
            page={page}
            setPage={setPage}
            total={total}

          />
        )}

      <Modal
        stateM={stateModal}
        setStateM={setStateModal}
      >
        <h1>Ventana Modal</h1>
        <p>Parrafo</p>
      </Modal>
    </div>
  );
}

export default App;
