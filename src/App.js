import React, { useEffect, useState } from 'react';
import { getPokemonData, getPokemons, getTypes, searchPokemon } from './api';
import Pokedex from './components/Pokedex';
import Searchbar from './components/Searchbar';
import Types from './components/Types';

const App = () => {
    const [pokemons, setPokemons] = useState([]);
    const [typesP, setTypeP] = useState([]);
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [searching, setSearching] = useState(false);

    const fetchTypes = async () => {
        try {
            const url = `https://pokeapi.co/api/v2/type/`;
            const data = await getTypes(url);
            const promises = data.results.map(async (typeP) => {
                return await typeP;
            });
            const results = await Promise.all(promises);
            setTypeP(results);
            // console.log(results);
        } catch (error) {}
    };

    useEffect(() => {
        fetchTypes();
    }, []);

    const fetchPokemons = async () => {
        try {
            setLoading(true);
            const data = await getPokemons(18, 18 * page);
            const promises = data.results.map(async (pokemon) => {
                return await getPokemonData(pokemon.url);
            });
            const results = await Promise.all(promises);
            setPokemons(results);
            setLoading(false);
            setTotal(Math.ceil(data.count / 18));
            setNotFound(false);
        } catch (error) {}
    };

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
            setLoading(false);
            return;
        } else {
            setPokemons([result]);
            setPage(0);
            setTotal(1);
        }
        setLoading(false);
        setSearching(false);
    };

    return (
        <div
            className="app-container"
            // onClick={() => {
            //     setStateModal(!stateModal);
            // }}
        >
            <img
                className="poke-logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png"
            />

            <Searchbar onSearch={onSearch} />

            <Types types={typesP} />

            {notFound ? (
                <div> No se encontro el Pokémon</div>
            ) : (
                <Pokedex loading={loading} pokemons={pokemons} page={page} setPage={setPage} total={total} />
            )}
        </div>
    );
};

export default App;
