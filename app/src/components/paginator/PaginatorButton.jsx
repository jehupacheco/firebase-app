import React from 'react';

const PaginatorButton = ({index, isActive, setPage}) => {
  const clickHandler = (e) => {
    e.preventDefault();
    setPage(index);
  }

  return(
    <li>
      <a className={`button ${isActive ? 'is-primary' : ''}`} onClick={clickHandler}>
        {index}
      </a>
    </li>
  )
}

export default PaginatorButton;