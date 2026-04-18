import { useState } from 'react';
import { Package, ChevronDown, ChevronUp, Truck, CheckCircle, Clock, XCircle, RotateCcw, Star, Download } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const STATUS_CONFIG = {
  placed: { label: 'Order Placed', icon: Clock, color: '#f0a500', bg: '#fff8e8' },
  processing: { label: 'Processing', icon: RotateCcw, color: '#3b82f6', bg: '#eff6ff' },
  shipped: { label: 'Shipped', icon: Truck, color: '#8b5cf6', bg: '#f5f3ff' },
  delivered: { label: 'Delivered', icon: CheckCircle, color: '#22c55e', bg: '#f0fdf4' },
  cancelled: { label: 'Cancelled', icon: XCircle, color: '#ef4444', bg: '#fef2f2' },
};

function OrderCard({ order }) {
  const [open, setOpen] = useState(false);
  const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG.placed;
  const StatusIcon = cfg.icon;

  return (
    <div className="order-card">
      <div className="order-card-header" onClick={() => setOpen(o => !o)}>
        <div className="order-id-wrap">
          <Package size={14} className="order-pkg-icon" />
          <div>
            <p className="order-id">#{order.id}</p>
            <p className="order-date">{order.date}</p>
          </div>
        </div>
        <div className="order-card-meta">
          <span className="order-status-badge" style={{ color: cfg.color, background: cfg.bg }}>
            <StatusIcon size={11} /> {cfg.label}
          </span>
          <span className="order-total-val">₹{order.total.toLocaleString()}</span>
          <span className="order-items-count">{order.items.length} item{order.items.length > 1 ? 's' : ''}</span>
          {open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </div>
      </div>

      {open && (
        <div className="order-card-body">
          {/* Timeline */}
          <div className="order-timeline">
            {['placed', 'processing', 'shipped', 'delivered'].map((step, i, arr) => {
              const stepIdx = arr.indexOf(order.status);
              const done = i <= stepIdx && order.status !== 'cancelled';
              const curr = i === stepIdx;
              return (
                <div key={step} className={`timeline-step ${done ? 'done' : ''} ${curr ? 'curr' : ''}`}>
                  <div className="timeline-dot" />
                  {i < arr.length - 1 && <div className="timeline-line" />}
                  <span className="timeline-label">{STATUS_CONFIG[step].label}</span>
                </div>
              );
            })}
          </div>

          {/* Items */}
          <div className="order-items">
            {order.items.map((item, i) => (
              <div key={i} className="order-item-row">
                <img src={item.image} alt={item.name} className="order-item-img" />
                <div className="order-item-info">
                  <p className="order-item-name">{item.name}</p>
                  <p className="order-item-meta">Qty: {item.qty} · ₹{item.price}</p>
                </div>
                <div className="order-item-right">
                  <p className="order-item-subtotal">₹{(item.price * item.qty).toLocaleString()}</p>
                  {order.status === 'delivered' && (
                    <button className="rate-btn"><Star size={11} /> Rate</button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="order-card-footer">
            <div className="order-addr-wrap">
              <p className="order-addr-label">Delivered to</p>
              <p className="order-addr">{order.address}</p>
            </div>
            <div className="order-footer-actions">
              {order.status === 'delivered' && (
                <button className="btn-outline-sm"><RotateCcw size={12} /> Reorder</button>
              )}
              <button className="btn-outline-sm"><Download size={12} /> Invoice</button>
              {(order.status === 'placed' || order.status === 'processing') && (
                <button className="btn-danger-sm"><XCircle size={12} /> Cancel</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Orders() {
  const { orders } = useStore();
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  const counts = {};
  orders.forEach(o => { counts[o.status] = (counts[o.status] || 0) + 1; });

  return (
    <div className="page-container">
      <div className="page-hero-sm">
        <h1 className="page-title">My Orders</h1>
        <p className="page-sub">Track and manage your purchases</p>
      </div>

      {/* Stats */}
      <div className="orders-stats">
        {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
          <div key={key} className="orders-stat-pill" style={{ borderColor: cfg.color + '33' }}>
            <span className="orders-stat-num" style={{ color: cfg.color }}>{counts[key] || 0}</span>
            <span className="orders-stat-label">{cfg.label}</span>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="orders-filters">
        {['all', ...Object.keys(STATUS_CONFIG)].map(f => (
          <button key={f} className={`orders-filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
            {f === 'all' ? `All (${orders.length})` : `${STATUS_CONFIG[f].label} (${counts[f] || 0})`}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <Package size={48} className="empty-icon" />
          <p className="empty-title">No orders {filter !== 'all' ? `with status "${STATUS_CONFIG[filter]?.label}"` : 'yet'}</p>
          <p className="empty-sub">Place your first order from the shop!</p>
        </div>
      ) : (
        <div className="orders-list">
          {filtered.map(order => <OrderCard key={order.id} order={order} />)}
        </div>
      )}
    </div>
  );
}
