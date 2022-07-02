import React, { useState } from 'react';

const Searchbar = ({ onSearch }) => {
    const [search, setSearch] = useState('');
    // const [pokemon, setPokemon] = useState();

    const onChange = (evt) => {
        setSearch(evt.target.value);
        if (evt.target.length === 0) {
            onSearch(null);
        }
    };

    const onClick = async (evt) => {
        onSearch(search);
    };

    return (
        <div className="search-container">
            <div className="searchbar">
                <input placeholder="Buscar Pokémon..." onChange={onChange} />
            </div>
            <div>
                <button className="searchbar-btn" onClick={onClick}>
                    Search!{' '}
                </button>
            </div>
        </div>
    );
};

export default Searchbar;
