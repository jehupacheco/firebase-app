import React from 'react';

const Food = ({id, icon, createdAt, lat, long, name, region}) => {
  return (
    <div className="column is-half">
      <div className="box">
        <article className="media">
          <div className="media-left">
            <figure className="image is-96x96">
              <img src={icon} alt={name}/>
            </figure>
          </div>
          <div className="media-content">
            <div className="content">
              <p>
                <strong>{name}</strong>
              </p>
              <p>
                <strong>{region}</strong>
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

Food.propTypes = {
  id: React.PropTypes.node,
  icon: React.PropTypes.string,
  createdAt: React.PropTypes.number,
  lat:React.PropTypes.number,
  long: React.PropTypes.number,
  name: React.PropTypes.string,
  region: React.PropTypes.string,
}

export default Food;