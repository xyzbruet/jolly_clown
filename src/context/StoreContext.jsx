import { createContext, useContext, useState, useCallback, useEffect } from 'react';

export const categories = ['All', 'T-Shirts', 'Keychains', 'Accessories', 'Hoodies', 'Caps'];

export const PROMO_CODES = {
  CLOWN10: { type: 'percent', value: 10, label: '10% off' },
  MOTEL50: { type: 'flat', value: 50, label: '₹50 off' },
  FREESHIP: { type: 'shipping', value: 0, label: 'Free shipping' },
  JOLLY20: { type: 'percent', value: 20, label: '20% off' },
};

export const initialProducts = [
  { id: 1,  name: 'Clown Motel Classic Tee',       category: 'T-Shirts',    price: 699,  stock: 48,  rating: 4.5, reviews: 128, image: 'https://picsum.photos/seed/jcc-tee1/400/400',  description: 'The iconic Clown Motel tee — bold logo on premium cotton. A must-have for every collector and fan of the world-famous motel.', tags: ['bestseller'] },
  { id: 2,  name: 'World Famous Vintage Tee',       category: 'T-Shirts',    price: 849,  stock: 22,  rating: 4.2, reviews: 74,  image: 'https://picsum.photos/seed/jcc-tee2/400/400',  description: 'Pre-washed vintage feel with the legendary Clown Motel crest. Soft, relaxed, and unmistakably iconic.', tags: ['new'] },
  { id: 3,  name: 'Jolly Clown Metal Keychain',     category: 'Keychains',   price: 199,  stock: 134, rating: 4.8, reviews: 211, image: 'https://picsum.photos/seed/jcc-key1/400/400',  description: 'Solid metal keychain with the Jolly Clown Collection emblem. Durable, weighty, and a perfect souvenir.', tags: [] },
  { id: 4,  name: 'Clown Motel Sign Keychain',      category: 'Keychains',   price: 249,  stock: 67,  rating: 4.3, reviews: 55,  image: 'https://picsum.photos/seed/jcc-key2/400/400',  description: 'Miniature replica of the famous Clown Motel sign. Enamel-filled and bright — carry a piece of history everywhere.', tags: ['new'] },
  { id: 5,  name: 'Clown Enamel Pin Set',           category: 'Accessories', price: 399,  stock: 55,  rating: 4.6, reviews: 93,  image: 'https://picsum.photos/seed/jcc-acc1/400/400',  description: 'Set of 3 vibrant enamel clown pins. Collect them all — each features a different iconic Clown Motel character.', tags: ['bestseller'] },
  { id: 6,  name: 'Jolly Clown Woven Bracelet',     category: 'Accessories', price: 299,  stock: 0,   rating: 4.1, reviews: 38,  image: 'https://picsum.photos/seed/jcc-acc2/400/400',  description: 'Handwoven bracelet in signature red, yellow and blue Jolly Clown colors. Adjustable fit, perfect as a gift.', tags: [] },
  { id: 7,  name: 'Clown Motel Oversized Hoodie',   category: 'Hoodies',     price: 1299, stock: 18,  rating: 4.9, reviews: 302, image: 'https://picsum.photos/seed/jcc-hood1/400/400', description: 'Drop-shoulder oversized hoodie with the Clown Motel graphic on the back. Ultra-soft fleece. The hoodie you\'ll never take off.', tags: ['bestseller'] },
  { id: 8,  name: 'Jolly Clown Snapback Cap',       category: 'Caps',        price: 549,  stock: 33,  rating: 4.4, reviews: 67,  image: 'https://picsum.photos/seed/jcc-cap1/400/400',  description: 'Structured snapback with embroidered Jolly Clown Collection logo. Flat brim, one size fits all.', tags: [] },
  { id: 9,  name: 'Neon Clown Graphic Tee',         category: 'T-Shirts',    price: 749,  stock: 12,  rating: 4.3, reviews: 41,  image: 'https://picsum.photos/seed/jcc-tee3/400/400',  description: 'Neon clown face graphic print on 100% combed cotton. Oversized cut, conversation-starting design.', tags: ['new'] },
  { id: 10, name: 'Clown Motel Zip-Up Hoodie',      category: 'Hoodies',     price: 1499, stock: 9,   rating: 4.7, reviews: 88,  image: 'https://picsum.photos/seed/jcc-hood2/400/400', description: 'Full-zip French terry hoodie with Clown Motel chest logo and ribbed cuffs. Limited edition collector\'s piece.', tags: ['new'] },
  { id: 11, name: 'Clown Collection Bucket Hat',    category: 'Caps',        price: 449,  stock: 27,  rating: 4.2, reviews: 53,  image: 'https://picsum.photos/seed/jcc-cap2/400/400',  description: 'Reversible bucket hat in Jolly Clown Collection colors. Two looks, one hat. A quirky festival essential.', tags: [] },
  { id: 12, name: 'Lucky Clown Charm Keychain',     category: 'Keychains',   price: 179,  stock: 88,  rating: 4.5, reviews: 120, image: 'https://picsum.photos/seed/jcc-key3/400/400',  description: 'Resin charm keychain shaped like a classic clown nose. Lightweight, durable, and undeniably fun.', tags: ['bestseller'] },
];

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [activeCat, setActiveCat] = useState('All');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');
  const [currentPage, setCurrentPage] = useState('shop');
  const [userProfile, setUserProfile] = useState({ name: '', email: '', phone: '', city: '', address: '', state: '', pin: '', colorIdx: 0 });
  const [orders, setOrders] = useState([
    { id: 'JCC-20241', date: 'Jan 14, 2025', status: 'delivered', total: 1948, address: 'Bandra West, Mumbai 400050', items: [{ name: 'Clown Motel Oversized Hoodie', price: 1299, qty: 1, image: 'https://picsum.photos/seed/jcc-hood1/80/80' }, { name: 'Clown Motel Classic Tee', price: 649, qty: 1, image: 'https://picsum.photos/seed/jcc-tee1/80/80' }] },
    { id: 'JCC-20198', date: 'Dec 28, 2024', status: 'delivered', total: 699,  address: 'Andheri East, Mumbai 400069', items: [{ name: 'Clown Motel Classic Tee', price: 699, qty: 1, image: 'https://picsum.photos/seed/jcc-tee1/80/80' }] },
    { id: 'JCC-20312', date: 'Feb 2, 2025',  status: 'shipped',   total: 1548, address: 'Bandra West, Mumbai 400050', items: [{ name: 'Clown Motel Zip-Up Hoodie', price: 1499, qty: 1, image: 'https://picsum.photos/seed/jcc-hood2/80/80' }, { name: 'Lucky Clown Charm Keychain', price: 179, qty: 1, image: 'https://picsum.photos/seed/jcc-key3/80/80' }] },
    { id: 'JCC-20389', date: 'Feb 10, 2025', status: 'processing', total: 848, address: 'Bandra West, Mumbai 400050', items: [{ name: 'Jolly Clown Snapback Cap', price: 549, qty: 1, image: 'https://picsum.photos/seed/jcc-cap1/80/80' }, { name: 'Jolly Clown Metal Keychain', price: 199, qty: 1, image: 'https://picsum.photos/seed/jcc-key1/80/80' }] },
  ]);

  useEffect(() => {
    const handler = (e) => setCurrentPage(e.detail);
    window.addEventListener('navigate', handler);
    return () => window.removeEventListener('navigate', handler);
  }, []);

  const addToast = useCallback((msg, type = 'default') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 2800);
  }, []);

  const addToCart = useCallback((product) => {
    if (product.stock === 0) return;
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    addToast(`${product.name} added to cart! 🤡`);
  }, [addToast]);

  const removeFromCart = useCallback((id) => {
    setCart(prev => prev.filter(i => i.id !== id));
    addToast('Item removed');
  }, [addToast]);

  const updateQty = useCallback((id, qty) => {
    if (qty < 1) return removeFromCart(id);
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  }, [removeFromCart]);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((product) => {
    setWishlist(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) { addToast('Removed from wishlist'); return prev.filter(i => i.id !== product.id); }
      addToast(`${product.name} saved to wishlist ❤️`);
      return [...prev, product];
    });
  }, [addToast]);

  const isWishlisted = useCallback((id) => wishlist.some(i => i.id === id), [wishlist]);

  const moveToCart = useCallback((product) => {
    addToCart(product);
    setWishlist(prev => prev.filter(i => i.id !== product.id));
  }, [addToCart]);

  const applyPromo = useCallback(() => {
    const code = promoCode.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setAppliedPromo({ code, ...PROMO_CODES[code] });
      setPromoError('');
      addToast(`Promo "${code}" applied! 🎉`);
    } else {
      setPromoError('Invalid promo code. Try CLOWN10, MOTEL50 or FREESHIP');
      setAppliedPromo(null);
    }
  }, [promoCode, addToast]);

  const removePromo = useCallback(() => {
    setAppliedPromo(null);
    setPromoCode('');
    setPromoError('');
  }, []);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartSubtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = cartSubtotal === 0 ? 0 : (cartSubtotal >= 999 || appliedPromo?.type === 'shipping' ? 0 : 79);
  let discount = 0;
  if (appliedPromo) {
    if (appliedPromo.type === 'percent') discount = Math.round(cartSubtotal * appliedPromo.value / 100);
    else if (appliedPromo.type === 'flat') discount = Math.min(appliedPromo.value, cartSubtotal);
  }
  const cartTotal = Math.max(0, cartSubtotal - discount + shipping);

  const filteredProducts = initialProducts
    .filter(p => {
      const matchCat = activeCat === 'All' || p.category === activeCat;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      const matchStock = !inStockOnly || p.stock > 0;
      return matchCat && matchSearch && matchPrice && matchStock;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return b.id - a.id;
      if (sortBy === 'popular') return b.reviews - a.reviews;
      return 0;
    });

  const placeOrder = useCallback(() => {
    const newOrder = {
      id: `JCC-${20400 + orders.length}`,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'placed',
      total: cartTotal,
      address: userProfile.address || 'Address not set',
      items: cart.map(i => ({ name: i.name, price: i.price, qty: i.qty, image: i.image })),
    };
    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    setAppliedPromo(null);
    setPromoCode('');
    setCheckoutOpen(false);
    setOrderSuccess(true);
  }, [cart, cartTotal, userProfile, orders.length]);

  return (
    <StoreContext.Provider value={{
      cart, addToCart, removeFromCart, updateQty, clearCart,
      cartCount, cartSubtotal, cartTotal, shipping, discount,
      wishlist, toggleWishlist, isWishlisted, moveToCart,
      activeCat, setActiveCat,
      search, setSearch,
      sortBy, setSortBy,
      priceRange, setPriceRange,
      inStockOnly, setInStockOnly,
      filteredProducts,
      cartOpen, setCartOpen,
      wishlistOpen, setWishlistOpen,
      quickViewProduct, setQuickViewProduct,
      checkoutOpen, setCheckoutOpen,
      orderSuccess, setOrderSuccess,
      promoCode, setPromoCode,
      appliedPromo, applyPromo, removePromo, promoError,
      toasts,
      addToast,
      placeOrder,
      currentPage, setCurrentPage,
      userProfile, setUserProfile,
      orders,
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
