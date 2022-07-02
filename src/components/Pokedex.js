import React, { useState } from 'react';
import Modal from './Modal';
import Pagination from './Pagination';
import Pokemon from './Pokemon';

const Pokedex = ({ pokemons, page, setPage, total, loading }) => {
    const [stateModal, setStateModal] = useState(false);
    const [pokeSelected, setPokeSelected] = useState();
    console.log(pokeSelected);
    const lastPage = () => {
        const nextPage = Math.max(page - 1, 0);
        setPage(nextPage);
    };

    const nextPage = () => {
        const nextPage = Math.min(page + 1, total - 1);
        setPage(nextPage);
    };

    return (
        <div>
            <div className="headerPokedex">
                <Pagination page={page + 1} totalPages={total} onLeftClick={lastPage} onRightClick={nextPage} />
            </div>
            <div className="all-container">
                {loading ? (
                    <div>
                        <img
                            src="http://i944.photobucket.com/albums/ad289/xoxoMKoxox/Gaia%20Things/Pokeball-1.gif"
                            alt="loading pokeball"
                        />
                        <h2>Loading...</h2>
                    </div>
                ) : (
                    pokemons.map((pokemon, index) => {
                        return (
                            <Pokemon
                                pokemon={pokemon}
                                key={index}
                                stateM={stateModal}
                                setStateM={setStateModal}
                                setPokeSelected={setPokeSelected}
                            />
                        );
                    })
                )}
            </div>
            <Modal stateM={stateModal} setStateM={setStateModal}>
                <h1>
                    {
                        pokeSelected?.name

                        // setPoke(poke);
                        // console.log(poke);
                    }
                </h1>
                <p>Parrafo</p>
            </Modal>
        </div>
    );
};

export default Pokedex;
