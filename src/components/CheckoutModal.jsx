import { useState } from 'react';
import { X, ChevronRight, ChevronLeft, CheckCircle, CreditCard, Truck, User } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const STEPS = ['Contact', 'Shipping', 'Payment'];

const INITIAL_FORM = {
  name: '', email: '', phone: '',
  address: '', city: '', state: '', pincode: '',
  cardName: '', cardNumber: '', expiry: '', cvv: '',
};

export default function CheckoutModal() {
  const { checkoutOpen, setCheckoutOpen, cart, cartSubtotal, cartTotal, shipping, discount, appliedPromo, placeOrder } = useStore();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  if (!checkoutOpen) return null;

  const update = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (step === 0) {
      if (!form.name.trim()) errs.name = 'Required';
      if (!form.email.includes('@')) errs.email = 'Valid email required';
      if (form.phone.length < 10) errs.phone = 'Valid phone required';
    }
    if (step === 1) {
      if (!form.address.trim()) errs.address = 'Required';
      if (!form.city.trim()) errs.city = 'Required';
      if (!form.state.trim()) errs.state = 'Required';
      if (form.pincode.length < 6) errs.pincode = 'Valid pincode required';
    }
    if (step === 2) {
      if (!form.cardName.trim()) errs.cardName = 'Required';
      if (form.cardNumber.replace(/\s/g, '').length < 16) errs.cardNumber = 'Valid card number required';
      if (!form.expiry.match(/^\d{2}\/\d{2}$/)) errs.expiry = 'MM/YY format';
      if (form.cvv.length < 3) errs.cvv = 'Required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => { if (validate()) setStep(s => s + 1); };
  const back = () => setStep(s => s - 1);

  const formatCard = v => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  const formatExpiry = v => {
    const raw = v.replace(/\D/g, '').slice(0, 4);
    return raw.length > 2 ? raw.slice(0, 2) + '/' + raw.slice(2) : raw;
  };

  const icons = [<User size={14} />, <Truck size={14} />, <CreditCard size={14} />];

  return (
    <div className="modal-overlay" onClick={() => setCheckoutOpen(false)}>
      <div className="checkout-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={() => setCheckoutOpen(false)}><X size={18} /></button>

        {/* Steps indicator */}
        <div className="checkout-steps">
          {STEPS.map((s, i) => (
            <div key={s} className={`checkout-step ${i <= step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
              <div className="step-circle">
                {i < step ? <CheckCircle size={14} /> : icons[i]}
              </div>
              <span className="step-label">{s}</span>
              {i < STEPS.length - 1 && <div className="step-line" />}
            </div>
          ))}
        </div>

        <div className="checkout-layout">
          {/* Form */}
          <div className="checkout-form">
            <h3 className="checkout-step-title">{STEPS[step]} Details</h3>

            {step === 0 && (
              <div className="form-fields">
                <Field label="Full Name" error={errors.name}>
                  <input className={`form-input ${errors.name ? 'err' : ''}`} value={form.name} onChange={e => update('name', e.target.value)} placeholder="Your full name" />
                </Field>
                <Field label="Email Address" error={errors.email}>
                  <input className={`form-input ${errors.email ? 'err' : ''}`} type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@example.com" />
                </Field>
                <Field label="Phone Number" error={errors.phone}>
                  <input className={`form-input ${errors.phone ? 'err' : ''}`} value={form.phone} onChange={e => update('phone', e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="10-digit mobile number" />
                </Field>
              </div>
            )}

            {step === 1 && (
              <div className="form-fields">
                <Field label="Address" error={errors.address}>
                  <input className={`form-input ${errors.address ? 'err' : ''}`} value={form.address} onChange={e => update('address', e.target.value)} placeholder="Flat, Street, Area" />
                </Field>
                <div className="form-row">
                  <Field label="City" error={errors.city}>
                    <input className={`form-input ${errors.city ? 'err' : ''}`} value={form.city} onChange={e => update('city', e.target.value)} placeholder="City" />
                  </Field>
                  <Field label="State" error={errors.state}>
                    <input className={`form-input ${errors.state ? 'err' : ''}`} value={form.state} onChange={e => update('state', e.target.value)} placeholder="State" />
                  </Field>
                </div>
                <Field label="Pincode" error={errors.pincode}>
                  <input className={`form-input ${errors.pincode ? 'err' : ''}`} value={form.pincode} onChange={e => update('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="6-digit pincode" />
                </Field>
              </div>
            )}

            {step === 2 && (
              <div className="form-fields">
                <div className="card-preview">
                  <div className="card-chip" />
                  <p className="card-number-preview">{form.cardNumber || '•••• •••• •••• ••••'}</p>
                  <div className="card-bottom">
                    <span>{form.cardName || 'CARDHOLDER NAME'}</span>
                    <span>{form.expiry || 'MM/YY'}</span>
                  </div>
                </div>
                <Field label="Name on Card" error={errors.cardName}>
                  <input className={`form-input ${errors.cardName ? 'err' : ''}`} value={form.cardName} onChange={e => update('cardName', e.target.value.toUpperCase())} placeholder="As printed on card" />
                </Field>
                <Field label="Card Number" error={errors.cardNumber}>
                  <input className={`form-input ${errors.cardNumber ? 'err' : ''}`} value={form.cardNumber} onChange={e => update('cardNumber', formatCard(e.target.value))} placeholder="1234 5678 9012 3456" />
                </Field>
                <div className="form-row">
                  <Field label="Expiry" error={errors.expiry}>
                    <input className={`form-input ${errors.expiry ? 'err' : ''}`} value={form.expiry} onChange={e => update('expiry', formatExpiry(e.target.value))} placeholder="MM/YY" />
                  </Field>
                  <Field label="CVV" error={errors.cvv}>
                    <input className={`form-input ${errors.cvv ? 'err' : ''}`} value={form.cvv} onChange={e => update('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))} placeholder="•••" type="password" />
                  </Field>
                </div>
              </div>
            )}

            <div className="form-nav">
              {step > 0 && (
                <button className="back-btn" onClick={back}><ChevronLeft size={16} /> Back</button>
              )}
              {step < 2 ? (
                <button className="next-btn" onClick={next}>Continue <ChevronRight size={16} /></button>
              ) : (
                <button className="place-order-btn" onClick={placeOrder}>
                  <CheckCircle size={16} /> Place Order — ₹{cartTotal.toLocaleString()}
                </button>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <h3 className="summary-title">Order Summary</h3>
            <div className="summary-items">
              {cart.map(item => (
                <div key={item.id} className="summary-item">
                  <div className="summary-item-img-wrap">
                    <img src={item.image} alt={item.name} className="summary-item-img" />
                    <span className="summary-item-qty">{item.qty}</span>
                  </div>
                  <span className="summary-item-name">{item.name}</span>
                  <span className="summary-item-price">₹{(item.price * item.qty).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="summary-totals">
              <div className="summary-row"><span>Subtotal</span><span>₹{cartSubtotal.toLocaleString()}</span></div>
              {discount > 0 && <div className="summary-row discount"><span>Discount ({appliedPromo?.code})</span><span>−₹{discount}</span></div>}
              <div className="summary-row"><span>Shipping</span><span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
              <div className="summary-row total"><span>Total</span><span>₹{cartTotal.toLocaleString()}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {children}
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}
