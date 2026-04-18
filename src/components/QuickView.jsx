import { useState } from 'react';
import { X, ShoppingCart, Heart, CheckCircle, Minus, Plus } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import StarRating from './StarRating';

export default function QuickView() {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isWishlisted } = useStore();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!quickViewProduct) return null;
  const p = quickViewProduct;
  const wishlisted = isWishlisted(p.id);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(p);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const close = () => { setQuickViewProduct(null); setQty(1); setAdded(false); };

  return (
    <div className="modal-overlay" onClick={close}>
      <div className="quick-view-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={close}><X size={18} /></button>

        <div className="qv-layout">
          {/* Image */}
          <div className="qv-img-wrap">
            <img src={p.image} alt={p.name} className="qv-img" />
            {p.tags?.includes('bestseller') && <div className="qv-badge bestseller">Bestseller</div>}
            {p.tags?.includes('new') && <div className="qv-badge new-badge">New</div>}
            {p.stock === 0 && <div className="qv-badge sold-out-b">Sold Out</div>}
          </div>

          {/* Info */}
          <div className="qv-info">
            <p className="qv-cat">{p.category}</p>
            <h2 className="qv-name">{p.name}</h2>

            <div style={{ marginBottom: 14 }}>
              <StarRating rating={p.rating} reviews={p.reviews} size="lg" />
            </div>

            <p className="qv-price">₹{p.price.toLocaleString()}</p>
            <p className="qv-desc">{p.description}</p>

            {p.stock > 0 && p.stock <= 20 && (
              <p className="qv-low-stock">⚡ Only {p.stock} left in stock</p>
            )}

            {p.stock > 0 && (
              <div className="qv-qty-row">
                <span className="qv-qty-label">Quantity</span>
                <div className="qty-controls">
                  <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}><Minus size={12} /></button>
                  <span className="qty-val">{qty}</span>
                  <button className="qty-btn" onClick={() => setQty(q => Math.min(p.stock, q + 1))}><Plus size={12} /></button>
                </div>
              </div>
            )}

            <div className="qv-actions">
              <button
                className={`qv-add-btn ${added ? 'added' : ''} ${p.stock === 0 ? 'disabled' : ''}`}
                onClick={handleAdd}
                disabled={p.stock === 0}
              >
                {added ? <><CheckCircle size={16} /> Added!</> : <><ShoppingCart size={16} /> {p.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</>}
              </button>
              <button
                className={`qv-wish-btn ${wishlisted ? 'wishlisted' : ''}`}
                onClick={() => toggleWishlist(p)}
                title={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            <div className="qv-meta">
              <div className="qv-meta-row"><span>SKU</span><span>SA-{String(p.id).padStart(4, '0')}</span></div>
              <div className="qv-meta-row"><span>Availability</span><span className={p.stock > 0 ? 'in-stock' : 'oos'}>{p.stock > 0 ? `In Stock (${p.stock})` : 'Out of Stock'}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
