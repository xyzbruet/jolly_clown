import { ShoppingCart, Heart, Search, X, User, Package, ChevronDown, Menu } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';

export default function Navbar() {
  const {
    cartCount, setCartOpen,
    wishlist, setWishlistOpen,
    search, setSearch,
    currentPage, setCurrentPage,
    userProfile, orders,
  } = useStore();

  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const profileRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handler = (e) => { if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY.current && currentY > 80) {
        setNavHidden(true);
      } else {
        setNavHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navigate = (page) => {
    setCurrentPage(page);
    setProfileOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const avatarColors = ['#e8182c', '#f7c600', '#1a3fa0', '#1b8a3f', '#a855f7', '#ec4899'];
  const avatarBg = avatarColors[userProfile.colorIdx || 0];
  const avatarLetter = userProfile.name ? userProfile.name[0].toUpperCase() : 'U';
  const pendingOrders = orders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled').length;

  const navLinks = [
    { id: 'shop', label: 'Shop All' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
    { id: 'help', label: 'Help' },
  ];

  return (
    <header className={`store-nav${navHidden ? ' nav-hidden' : ''}`}>
      <div className="nav-inner">
        {/* Logo */}
        <button className="nav-logo" onClick={() => navigate('shop')}>
          <img src="/logo.png" alt="Jolly Clown Collection" className="nav-logo-img" />
        </button>

        {/* Desktop Nav */}
        <nav className="nav-links-desktop">
          {navLinks.map(l => (
            <button
              key={l.id}
              className={`nav-link-btn ${currentPage === l.id ? 'active' : ''}`}
              onClick={() => navigate(l.id)}
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* Search */}
        <div className="nav-search">
          <Search size={14} className="search-pos-icon" />
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); if (currentPage !== 'shop') navigate('shop'); }}
            placeholder="Search clown merch..."
            className="search-input"
          />
          {search && <button className="search-clear" onClick={() => setSearch('')}><X size={12} /></button>}
        </div>

        {/* Right actions */}
        <div className="nav-right">
          <button className="nav-icon-btn" onClick={() => setWishlistOpen(true)} title="Wishlist">
            <Heart size={18} />
            {wishlist.length > 0 && <span className="wishlist-badge">{wishlist.length}</span>}
          </button>

          <button className="cart-btn" onClick={() => setCartOpen(true)}>
            <ShoppingCart size={18} />
            <span className="cart-btn-label">Cart</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          <div className="profile-dropdown-wrap" ref={profileRef}>
            <button className="profile-nav-avatar-btn" onClick={() => setProfileOpen(o => !o)} style={{ background: avatarBg }}>
              {avatarLetter}
              <ChevronDown size={11} className={`profile-chevron ${profileOpen ? 'open' : ''}`} />
            </button>
            {profileOpen && (
              <div className="profile-dropdown">
                <div className="profile-dropdown-header">
                  <div className="profile-dropdown-avatar" style={{ background: avatarBg }}>{avatarLetter}</div>
                  <div>
                    <p className="profile-dropdown-name">{userProfile.name || 'Guest User'}</p>
                    <p className="profile-dropdown-email">{userProfile.email || 'Not signed in'}</p>
                  </div>
                </div>
                <div className="profile-dropdown-divider" />
                <button className="profile-dropdown-item" onClick={() => navigate('profile')}><User size={13} /> My Profile</button>
                <button className="profile-dropdown-item" onClick={() => navigate('orders')}>
                  <Package size={13} /> My Orders
                  {pendingOrders > 0 && <span className="profile-dropdown-badge">{pendingOrders}</span>}
                </button>
                <div className="profile-dropdown-divider" />
                <button className="profile-dropdown-item muted" onClick={() => navigate('help')}>Help & Support</button>
                <button className="profile-dropdown-item muted" onClick={() => navigate('contact')}>Contact Us</button>
              </div>
            )}
          </div>

          <button className="nav-mobile-menu-btn" onClick={() => setMobileMenuOpen(o => !o)}>
            <Menu size={18} />
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="nav-mobile-menu">
          {navLinks.map(l => (
            <button key={l.id} className={`nav-mobile-link ${currentPage === l.id ? 'active' : ''}`} onClick={() => navigate(l.id)}>
              {l.label}
            </button>
          ))}
          <div className="nav-mobile-divider" />
          <button className="nav-mobile-link" onClick={() => navigate('profile')}><User size={13} /> Profile</button>
          <button className="nav-mobile-link" onClick={() => navigate('orders')}><Package size={13} /> Orders</button>
        </div>
      )}
    </header>
  );
}
