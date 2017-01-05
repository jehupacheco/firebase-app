import React from 'react';
import PaginatorButton from './PaginatorButton';
import _ from 'lodash';

const Paginator = ({numberOfPages, activePage, setPage}) => {
  return (
    <nav className="pagination">
      <ul>
        {
          _.times(numberOfPages, (index) => {
            const displayIndex = index + 1;
            return <PaginatorButton index={displayIndex}
                                    isActive={displayIndex === activePage}
                                    key={displayIndex}
                                    setPage={setPage}/>
          })
        }
      </ul>
    </nav>
  )
}

export default Paginator;