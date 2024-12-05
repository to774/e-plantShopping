import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const totalItems = useSelector((state) => state.cart.totalItems);
  const dispatch = useDispatch();

  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let totalAmount = 0;
    cart.forEach((item) => {
      const costNum = parseFloat(item.cost.slice(1)); // Parse cost as a number
      totalAmount += costNum * item.quantity; // Multiply cost by quantity
    });
    return totalAmount.toFixed(2); // Format to 2 decimal places
  };

  const totalAmount = calculateTotalAmount();

  const handleContinueShopping = () => {
    onContinueShopping();
  };

  const handleIncrement = (item) => {
    // Increment quantity and update it in the Redux state
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      // Decrement quantity and update it in the Redux state
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // Remove item from cart if quantity is 1
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    // Remove item from the cart
    dispatch(removeItem(item.name));
  };

  // Calculate total cost for a specific item based on its quantity
  const calculateTotalCost = (item) => {
    const costNum = parseFloat(item.cost.slice(1)); // Parse cost as a number
    return (costNum * item.quantity).toFixed(2); // Multiply cost by quantity
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${totalAmount}</h2>
      <h2 style={{ color: 'black' }}>Total Items: {totalItems}</h2>
      <div>
        {cart.length === 0 ? (
          <div className="empty-cart">Your cart is empty.</div>
        ) : (
          cart.map((item) => (
            <div className="cart-item" key={item.name}>
              <img className="cart-item-image" src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">{item.cost}</div>
                <div className="cart-item-quantity">
                  <button
                    className="cart-item-button cart-item-button-dec"
                    onClick={() => handleDecrement(item)}
                    aria-label={`Decrement quantity of ${item.name}`}
                  >
                    -
                  </button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button
                    className="cart-item-button cart-item-button-inc"
                    onClick={() => handleIncrement(item)}
                    aria-label={`Increment quantity of ${item.name}`}
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                <button
                  className="cart-item-delete"
                  onClick={() => handleRemove(item)} // Dispatch the removeItem action
                  aria-label={`Remove ${item.name} from cart`}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
