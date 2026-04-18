import { useState } from 'react';
import { User, Mail, Phone, MapPin, Camera, Save, Shield, Bell, Eye, EyeOff, LogOut, Edit3, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Profile() {
  const { userProfile, setUserProfile, addToast, orders } = useStore();
  const [activeTab, setActiveTab] = useState('info');
  const [editing, setEditing] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ ...userProfile });
  const [notifs, setNotifs] = useState({ orders: true, promos: true, wishlist: false, news: false });

  const save = () => {
    setUserProfile(form);
    setEditing(false);
    addToast('Profile updated!', 'success');
  };

  const avatarColors = ['#f0a500', '#ef4444', '#3b82f6', '#22c55e', '#a855f7', '#ec4899'];

  const tabs = [
    { id: 'info', label: 'Personal Info', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="page-container">
      <div className="page-hero-sm">
        <h1 className="page-title">My Account</h1>
        <p className="page-sub">Manage your profile and preferences</p>
      </div>

      <div className="profile-layout">
        {/* Sidebar */}
        <aside className="profile-sidebar">
          <div className="profile-avatar-wrap">
            <div className="profile-avatar" style={{ background: avatarColors[userProfile.colorIdx || 0] }}>
              {userProfile.name ? userProfile.name[0].toUpperCase() : 'U'}
            </div>
            <button className="avatar-edit-btn" onClick={() => setUserProfile(p => ({ ...p, colorIdx: ((p.colorIdx || 0) + 1) % avatarColors.length }))}>
              <Camera size={12} />
            </button>
          </div>
          <div className="profile-identity">
            <p className="profile-name">{userProfile.name || 'Your Name'}</p>
            <p className="profile-email-sm">{userProfile.email || 'email@example.com'}</p>
          </div>
          <div className="profile-stats-row">
            <div className="p-stat"><span className="p-stat-val">{orders.length}</span><span className="p-stat-label">Orders</span></div>
            <div className="p-stat"><span className="p-stat-val">3</span><span className="p-stat-label">Saved</span></div>
            <div className="p-stat"><span className="p-stat-val">₹{orders.reduce((s, o) => s + o.total, 0).toLocaleString()}</span><span className="p-stat-label">Spent</span></div>
          </div>
          <nav className="profile-nav">
            {tabs.map(t => (
              <button key={t.id} className={`profile-nav-btn ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>
                <t.icon size={15} />
                {t.label}
              </button>
            ))}
          </nav>
          <button className="profile-logout-btn">
            <LogOut size={14} />
            Sign Out
          </button>
        </aside>

        {/* Main */}
        <div className="profile-main">
          {activeTab === 'info' && (
            <div className="profile-card">
              <div className="profile-card-header">
                <div>
                  <h2 className="profile-card-title">Personal Information</h2>
                  <p className="profile-card-sub">Update your name, contact details and address</p>
                </div>
                {!editing
                  ? <button className="btn-outline-sm" onClick={() => setEditing(true)}><Edit3 size={13} /> Edit</button>
                  : <div className="btn-group-sm">
                      <button className="btn-ghost-sm" onClick={() => { setEditing(false); setForm({ ...userProfile }); }}>Cancel</button>
                      <button className="btn-accent-sm" onClick={save}><Check size={13} /> Save</button>
                    </div>
                }
              </div>

              <div className="profile-form">
                <div className="form-row-2">
                  <div className="field-group">
                    <label className="field-label"><User size={13} /> Full Name</label>
                    <input className="field-input" disabled={!editing} value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Enter your name" />
                  </div>
                  <div className="field-group">
                    <label className="field-label"><Mail size={13} /> Email</label>
                    <input className="field-input" disabled={!editing} value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="email@example.com" type="email" />
                  </div>
                </div>
                <div className="form-row-2">
                  <div className="field-group">
                    <label className="field-label"><Phone size={13} /> Phone</label>
                    <input className="field-input" disabled={!editing} value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div className="field-group">
                    <label className="field-label"><MapPin size={13} /> City</label>
                    <input className="field-input" disabled={!editing} value={form.city} onChange={e => setForm(p => ({ ...p, city: e.target.value }))} placeholder="Your city" />
                  </div>
                </div>
                <div className="field-group">
                  <label className="field-label"><MapPin size={13} /> Address</label>
                  <textarea className="field-input field-textarea" disabled={!editing} value={form.address} onChange={e => setForm(p => ({ ...p, address: e.target.value }))} placeholder="Street address, apartment, etc." />
                </div>
                <div className="form-row-2">
                  <div className="field-group">
                    <label className="field-label">State</label>
                    <input className="field-input" disabled={!editing} value={form.state} onChange={e => setForm(p => ({ ...p, state: e.target.value }))} placeholder="State" />
                  </div>
                  <div className="field-group">
                    <label className="field-label">PIN Code</label>
                    <input className="field-input" disabled={!editing} value={form.pin} onChange={e => setForm(p => ({ ...p, pin: e.target.value }))} placeholder="PIN" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="profile-card">
              <div className="profile-card-header">
                <div>
                  <h2 className="profile-card-title">Security Settings</h2>
                  <p className="profile-card-sub">Manage your password and account security</p>
                </div>
              </div>
              <div className="profile-form">
                <div className="field-group">
                  <label className="field-label">Current Password</label>
                  <div className="field-pass-wrap">
                    <input className="field-input" type={showPass ? 'text' : 'password'} placeholder="Enter current password" />
                    <button className="pass-toggle" onClick={() => setShowPass(p => !p)}>
                      {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>
                <div className="form-row-2">
                  <div className="field-group">
                    <label className="field-label">New Password</label>
                    <input className="field-input" type="password" placeholder="New password" />
                  </div>
                  <div className="field-group">
                    <label className="field-label">Confirm Password</label>
                    <input className="field-input" type="password" placeholder="Confirm new password" />
                  </div>
                </div>
                <button className="btn-accent-sm" onClick={() => addToast('Password updated!')}>
                  <Save size={13} /> Update Password
                </button>

                <div className="security-divider" />
                <div className="security-item">
                  <div>
                    <p className="security-item-title">Two-Factor Authentication</p>
                    <p className="security-item-sub">Add an extra layer of security to your account</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" />
                    <span className="toggle-track" />
                  </label>
                </div>
                <div className="security-item">
                  <div>
                    <p className="security-item-title">Login Alerts</p>
                    <p className="security-item-sub">Get notified when someone logs into your account</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="toggle-track" />
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="profile-card">
              <div className="profile-card-header">
                <div>
                  <h2 className="profile-card-title">Notification Preferences</h2>
                  <p className="profile-card-sub">Choose what updates you want to receive</p>
                </div>
              </div>
              <div className="profile-form">
                {[
                  { key: 'orders', title: 'Order Updates', sub: 'Shipping status, delivery confirmations' },
                  { key: 'promos', title: 'Promotions & Offers', sub: 'Discounts, promo codes, sales' },
                  { key: 'wishlist', title: 'Wishlist Alerts', sub: 'Price drops on wishlisted items' },
                  { key: 'news', title: 'New Arrivals', sub: 'Be first to know about new products' },
                ].map(n => (
                  <div key={n.key} className="notif-item">
                    <div>
                      <p className="security-item-title">{n.title}</p>
                      <p className="security-item-sub">{n.sub}</p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" checked={notifs[n.key]} onChange={() => setNotifs(p => ({ ...p, [n.key]: !p[n.key] }))} />
                      <span className="toggle-track" />
                    </label>
                  </div>
                ))}
                <button className="btn-accent-sm" onClick={() => addToast('Preferences saved!')}>
                  <Save size={13} /> Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
