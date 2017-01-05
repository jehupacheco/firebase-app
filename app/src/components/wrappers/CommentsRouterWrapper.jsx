import React from 'react';
import CommentManager from '../comments/CommentManager';

const CommentsRouterWrapper = ({route}) => {
  const title = <p className="title"><strong>Last Comments</strong></p>

  const sortFunction = (comment) => {
    return -comment.createdAt;
  }

  return (
    <CommentManager path={route.uri}
                    paginate={route.paginate}
                    itemsPerPage={route.itemsPerPage}
                    title={title}
                    sortFunction={sortFunction}
    />
  )
}

export default CommentsRouterWrapper;