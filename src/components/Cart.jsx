import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faTimes, faShoppingCart, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useCart } from '../context/CartContext'

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, isCartOpen, toggleCart, cartTotal } = useCart()

  if (!isCartOpen) return null

  return (
    <div className="cart-overlay" onClick={(e) => e.target.className === 'cart-overlay' && toggleCart()}>
      <div className="cart-panel">
        <div className="cart-header">
          <h2>Alışveriş Sepeti</h2>
          <button className="close-cart" onClick={toggleCart}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="empty-cart-message">
              <FontAwesomeIcon icon={faShoppingCart} size="2x" style={{ color: '#2B7A0B', marginBottom: '1rem' }} />
              <p>Sepetiniz boş</p>
              <button className="continue-shopping" onClick={toggleCart}>
                <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '0.5rem' }} />
                Alışverişe Devam Et
              </button>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <div className="item-header">
                    <h3>{item.name}</h3>
                    <button 
                      className="remove-item" 
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove item"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                  <p className="item-price">{item.price.toFixed(2)} TL</p>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-summary">
            <div className="summary-row total">
              <span>Toplam</span>
              <span>{cartTotal.toFixed(2)} TL</span>
            </div>
            <button className="checkout-btn">
              Ödemeye Geç
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart