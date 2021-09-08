import React, { useContext } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';

const Cart = ({ onClose }) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cardItemRemoveHandler = (id) => {};

  const cardItemAddHandler = (item) => {};
  
  const cartItems = cartCtx.items.map((item) => 
    <CartItem
      key={item.id} 
      name={item.name} 
      amount={item.amount} 
      price={item.price}
      onRemove={cardItemRemoveHandler.bind(null, item.id)}
      onAdd={cardItemAddHandler.bind(null, item)}
    />
  );
  
  return (
    <Modal onClose={onClose}>
      <ul className={classes['cart-items']}>
        {cartItems}
      </ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={onClose}>Close</button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;