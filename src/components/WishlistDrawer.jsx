import { Heart, X, ShoppingCart } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import StarRating from './StarRating';

export default function WishlistDrawer() {
  const { wishlistOpen, setWishlistOpen, wishlist, toggleWishlist, moveToCart } = useStore();

  if (!wishlistOpen) return null;

  return (
    <div className="drawer-overlay" onClick={() => setWishlistOpen(false)}>
      <div className="drawer" onClick={e => e.stopPropagation()}>
        <div className="drawer-header">
          <div>
            <h2 className="drawer-title">Wishlist</h2>
            {wishlist.length > 0 && <p className="drawer-sub">{wishlist.length} saved item{wishlist.length !== 1 ? 's' : ''}</p>}
          </div>
          <button className="drawer-close" onClick={() => setWishlistOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <div className="drawer-body">
          {wishlist.length === 0 ? (
            <div className="drawer-empty">
              <div className="empty-icon-wrap">
                <Heart size={32} />
              </div>
              <p className="empty-title">Nothing saved yet</p>
              <p className="empty-sub">Heart a product to save it here</p>
              <button className="empty-action" onClick={() => setWishlistOpen(false)}>
                Browse Products
              </button>
            </div>
          ) : (
            wishlist.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-cat">{item.category}</p>
                  <StarRating rating={item.rating} reviews={item.reviews} />
                  <p className="cart-item-price" style={{ marginTop: 6 }}>₹{item.price.toLocaleString()}</p>
                  <button
                    className="move-to-cart-btn"
                    onClick={() => moveToCart(item)}
                    disabled={item.stock === 0}
                  >
                    <ShoppingCart size={12} />
                    {item.stock === 0 ? 'Out of Stock' : 'Move to Cart'}
                  </button>
                </div>
                <button className="cart-remove" onClick={() => toggleWishlist(item)}>
                  <X size={14} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
