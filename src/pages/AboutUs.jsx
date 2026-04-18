import { Heart, Zap, ShieldCheck, Star, Package, Users, Award, MapPin } from 'lucide-react';

const TEAM = [
  { name: 'Bobbo the Founder', role: 'Founder & Chief Clown', avatar: 'https://picsum.photos/seed/jcc-team1/200/200', quote: 'We built Jolly Clown Collection to let fans carry a piece of the Clown Motel magic everywhere they go.' },
  { name: 'Penny Laughton', role: 'Head of Design', avatar: 'https://picsum.photos/seed/jcc-team2/200/200', quote: 'Every product is a tribute — we honour the legacy of the world\'s most famous motel.' },
  { name: 'Rex Giggler', role: 'Product Lead', avatar: 'https://picsum.photos/seed/jcc-team3/200/200', quote: 'Our obsession with quality never takes a day off — not even for clowning around.' },
  { name: 'Suzy Honksworth', role: 'Customer Happiness', avatar: 'https://picsum.photos/seed/jcc-team4/200/200', quote: 'A happy customer is the best kind of punchline.' },
];

const VALUES = [
  { icon: Heart,      title: 'Fan First',           text: 'Every decision we make starts with one question: does this make our fans smile as wide as a clown\'s painted grin?' },
  { icon: Zap,        title: 'Speed & Reliability',  text: 'Fast shipping, real-time tracking, and a support team that actually picks up. No clowning around.' },
  { icon: ShieldCheck, title: 'Quality Guaranteed',  text: 'Every item is sourced, checked, and shipped with care. The Clown Motel name stands for something — so does ours.' },
  { icon: MapPin,     title: 'Authentic Heritage',   text: 'Rooted in the legacy of the World Famous Clown Motel, Tonopah, NV. Est. 1967. Every product tells that story.' },
];

const MILESTONES = [
  { year: '1967', event: 'The Clown Motel opens in Tonopah, Nevada — becomes a roadside legend overnight.' },
  { year: '2018', event: 'Jolly Clown Collection founded to bring official merch to fans worldwide.' },
  { year: '2020', event: 'Reached 10,000 happy customers. First international shipment sent.' },
  { year: '2022', event: 'Launched 50+ exclusive products. Crossed ₹50 Lakh in monthly GMV.' },
  { year: '2024', event: 'Expanded to 200+ products. Featured in Atlas Obscura & travel media.' },
  { year: '2026', event: 'Launched Jolly Clown Collection 2.0 — fully redesigned fan experience.' },
];

export default function AboutUs() {
  return (
    <div className="page-container about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-badge">🤡 Our Story</div>
        <h1 className="about-hero-title">
          Where every product<br />
          <span className="text-accent">tells a legendary story</span>
        </h1>
        <p className="about-hero-desc">
          The Clown Motel in Tonopah, Nevada has been America's most wonderfully bizarre roadside landmark since 1967.
          Jolly Clown Collection is the official merchandise brand — bringing the magic, mystery, and mirth of the 
          world's most famous clown motel to fans everywhere.
        </p>
        <div className="about-stats">
          <div className="about-stat"><Package size={20} /><span className="about-stat-val">50K+</span><span className="about-stat-label">Orders Delivered</span></div>
          <div className="about-stat"><Users size={20} /><span className="about-stat-val">18K+</span><span className="about-stat-label">Happy Fans</span></div>
          <div className="about-stat"><Star size={20} /><span className="about-stat-val">4.8★</span><span className="about-stat-label">Avg. Rating</span></div>
          <div className="about-stat"><Award size={20} /><span className="about-stat-val">200+</span><span className="about-stat-label">Products</span></div>
        </div>
      </section>

      {/* Values */}
      <section className="about-section">
        <h2 className="about-section-title">What we stand for</h2>
        <div className="values-grid">
          {VALUES.map(v => (
            <div key={v.title} className="value-card">
              <div className="value-icon-wrap"><v.icon size={20} /></div>
              <h3 className="value-title">{v.title}</h3>
              <p className="value-text">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="about-section about-timeline-section">
        <h2 className="about-section-title">Our Journey</h2>
        <div className="about-timeline">
          {MILESTONES.map((m, i) => (
            <div key={m.year} className={`milestone ${i % 2 === 0 ? 'left' : 'right'}`}>
              <div className="milestone-card">
                <span className="milestone-year">{m.year}</span>
                <p className="milestone-event">{m.event}</p>
              </div>
              <div className="milestone-dot" />
            </div>
          ))}
          <div className="timeline-spine" />
        </div>
      </section>

      {/* Team */}
      <section className="about-section">
        <h2 className="about-section-title">Meet the team</h2>
        <p className="about-section-sub">The people behind every pixel, product, and package</p>
        <div className="team-grid">
          {TEAM.map(member => (
            <div key={member.name} className="team-card">
              <img src={member.avatar} alt={member.name} className="team-avatar" />
              <h3 className="team-name">{member.name}</h3>
              <span className="team-role">{member.role}</span>
              <p className="team-quote">"{member.quote}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <h2 className="about-cta-title">Ready to join the circus?</h2>
        <p className="about-cta-sub">200+ exclusive Clown Motel products. Free shipping on orders above ₹999.</p>
        <button className="btn-accent-lg" onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'shop' }))}>
          Shop Now 🤡
        </button>
      </section>
    </div>
  );
}
