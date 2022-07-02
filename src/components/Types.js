import React, { useState } from 'react';
import styled from 'styled-components';
const Types = (props) => {
    const [typeSelected, setTypeSelected] = useState('');
    const { types } = props;
    // console.log();
    return (
        <ContentTypes>
            <Type
                className="steel"
                onClick={() => {
                    setTypeSelected('https://pokeapi.co/api/v2/type/');
                }}
            >
                All
            </Type>
            {types.map((type) => {
                if ((type.name !== 'unknown') & (type.name !== 'shadow')) {
                    return (
                        <Type
                            key={type.name}
                            className={type.name}
                            onClick={() => {
                                setTypeSelected(type.url);
                            }}
                        >
                            {type.name}
                        </Type>
                    );
                }
            })}
        </ContentTypes>
    );
};

const ContentTypes = styled.div`
    width: 80vw;
    display: flex;
    // border: 1px solid purple;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
`;
const Type = styled.div`
    width: 50px;
    height: 20px;
    padding-top: 6px;
    font-size: 12px;
    font-weight: 600;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
    border-radius: 1rem;
    text-transform: capitalize;
`;

export default Types;
