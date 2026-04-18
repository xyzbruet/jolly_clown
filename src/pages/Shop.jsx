import { Search, X, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useStore, categories } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import HeroSlideshow from '../components/HeroSlideshow';
import { useState, useEffect, useRef } from 'react';

const SORT_OPTIONS = [
  { value: 'default', label: 'Featured' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
];

export default function Shop() {
  const {
    filteredProducts, activeCat, setActiveCat,
    search, setSearch,
    sortBy, setSortBy,
    priceRange, setPriceRange,
    inStockOnly, setInStockOnly,
  } = useStore();

  const [filterOpen, setFilterOpen] = useState(false);
  const [filterStuck, setFilterStuck] = useState(false);
  const filterBarRef = useRef(null);
  const hasFilters = activeCat !== 'All' || search || inStockOnly || priceRange[0] > 0 || priceRange[1] < 2000;

  useEffect(() => {
    const el = filterBarRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFilterStuck(!entry.isIntersecting),
      { threshold: 1, rootMargin: '-1px 0px 0px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const clearAll = () => {
    setActiveCat('All');
    setSearch('');
    setInStockOnly(false);
    setPriceRange([0, 2000]);
  };

  return (
    <section className="shop-section">
      {/* Hero with big logo */}
      <div className="shop-hero">
        <img src="/logo.png" alt="Jolly Clown Collection" className="hero-logo-big" />
        <p className="hero-sub">Official Merchandise of the Clown Motel · Free shipping on orders over ₹999</p>
        {hasFilters && (
          <button className="hero-clear-btn" onClick={clearAll}>
            <X size={13} /> Clear all filters
          </button>
        )}
      </div>

      {/* Slideshow */}
      <HeroSlideshow />

      {/* Filter + Sort Bar */}
      <div ref={filterBarRef} className={`filter-bar${filterStuck ? ' stuck' : ''}`}>
        <div className="cat-pills">
          {categories.map(c => (
            <button key={c} onClick={() => setActiveCat(c)} className={`cat-pill ${activeCat === c ? 'active' : ''}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="bar-right">
          <button className={`filter-toggle-btn ${filterOpen ? 'open' : ''}`} onClick={() => setFilterOpen(f => !f)}>
            <SlidersHorizontal size={14} />
            Filters
            {hasFilters && <span className="filter-dot" />}
          </button>
          <div className="sort-wrap">
            <ChevronDown size={13} className="sort-icon" />
            <select className="sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div className="mobile-search">
            <Search size={14} className="mobile-search-icon" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="mobile-search-input" />
            {search && <button className="search-clear" onClick={() => setSearch('')}><X size={12} /></button>}
          </div>
        </div>
      </div>

      {filterOpen && (
        <div className="filter-panel">
          <div className="filter-group">
            <p className="filter-group-label">Price Range</p>
            <div className="price-range-row">
              <span className="price-tag">₹{priceRange[0]}</span>
              <input type="range" min={0} max={2000} step={50} value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], +e.target.value])} className="price-slider" />
              <span className="price-tag">₹{priceRange[1]}</span>
            </div>
          </div>
          <div className="filter-group">
            <label className="filter-check-label">
              <input type="checkbox" checked={inStockOnly} onChange={e => setInStockOnly(e.target.checked)} className="filter-check" />
              In Stock Only
            </label>
          </div>
          <button className="filter-reset-btn" onClick={clearAll}>Reset Filters</button>
        </div>
      )}

      <div className="result-bar">
        <p className="result-count">{filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}{hasFilters ? ' found' : ''}</p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-emoji">🔍</div>
          <p className="empty-title">No products found</p>
          <p className="empty-sub">Try adjusting your filters or search term</p>
          <button className="reset-btn" onClick={clearAll}>Clear Filters</button>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((p, i) => (
            <div key={p.id} style={{ animationDelay: `${i * 40}ms` }} className="card-anim">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
