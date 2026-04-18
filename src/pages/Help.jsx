import { useState } from 'react';
import { Search, Package, CreditCard, Truck, RotateCcw, Shield, Smartphone, ChevronRight, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const HELP_CATEGORIES = [
  {
    id: 'orders',
    icon: Package,
    title: 'Orders',
    color: '#f0a500',
    bg: '#fff8e8',
    articles: [
      { title: 'How to place an order', content: 'Browse products, add them to your cart, and proceed to checkout. Fill in your delivery details, apply any promo codes, and confirm payment. You\'ll receive a confirmation email immediately.' },
      { title: 'Track my order', content: 'Go to My Orders in your profile. Click on any order to see its real-time tracking status including: Order Placed → Processing → Shipped → Delivered.' },
      { title: 'Change or cancel an order', content: 'Orders can be modified or cancelled within 1 hour of placing via the My Orders page. After 1 hour, the order enters processing and cannot be modified.' },
      { title: 'What if an item is out of stock?', content: 'If an item goes out of stock after you order, we\'ll notify you via email and issue a full refund within 3–5 business days.' },
    ]
  },
  {
    id: 'shipping',
    icon: Truck,
    title: 'Shipping',
    color: '#3b82f6',
    bg: '#eff6ff',
    articles: [
      { title: 'Delivery timeframes', content: 'Standard delivery: 3–5 business days. Express delivery: 1–2 business days. Same-day delivery available in Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Pune for orders placed before 12 PM.' },
      { title: 'Shipping charges', content: 'Free shipping on all orders above ₹999. Standard shipping is ₹79 for orders below ₹999. Express delivery is ₹149 extra.' },
      { title: 'Delivery to PO Box or APO', content: 'We currently do not deliver to PO Boxes or military addresses. Please provide a complete residential or commercial address.' },
    ]
  },
  {
    id: 'returns',
    icon: RotateCcw,
    title: 'Returns & Refunds',
    color: '#22c55e',
    bg: '#f0fdf4',
    articles: [
      { title: 'Return policy overview', content: 'Items can be returned within 7 days of delivery. Products must be unused, unwashed, and in original packaging with all tags attached.' },
      { title: 'How to initiate a return', content: 'Go to My Orders → select the item → click "Return". Choose a reason, schedule a pickup, and our courier will collect within 2 business days.' },
      { title: 'Refund timeline', content: 'Once we receive your return, refunds are processed within 3–5 business days. Bank transfers take 2–3 additional days to reflect.' },
      { title: 'Damaged or wrong items', content: 'Contact us within 48 hours of delivery with photos of the issue. We\'ll send a replacement or issue a full refund — no return required.' },
    ]
  },
  {
    id: 'payment',
    icon: CreditCard,
    title: 'Payments',
    color: '#8b5cf6',
    bg: '#f5f3ff',
    articles: [
      { title: 'Accepted payment methods', content: 'We accept UPI, Net Banking, Credit/Debit cards (Visa, Mastercard, RuPay), and Cash on Delivery (₹49 extra). EMI available on cards for orders above ₹1,500.' },
      { title: 'Is my payment secure?', content: 'Yes. We use 256-bit SSL encryption and are PCI-DSS compliant. We never store your full card details on our servers.' },
      { title: 'Payment failed but money deducted', content: 'If your payment failed but money was deducted, it will automatically reverse within 5–7 business days. Contact your bank with the transaction reference if it doesn\'t.' },
    ]
  },
  {
    id: 'account',
    icon: Shield,
    title: 'Account & Security',
    color: '#ef4444',
    bg: '#fef2f2',
    articles: [
      { title: 'Create or edit your profile', content: 'Go to Profile (user icon in navbar) → Personal Info. Click Edit to update your name, contact, and address. Click Save when done.' },
      { title: 'Forgot password', content: 'Click "Sign In" → "Forgot Password". Enter your email and we\'ll send a reset link. The link is valid for 30 minutes.' },
      { title: 'Two-factor authentication', content: 'Enable 2FA in Profile → Security Settings. You\'ll receive an OTP on your registered phone/email on each new login.' },
    ]
  },
  {
    id: 'app',
    icon: Smartphone,
    title: 'App & Technical',
    color: '#ec4899',
    bg: '#fdf2f8',
    articles: [
      { title: 'Browser compatibility', content: 'ShopAxis works best on Chrome, Firefox, Safari, and Edge. For mobile, use Chrome on Android or Safari on iOS for the best experience.' },
      { title: 'App not loading properly', content: 'Clear your browser cache (Ctrl+Shift+Del / Cmd+Shift+Delete), disable extensions, and reload. If issues persist, try a different browser.' },
    ]
  },
];

function ArticleAccordion({ article }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`help-article ${open ? 'open' : ''}`}>
      <button className="help-article-q" onClick={() => setOpen(o => !o)}>
        <HelpCircle size={13} className="help-q-icon" />
        {article.title}
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      {open && <p className="help-article-a">{article.content}</p>}
    </div>
  );
}

