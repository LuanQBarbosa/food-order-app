import React, { useState, useContext } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart = ({ onClose }) => {
  const [isCheckout, setIsCheckout] = useState(false);
  
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cardItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cardItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = (userData) => {
    fetch('https://food-order-app-bdcc7-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items
      })
    });
  };
  
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

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={onClose}>Close</button>
      {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>
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
      {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={onClose} />}
      {!isCheckout && modalActions}
    </Modal>
  );
};

export default Cart;