import React from 'react';
import arrow from '../assets/img/arrow.png'

const Pagination = (props) => {

    const { onLeftClick, onRightClick, page, totalPages } = props;

    return (
        <div className="pagi">
            <button onClick={onLeftClick}>
                <img src={arrow} className='prev' alt='prev'/>
            </button>
            <div>
                <h2>{page} de {totalPages}</h2>
            </div>
            <button onClick={onRightClick}>
                <img src={arrow} className='next' alt='next'/>
            </button>

        </div>
    );
}

export default Pagination;