export default function Help() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);

  const allArticles = HELP_CATEGORIES.flatMap(c => c.articles.map(a => ({ ...a, category: c.title })));
  const searchResults = query.trim()
    ? allArticles.filter(a => a.title.toLowerCase().includes(query.toLowerCase()) || a.content.toLowerCase().includes(query.toLowerCase()))
    : [];

  const displayCat = activeCategory ? HELP_CATEGORIES.find(c => c.id === activeCategory) : null;

  return (
    <div className="page-container">
      <div className="help-hero">
        <h1 className="page-title">Help Center</h1>
        <p className="page-sub">Find answers to all your questions</p>
        <div className="help-search">
          <Search size={16} className="help-search-icon" />
          <input
            className="help-search-input"
            placeholder="Search for help — e.g. 'return policy', 'track order'..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Search results */}
      {query.trim() && (
        <div className="help-search-results">
          <p className="help-results-label">{searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{query}"</p>
          {searchResults.length === 0 ? (
            <p className="help-no-results">No results found. Try different keywords or <button className="help-contact-link" onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'contact' }))}>contact us</button>.</p>
          ) : (
            searchResults.map(a => (
              <div key={a.title} className="help-search-result-item">
                <span className="help-result-cat">{a.category}</span>
                <h4 className="help-result-title">{a.title}</h4>
                <p className="help-result-preview">{a.content.slice(0, 120)}...</p>
              </div>
            ))
          )}
        </div>
      )}

      {!query.trim() && (
        <>
          {!activeCategory ? (
            <>
              <div className="help-categories">
                {HELP_CATEGORIES.map(cat => (
                  <button key={cat.id} className="help-cat-card" onClick={() => setActiveCategory(cat.id)} style={{ borderColor: cat.color + '33' }}>
                    <div className="help-cat-icon" style={{ background: cat.bg, color: cat.color }}>
                      <cat.icon size={22} />
                    </div>
                    <h3 className="help-cat-title">{cat.title}</h3>
                    <p className="help-cat-count">{cat.articles.length} articles</p>
                    <ChevronRight size={14} className="help-cat-arrow" />
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="help-category-view">
              <button className="help-back-btn" onClick={() => setActiveCategory(null)}>
                ← Back to all topics
              </button>
              <div className="help-category-header" style={{ borderLeftColor: displayCat.color }}>
                <displayCat.icon size={18} style={{ color: displayCat.color }} />
                <h2 className="help-category-title">{displayCat.title}</h2>
              </div>
              <div className="help-articles">
                {displayCat.articles.map(a => <ArticleAccordion key={a.title} article={a} />)}
              </div>
            </div>
          )}
        </>
      )}

      {/* Still need help */}
      <div className="help-still-need">
        <h3 className="help-still-title">Still need help?</h3>
        <p className="help-still-sub">Our support team is available Mon–Sat, 9 AM to 6 PM IST.</p>
        <div className="help-still-actions">
          <button className="btn-outline-lg" onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'contact' }))}>
            Send a Message
          </button>
          <a href="tel:+918800001234" className="btn-accent-lg">
            Call Support
          </a>
        </div>
      </div>
    </div>
  );
}
