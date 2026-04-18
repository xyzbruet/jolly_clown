export default function StarRating({ rating, reviews, size = 'sm' }) {
  const stars = [1, 2, 3, 4, 5];
  const sz = size === 'lg' ? 16 : 12;

  return (
    <div className="star-rating">
      <div className="stars" style={{ gap: size === 'lg' ? 3 : 2 }}>
        {stars.map(s => {
          const filled = rating >= s;
          const half = !filled && rating >= s - 0.5;
          return (
            <svg key={s} width={sz} height={sz} viewBox="0 0 12 12" fill="none">
              <defs>
                <linearGradient id={`half-${s}`} x1="0" x2="1" y1="0" y2="0">
                  <stop offset="50%" stopColor="#f0a500" />
                  <stop offset="50%" stopColor="#e5e2dc" />
                </linearGradient>
              </defs>
              <path
                d="M6 1l1.4 2.8 3.1.45-2.25 2.19.53 3.1L6 8.1 3.22 9.54l.53-3.1L1.5 4.25l3.1-.45z"
                fill={filled ? '#f0a500' : half ? `url(#half-${s})` : '#e5e2dc'}
              />
            </svg>
          );
        })}
      </div>
      {reviews !== undefined && (
        <span className="star-count">({reviews})</span>
      )}
    </div>
  );
}
