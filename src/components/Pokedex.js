import React from 'react';
import Pokemon from './Pokemon';
import Pagination from './Pagination';

const Pokedex = ({ pokemons, page, setPage, total, loading }) => {

    const lastPage = () => {
        const nextPage = Math.max(page - 1, 0);
        setPage(nextPage);
    }
    const nextPage = () => {
        const nextPage = Math.min(page + 1, total - 1);
        setPage(nextPage);
    }

    return (
        <div>
            <div className="headerPokedex">
                <Pagination
                    page={page + 1}
                    totalPages={total}
                    onLeftClick={lastPage}
                    onRightClick={nextPage}
                />
            </div>
            <div className="all-container">
                {loading ?
                    <div>
                        <img src='http://i944.photobucket.com/albums/ad289/xoxoMKoxox/Gaia%20Things/Pokeball-1.gif' alt="loading pokeball" />
                        <h2>Loading...</h2>
                    </div>
                    :
                    pokemons.map((pokemon, index) => {
                        return (
                            <Pokemon pokemon={pokemon} key={index} />
                        )
                    })}
            </div>
        </div >
    )
}

export default Pokedex;