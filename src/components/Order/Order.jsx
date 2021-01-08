import React from 'react';

import classes from './Order.module.css';

const order = props => {
  const ingredients = Object.entries(props.ingredients).map(([name, amount]) => (
    <span
      style={{
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        border: '1px solid #ccc',
        padding: '5px'
      }}
      key={name}>{name} ({amount}) </span>
  ));

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredients}</p>
      <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
    </div>
  )
}

export default order;
