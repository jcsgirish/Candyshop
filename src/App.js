
import { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(parseFloat(event.target.value));
  };

  // const handleAddItem = () => {
  //   const newItem = { name, quantity, price };
  //   setItems([...items, newItem]);
  //   setName('');
  //   setQuantity('');
  //   setPrice('');
  // };


  const handleAddItem = () => {
    const newItem = { name, quantity, price };
  
    fetch('https://crudcrud.com/api/8a9310479ecb49b8aa1f053ec189d17a/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    })
      .then(response => response.json())
      .then(data => {
        setItems([...items, data]);
        setName('');
        setQuantity('');
        setPrice('');
      })
      .catch(error => console.error(error));
  };

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
  };



  const handleCartClick = () => {
    setShowCart(true);
  };

  const handleCloseCart = () => {
    setShowCart(false);
  };

  return (<div><h1 className='navbar'>Candy Shop</h1>
    <div className="app-container">
      <div className="form-container">
        <div>
          <label>Candy Name:</label>
          <input type="text" value={name} onChange={handleNameChange} />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" value={quantity} onChange={handleQuantityChange} />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" step="0.01" value={price} onChange={handlePriceChange} />
        </div>
        <button onClick={handleAddItem}>Add Item</button>
      </div>
      <ul className="items-list">
        {items.map((item, index) => (
          <li key={index}>
            {item.name} {item.quantity}₹{item.price}
            <button onClick={() => handleAddToCart(item)}>
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
      <div className="cart-container">
        <button onClick={handleCartClick}> Cart ({cartItems.length})</button>
        {showCart && <Cart items={cartItems} onClose={handleCloseCart} />}
      </div>
    </div>
    </div>
  );
}

function Cart({ items, onClose }) {
  return (
    <div className="cart-modal">
      <div className="cart-header">
        <h2>Cart</h2>
        <button onClick={onClose}>Close</button>
      </div>
      <ul className="cart-items-list">
        {items.map((item, index) => (
          <li key={index}>
            {item.name} {item.quantity}₹{item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

