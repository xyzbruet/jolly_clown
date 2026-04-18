import { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Clock, Send, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const FAQS = [
  { q: 'How long does shipping take?', a: 'Standard delivery takes 3–5 business days. Express delivery (available at checkout) takes 1–2 days. Metro cities get same-day delivery on orders placed before 12 PM.' },
  { q: 'What is your return policy?', a: 'We offer hassle-free returns within 7 days of delivery. Items must be unused and in original packaging. Refunds are processed within 3–5 business days.' },
  { q: 'Can I change or cancel my order?', a: 'Orders can be modified or cancelled within 1 hour of placing. After that, wait for delivery and use our return process.' },
  { q: 'Do you ship outside India?', a: 'Currently we only ship within India. International shipping is on our roadmap for 2026.' },
  { q: 'How do promo codes work?', a: 'Enter your promo code in the cart during checkout. Only one code can be applied per order. Codes are case-insensitive.' },
  { q: 'Is my payment information secure?', a: 'Absolutely. We use industry-standard SSL encryption and never store your card details on our servers.' },
];

function FAQItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? 'open' : ''}`}>
      <button className="faq-question" onClick={() => setOpen(o => !o)}>
        {item.q}
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open && <p className="faq-answer">{item.a}</p>}
    </div>
  );
}

export default function Contact() {
  const { addToast } = useStore();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { addToast('Please fill all required fields', 'error'); return; }
    setSubmitted(true);
    addToast('Message sent! We\'ll respond within 24 hours.');
  };

  return (
    <div className="page-container">
      <div className="page-hero-sm">
        <h1 className="page-title">Contact Us</h1>
        <p className="page-sub">We're here to help — reach out anytime</p>
      </div>

      <div className="contact-layout">
        {/* Info Column */}
        <div className="contact-info-col">
          <div className="contact-info-cards">
            <div className="contact-info-card">
              <div className="contact-info-icon"><Mail size={18} /></div>
              <div>
                <p className="contact-info-label">Email Us</p>
                <a href="mailto:support@shopaxis.in" className="contact-info-val">support@shopaxis.in</a>
                <p className="contact-info-hint">We respond within 24 hours</p>
              </div>
            </div>
            <div className="contact-info-card">
              <div className="contact-info-icon"><Phone size={18} /></div>
              <div>
                <p className="contact-info-label">Call Us</p>
                <a href="tel:+918800001234" className="contact-info-val">+91 88000 01234</a>
                <p className="contact-info-hint">Mon–Sat, 9 AM – 6 PM IST</p>
              </div>
            </div>
            <div className="contact-info-card">
              <div className="contact-info-icon"><MapPin size={18} /></div>
              <div>
                <p className="contact-info-label">Our Office</p>
                <p className="contact-info-val">Bandra Kurla Complex</p>
                <p className="contact-info-hint">Mumbai, Maharashtra 400051</p>
              </div>
            </div>
            <div className="contact-info-card">
              <div className="contact-info-icon"><Clock size={18} /></div>
              <div>
                <p className="contact-info-label">Support Hours</p>
                <p className="contact-info-val">Mon–Sat: 9 AM – 6 PM</p>
                <p className="contact-info-hint">Sunday: Closed</p>
              </div>
            </div>
          </div>

          <div className="live-chat-cta">
            <MessageSquare size={20} />
            <div>
              <p className="live-chat-title">Live Chat Available</p>
              <p className="live-chat-sub">Average response time: 5 minutes</p>
            </div>
            <button className="btn-accent-sm" onClick={() => addToast('Live chat coming soon!')}>Chat Now</button>
          </div>
        </div>

        {/* Form */}
        <div className="contact-form-col">
          {submitted ? (
            <div className="contact-success">
              <CheckCircle size={48} className="contact-success-icon" />
              <h3 className="contact-success-title">Message Received!</h3>
              <p className="contact-success-sub">Thanks for reaching out. Our team will get back to you at <strong>{form.email}</strong> within 24 hours.</p>
              <button className="btn-accent-sm" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}>
                Send Another
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <h2 className="contact-form-title">Send a Message</h2>
              <div className="form-row-2">
                <div className="field-group">
                  <label className="field-label">Your Name *</label>
                  <input className="field-input" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Full name" />
                </div>
                <div className="field-group">
                  <label className="field-label">Email Address *</label>
                  <input className="field-input" type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="your@email.com" />
                </div>
              </div>
              <div className="field-group">
                <label className="field-label">Subject</label>
                <select className="field-input" value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}>
                  <option value="">Select a topic...</option>
                  <option>Order Issue</option>
                  <option>Return / Refund</option>
                  <option>Product Query</option>
                  <option>Payment Problem</option>
                  <option>Shipping Query</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="field-group">
                <label className="field-label">Message *</label>
                <textarea className="field-input field-textarea lg" value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} placeholder="Describe your issue or question in detail..." />
              </div>
              <button type="submit" className="btn-accent-lg w-full">
                <Send size={15} /> Send Message
              </button>
            </form>
          )}
        </div>
      </div>

      {/* FAQ */}
      <section className="faq-section">
        <h2 className="about-section-title">Frequently Asked Questions</h2>
        <div className="faq-list">
          {FAQS.map(faq => <FAQItem key={faq.q} item={faq} />)}
        </div>
      </section>
    </div>
  );
}
