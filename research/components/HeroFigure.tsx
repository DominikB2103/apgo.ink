export function HeroFigure() {
  return (
    <aside className="hero-figure" aria-label="Original research diagram showing layered measurement fields">
      <div className="figure-heading">
        <span>Field composite</span>
        <span>Static SVG</span>
      </div>
      <svg viewBox="0 0 720 620" role="img" aria-labelledby="figure-title figure-desc">
        <title id="figure-title">Layered research signal diagram</title>
        <desc id="figure-desc">
          A restrained abstract diagram with grid lines, confidence bands, and annotated signal paths.
        </desc>
        <defs>
          <linearGradient id="band" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#f3eee4" />
            <stop offset="1" stopColor="#ded2bd" />
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="718" height="618" fill="#fbfaf6" stroke="#171717" strokeWidth="2" />
        <g opacity="0.56" stroke="#b8ad9b" strokeWidth="1">
          {Array.from({ length: 10 }, (_, index) => (
            <line key={`v-${index}`} x1={72 + index * 58} x2={72 + index * 58} y1="52" y2="568" />
          ))}
          {Array.from({ length: 8 }, (_, index) => (
            <line key={`h-${index}`} x1="58" x2="662" y1={92 + index * 60} y2={92 + index * 60} />
          ))}
        </g>
        <path
          d="M74 445 C142 374 185 398 244 330 C297 269 356 286 407 225 C466 154 559 188 636 96 L636 527 L74 527 Z"
          fill="url(#band)"
          opacity="0.95"
        />
        <path
          d="M74 445 C142 374 185 398 244 330 C297 269 356 286 407 225 C466 154 559 188 636 96"
          fill="none"
          stroke="#1d1d1b"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M76 399 C148 354 203 360 260 301 C322 237 367 264 420 196 C474 126 564 156 636 72"
          fill="none"
          stroke="#8d2e25"
          strokeWidth="2"
          strokeDasharray="8 12"
          strokeLinecap="round"
        />
        <path
          d="M82 490 C151 424 208 439 269 373 C329 308 379 321 430 257 C488 187 564 216 640 142"
          fill="none"
          stroke="#8d8172"
          strokeWidth="2"
          strokeDasharray="3 10"
          strokeLinecap="round"
        />
        <g fill="#171717">
          {[74, 244, 407, 636].map((x, index) => {
            const y = [445, 330, 225, 96][index];
            return <circle key={x} cx={x} cy={y} r="7" />;
          })}
        </g>
        <g fontFamily="Arial, sans-serif" fontSize="22" fill="#171717">
          <text x="58" y="44">01</text>
          <text x="550" y="582">confidence boundary</text>
          <text x="92" y="584">measurement trace</text>
        </g>
        <g stroke="#171717" strokeWidth="1.5" fill="none">
          <path d="M520 118 L603 118" />
          <path d="M520 118 L520 184" />
          <path d="M122 460 L186 460" />
          <path d="M186 460 L186 415" />
        </g>
      </svg>
      <div className="figure-caption">
        <strong>Editorial note.</strong> All graphics are original vector assets, built to remain crisp on static hosting and print-like on high-density screens.
      </div>
    </aside>
  );
}
