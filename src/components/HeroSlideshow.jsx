import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const slides = [
  {
    id: 1,
    tag: 'New Season',
    headline: ['The Legend', 'Lives On.'],
    sub: 'Official merchandise of the world\'s most infamous motel',
    cta: 'Shop New Arrivals',
    filter: 'new',
    bg: 'slide-bg-1',
    accent: '#f7c600',
    dark: true,
  },
  {
    id: 2,
    tag: 'Bestsellers',
    headline: ['Worn by', 'Clown Lovers'],
    sub: 'Our most-loved tees, hoodies & collectibles — back in stock',
    cta: 'Shop Bestsellers',
    filter: 'bestseller',
    bg: 'slide-bg-2',
    accent: '#e8182c',
    dark: false,
  },
  {
    id: 3,
    tag: 'Free Shipping',
    headline: ['Orders Over', '₹999 Ship Free'],
    sub: 'Pan-India delivery on all merchandise orders above ₹999',
    cta: 'Browse All Products',
    filter: null,
    bg: 'slide-bg-3',
    accent: '#f7c600',
    dark: true,
  },
  {
    id: 4,
    tag: 'Collectibles',
    headline: ['Keychains.', 'Pins. More.'],
    sub: 'Limited-run accessories for the true Clown Motel devotee',
    cta: 'Shop Keychains',
    filter: 'Keychains',
    bg: 'slide-bg-4',
    accent: '#e8182c',
    dark: false,
  },
];

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const [animDir, setAnimDir] = useState('next');
  const [paused, setPaused] = useState(false);
  const { setActiveCat } = useStore();

  const goTo = useCallback((idx, dir = 'next') => {
    setAnimDir(dir);
    setCurrent(idx);
  }, []);

  const next = useCallback(() => goTo((current + 1) % slides.length, 'next'), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length, 'prev'), [current, goTo]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, [next, paused]);

  const handleCta = (slide) => {
    if (slide.filter) setActiveCat(slide.filter === 'new' ? 'All' : slide.filter);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const s = slides[current];

  return (
    <div
      className={`slideshow-wrap ${s.bg}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Decorative circus rings */}
      <div className="slide-deco-rings">
        <div className="slide-ring ring-1" />
        <div className="slide-ring ring-2" />
        <div className="slide-ring ring-3" />
      </div>

      {/* Stripe overlay */}
      <div className="slide-stripes" />

      {/* Content */}
      <div className={`slide-content slide-anim-${animDir}`} key={current}>
        <span className="slide-tag">{s.tag}</span>

        <h2 className="slide-headline" style={{ '--slide-accent': s.accent }}>
          {s.headline.map((line, i) => (
            <span key={i} className="slide-line" style={{ animationDelay: `${i * 80}ms` }}>
              {line}
            </span>
          ))}
        </h2>

        <p className="slide-sub">{s.sub}</p>

        <button className="slide-cta" style={{ '--slide-accent': s.accent }} onClick={() => handleCta(s)}>
          {s.cta}
          <span className="slide-cta-arrow">→</span>
        </button>
      </div>

      {/* Right decorative number */}
      <div className="slide-number-bg">
        0{current + 1}
      </div>

      {/* Arrows */}
      <button className="slide-arrow slide-arrow-prev" onClick={prev} aria-label="Previous slide">
        <ChevronLeft size={20} />
      </button>
      <button className="slide-arrow slide-arrow-next" onClick={next} aria-label="Next slide">
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="slide-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`slide-dot ${i === current ? 'active' : ''}`}
            onClick={() => goTo(i, i > current ? 'next' : 'prev')}
            style={{ '--dot-accent': s.accent }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="slide-progress-bar" key={`pb-${current}`} style={{ '--slide-accent': s.accent }} />
    </div>
  );
}
