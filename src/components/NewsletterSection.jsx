import { useState } from 'react';
import { Mail, CheckCircle, Gift, Zap, Star } from 'lucide-react';

const perks = [
  { icon: <Gift size={14} />, text: '₹100 off first order' },
  { icon: <Zap size={14} />,  text: 'Early access to drops' },
  { icon: <Star size={14} />, text: 'Exclusive member deals' },
];

export default function NewsletterSection() {
  const [email, setEmail]   = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) { setStatus('error'); return; }
    setStatus('loading');
    setTimeout(() => { setStatus('success'); setEmail(''); }, 1000);
  };

  return (
    <section className="nl-section">
      {/* Background shapes */}
      <div className="nl-shape nl-shape-1" />
      <div className="nl-shape nl-shape-2" />
      <div className="nl-shape nl-shape-3" />

      <div className="nl-container">
        {/* Left col */}
        <div className="nl-left">
          <span className="nl-eyebrow">
            <Mail size={13} /> Newsletter
          </span>
          <h2 className="nl-heading">
            Join the<br />
            <span className="nl-heading-accent">Clown Crew.</span>
          </h2>
          <p className="nl-desc">
            Get the inside scoop on new drops, restocks, and exclusive
            deals — straight from the World Famous Clown Motel.
          </p>

          {/* Perks list */}
          <ul className="nl-perks">
            {perks.map((p, i) => (
              <li key={i} className="nl-perk">
                <span className="nl-perk-icon">{p.icon}</span>
                {p.text}
              </li>
            ))}
          </ul>
        </div>

        {/* Right col — form */}
        <div className="nl-right">
          {status === 'success' ? (
            <div className="nl-success-card">
              <div className="nl-success-icon"><CheckCircle size={32} /></div>
              <p className="nl-success-title">You're in! 🎉</p>
              <p className="nl-success-sub">Check your inbox — your ₹100 discount code is on its way.</p>
            </div>
          ) : (
            <form className="nl-form-card" onSubmit={handleSubmit}>
              <p className="nl-form-label">Your email address</p>
              <div className={`nl-field-wrap ${status === 'error' ? 'nl-field-error' : ''}`}>
                <Mail size={15} className="nl-field-icon" />
                <input
                  type="email"
                  className="nl-field-input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setStatus('idle'); }}
                />
              </div>
              {status === 'error' && (
                <p className="nl-field-err-msg">Please enter a valid email.</p>
              )}
              <button
                type="submit"
                className={`nl-submit-btn ${status === 'loading' ? 'loading' : ''}`}
                disabled={status === 'loading'}
              >
                {status === 'loading'
                  ? <><span className="nl-btn-spinner" /> Subscribing…</>
                  : <><Mail size={15} /> Subscribe & Get ₹100 Off</>
                }
              </button>
              <p className="nl-privacy">No spam, ever. Unsubscribe anytime.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
