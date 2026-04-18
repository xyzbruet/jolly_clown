import { useState } from 'react';
import { Mail, CheckCircle, Sparkles } from 'lucide-react';

export default function NewsletterStrip() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) { setStatus('error'); return; }
    setStatus('loading');
    setTimeout(() => { setStatus('success'); setEmail(''); }, 1000);
  };

  return (
    <div className="nl-strip">
      {/* Left décor dot cluster */}
      <div className="nl-deco nl-deco-left">
        <span className="nl-dot" />
        <span className="nl-dot nl-dot-sm" />
        <span className="nl-dot nl-dot-xs" />
      </div>

      <div className="nl-inner">
        {/* Icon + text */}
        <div className="nl-text-group">
          <span className="nl-icon-wrap">
            <Mail size={18} />
          </span>
          <div>
            <p className="nl-title">Join the Clown Crew</p>
            <p className="nl-sub">Early access · Exclusive drops · ₹100 off your first order</p>
          </div>
        </div>

        {/* Form or success */}
        {status === 'success' ? (
          <div className="nl-success">
            <CheckCircle size={16} />
            <span>You're in! Check your inbox for ₹100 off.</span>
          </div>
        ) : (
          <form className="nl-form" onSubmit={handleSubmit}>
            <div className={`nl-input-wrap ${status === 'error' ? 'nl-input-error' : ''}`}>
              <input
                type="email"
                className="nl-input"
                placeholder="your@email.com"
                value={email}
                onChange={e => { setEmail(e.target.value); setStatus('idle'); }}
              />
              <button
                type="submit"
                className={`nl-btn ${status === 'loading' ? 'nl-btn-loading' : ''}`}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <span className="nl-spinner" />
                ) : (
                  <>Subscribe</>
                )}
              </button>
            </div>
            {status === 'error' && <p className="nl-error-msg">Please enter a valid email address.</p>}
          </form>
        )}
      </div>

      {/* Right décor */}
      <div className="nl-deco nl-deco-right">
        <span className="nl-dot" />
        <span className="nl-dot nl-dot-sm" />
        <span className="nl-dot nl-dot-xs" />
      </div>
    </div>
  );
}
