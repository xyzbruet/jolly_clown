import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function OrderSuccess() {
  const { orderSuccess, setOrderSuccess } = useStore();
  if (!orderSuccess) return null;

  const orderId = `SA${Date.now().toString().slice(-6)}`;

  return (
    <div className="modal-overlay">
      <div className="success-modal">
        <div className="success-icon">
          <CheckCircle size={48} strokeWidth={1.5} />
        </div>
        <h2 className="success-title">Order Placed!</h2>
        <p className="success-sub">Thank you for your purchase. Your order is confirmed.</p>

        <div className="success-order-id">
          <span className="order-label">Order ID</span>
          <span className="order-val">#{orderId}</span>
        </div>

        <div className="success-timeline">
          {['Order Confirmed', 'Processing', 'Shipped', 'Delivered'].map((s, i) => (
            <div key={s} className={`timeline-step ${i === 0 ? 'active' : ''}`}>
              <div className="timeline-dot" />
              {i < 3 && <div className="timeline-line" />}
              <p className="timeline-label">{s}</p>
            </div>
          ))}
        </div>

        <div className="success-info">
          <div className="success-info-row">
            <Package size={14} />
            <span>Estimated delivery: 3–5 business days</span>
          </div>
        </div>

        <button className="success-btn" onClick={() => setOrderSuccess(false)}>
          Continue Shopping <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
