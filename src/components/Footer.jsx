import { Mail, Phone, MapPin, Instagram, Twitter, Youtube, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Footer() {
  const { setCurrentPage } = useStore();

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="store-footer">
      <div className="footer-top">
        <div className="footer-brand-col">
          <div className="footer-logo">
            <img src="/logo.png" alt="Jolly Clown Collection" className="footer-logo-img" />
          </div>
          <p className="footer-brand-desc">
            Official merchandise of the World Famous Clown Motel. Curated clown collectibles,
            apparel & accessories — shipped with love from the spookiest motel on Route 95.
            Free shipping on all orders above ₹999.
          </p>
          <div className="footer-social">
            <a href="#" className="footer-social-btn" title="Instagram"><Instagram size={15} /></a>
            <a href="#" className="footer-social-btn" title="Twitter"><Twitter size={15} /></a>
            <a href="#" className="footer-social-btn" title="YouTube"><Youtube size={15} /></a>
          </div>
          <div className="footer-promo-hint">
            <span className="promo-hint-label">Promo codes:</span>
            <code>CLOWN10</code> · <code>MOTEL50</code> · <code>FREESHIP</code> · <code>JOLLY20</code>
          </div>
        </div>

        <div className="footer-links-col">
          <p className="footer-col-title">Company</p>
          <button className="footer-link" onClick={() => navigate('about')}>About Us</button>
          <button className="footer-link" onClick={() => navigate('shop')}>Shop</button>
          <a href="#" className="footer-link">Clown Motel</a>
          <a href="#" className="footer-link">Press</a>
          <a href="#" className="footer-link">Blog</a>
        </div>

        <div className="footer-links-col">
          <p className="footer-col-title">Support</p>
          <button className="footer-link" onClick={() => navigate('help')}>Help Center</button>
          <button className="footer-link" onClick={() => navigate('contact')}>Contact Us</button>
          <button className="footer-link" onClick={() => navigate('orders')}>Track Order</button>
          <a href="#" className="footer-link">Returns & Refunds</a>
          <a href="#" className="footer-link">Shipping Info</a>
        </div>

        <div className="footer-links-col">
          <p className="footer-col-title">Legal</p>
          <a href="#" className="footer-link">Privacy Policy</a>
          <a href="#" className="footer-link">Terms of Service</a>
          <a href="#" className="footer-link">Cookie Policy</a>
          <a href="#" className="footer-link">Accessibility</a>
        </div>

        <div className="footer-contact-col">
          <p className="footer-col-title">Get in Touch</p>
          <a href="mailto:support@jollyclowncollection.com" className="footer-contact-item">
            <Mail size={13} /> support@jollyclowncollection.com
          </a>
          <a href="tel:+918800001234" className="footer-contact-item">
            <Phone size={13} /> +91 88000 01234
          </a>
          <div className="footer-contact-item no-link">
            <MapPin size={13} /> Tonopah, NV — World Famous Clown Motel
          </div>
          <div className="footer-newsletter">
            <p className="footer-newsletter-label">Get deals in your inbox</p>
            <div className="footer-newsletter-row">
              <input className="footer-newsletter-input" placeholder="your@email.com" type="email" />
              <button className="footer-newsletter-btn"><ArrowRight size={14} /></button>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copy">© 2026 Jolly Clown Collection. Official Merchandise of the Clown Motel. Made with 🤡 in India.</p>
        <div className="footer-bottom-links">
          <a href="#" className="footer-bottom-link">Privacy</a>
          <a href="#" className="footer-bottom-link">Terms</a>
          <button className="footer-bottom-link" onClick={() => navigate('contact')}>Contact</button>
        </div>
      </div>
    </footer>
  );
}
