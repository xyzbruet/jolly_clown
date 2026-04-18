import { useState } from 'react';
import { ShoppingCart, CheckCircle, Heart, Eye } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import StarRating from './StarRating';

export default function ProductCard({ product: p }) {
  const { addToCart, toggleWishlist, isWishlisted, setQuickViewProduct } = useStore();
  const [added, setAdded] = useState(false);
  const wishlisted = isWishlisted(p.id);

  const handleAdd = (e) => {
    e.stopPropagation();
    if (p.stock === 0) return;
    addToCart(p);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(p);
  };

  return (
    <div className={`product-card ${p.stock === 0 ? 'sold-out' : ''}`} onClick={() => setQuickViewProduct(p)}>
      <div className="product-img-wrap">
        <img src={p.image} alt={p.name} className="product-img" loading="lazy" />

        {/* Top-left badge */}
        <div className="product-badges">
          {p.stock === 0 && <span className="badge badge-sold">Sold Out</span>}
          {p.stock > 0 && p.stock <= 20 && <span className="badge badge-low">Only {p.stock} left</span>}
          {p.tags?.includes('bestseller') && p.stock > 0 && <span className="badge badge-best">Bestseller</span>}
          {p.tags?.includes('new') && p.stock > 0 && <span className="badge badge-new">New</span>}
        </div>

        {/* Hover action buttons */}
        <div className="card-hover-actions">
          <button
            className={`card-action-btn wish-btn ${wishlisted ? 'active' : ''}`}
            onClick={handleWishlist}
            title={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <Heart size={15} fill={wishlisted ? 'currentColor' : 'none'} />
          </button>
          <button
            className="card-action-btn"
            onClick={e => { e.stopPropagation(); setQuickViewProduct(p); }}
            title="Quick view"
          >
            <Eye size={15} />
          </button>
        </div>
      </div>

      <div className="product-body">
        <p className="product-cat">{p.category}</p>
        <p className="product-name">{p.name}</p>
        <div>
          <StarRating rating={p.rating} reviews={p.reviews} />
        </div>

        {/* Tag pills like ugaoo — Bestseller, New, Exclusive etc */}
        {(p.tags?.length > 0) && (
          <div className="product-tags">
            {p.tags.includes('bestseller') && <span className="product-tag tag-best">⭐ Bestseller</span>}
            {p.tags.includes('new')        && <span className="product-tag tag-new">✦ New Arrival</span>}
          </div>
        )}
        {p.stock > 0 && p.stock <= 10 && (
          <div className="product-tags">
            <span className="product-tag tag-sale">⚡ Only {p.stock} left</span>
          </div>
        )}

        <div className="product-footer">
          <div className="price-wrap">
            <span className="product-price">₹{p.price.toLocaleString()}</span>
          </div>
          <button
            className={`add-btn ${added ? 'added' : ''} ${p.stock === 0 ? 'disabled' : ''}`}
            onClick={handleAdd}
            disabled={p.stock === 0}
          >
            {added
              ? <><CheckCircle size={13} /> Added</>
              : <><ShoppingCart size={13} /> {p.stock === 0 ? 'Sold Out' : 'Add'}</>
            }
          </button>
        </div>
      </div>
    </div>
  );
}
