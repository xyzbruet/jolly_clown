import { ShoppingCart, X, Minus, Plus, Trash2, Tag, ChevronRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function CartDrawer() {
  const {
    cartOpen, setCartOpen, setCheckoutOpen,
    cart, removeFromCart, updateQty, clearCart,
    cartCount, cartSubtotal, cartTotal, shipping, discount,
    promoCode, setPromoCode, appliedPromo, applyPromo, removePromo, promoError,
  } = useStore();

  if (!cartOpen) return null;

  const handleCheckout = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  return (
    <div className="drawer-overlay" onClick={() => setCartOpen(false)}>
      <div className="drawer" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="drawer-header">
          <div>
            <h2 className="drawer-title">Your Cart</h2>
            {cartCount > 0 && <p className="drawer-sub">{cartCount} item{cartCount !== 1 ? 's' : ''}</p>}
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {cart.length > 0 && (
              <button className="clear-btn" onClick={clearCart}>Clear all</button>
            )}
            <button className="drawer-close" onClick={() => setCartOpen(false)}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Items */}
        <div className="drawer-body">
          {cart.length === 0 ? (
            <div className="drawer-empty">
              <div className="empty-icon-wrap">
                <ShoppingCart size={32} />
              </div>
              <p className="empty-title">Your cart is empty</p>
              <p className="empty-sub">Add some products to get started</p>
              <button className="empty-action" onClick={() => setCartOpen(false)}>
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-cat">{item.category}</p>
                  <p className="cart-item-price">₹{(item.price * item.qty).toLocaleString()}</p>
                  <div className="qty-controls">
                    <button className="qty-btn" onClick={() => updateQty(item.id, item.qty - 1)}>
                      <Minus size={12} />
                    </button>
                    <span className="qty-val">{item.qty}</span>
                    <button className="qty-btn" onClick={() => updateQty(item.id, item.qty + 1)}>
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
                <button className="cart-remove" onClick={() => removeFromCart(item.id)}>
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="drawer-footer">
            {/* Promo */}
            <div className="promo-section">
              {appliedPromo ? (
                <div className="promo-applied">
                  <Tag size={13} />
                  <span><strong>{appliedPromo.code}</strong> — {appliedPromo.label}</span>
                  <button className="promo-remove" onClick={removePromo}><X size={12} /></button>
                </div>
              ) : (
                <div className="promo-row">
                  <input
                    className="promo-input"
                    value={promoCode}
                    onChange={e => setPromoCode(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && applyPromo()}
                    placeholder="Promo code (try SAVE10)"
                  />
                  <button className="promo-btn" onClick={applyPromo}>Apply</button>
                </div>
              )}
              {promoError && <p className="promo-err">{promoError}</p>}
            </div>

            {/* Breakdown */}
            <div className="price-breakdown">
              <div className="price-row">
                <span>Subtotal</span>
                <span>₹{cartSubtotal.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="price-row discount">
                  <span>Discount</span>
                  <span>−₹{discount.toLocaleString()}</span>
                </div>
              )}
              <div className="price-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="free-tag">FREE</span> : `₹${shipping}`}</span>
              </div>
              {shipping > 0 && (
                <p className="free-shipping-hint">Add ₹{(999 - cartSubtotal).toLocaleString()} more for free shipping</p>
              )}
              <div className="price-row total">
                <span>Total</span>
                <span>₹{cartTotal.toLocaleString()}</span>
              </div>
            </div>

            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
