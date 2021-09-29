import React from 'react';

const Pokemon = (props) => {
    const { pokemon } = props;
    const style = `thumb-container ${pokemon.types[0].type.name}`;

    return (

        <div className={style} key={pokemon.name} >
            <div className="number">
                <small>#0{pokemon.id}</small>
            </div>
            <div className="circle">

            </div>
            <img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} />
            <div className="detil-wrapper">
                <h3>{pokemon.name}</h3>
                <small>Type: {pokemon.types[0].type.name}</small>
            </div>
        </div>
    );
}

export default Pokemon;