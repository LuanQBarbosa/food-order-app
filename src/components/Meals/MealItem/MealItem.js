import React, { useContext } from 'react';
import CartContext from '../../../store/cart-context';

import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';

const MealItem = ({ id, name, description, price }) => {
  const cartCtx = useContext(CartContext);
  
  const formattedPrice = `$${price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    cartCtx.addItem({ id, name, amount, price });
  };
  
  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>{formattedPrice}</div>
      </div>
      <div>
        <MealItemForm id={id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;