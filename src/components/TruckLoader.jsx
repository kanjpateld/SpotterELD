import './TruckLoader.css';

const WHEEL_POSITIONS = [38, 96, 160];

function Wheel({ x }) {
  return (
    <g transform={`translate(${x},96)`}>
      <circle r="15" fill="#22303A" />
      <circle r="6.5" fill="#5A6B76" />
      <g className="truck-loader__spoke">
        <rect x="-1.4" y="-6.5" width="2.8" height="13" fill="#22303A" />
        <rect x="-6.5" y="-1.4" width="13" height="2.8" fill="#22303A" />
      </g>
    </g>
  );
}

export default function TruckLoader({ caption = 'Calculating your route…' }) {
  return (
    <div className="truck-loader">
      <svg className="truck-loader__ring" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(232,120,164,0.18)" strokeWidth="3" />
        <circle
          cx="50" cy="50" r="42" fill="none" stroke="#e34948" strokeWidth="3"
          strokeLinecap="round" strokeDasharray="70 190"
        />
      </svg>

      <div className="truck-loader__lines">
        <div className="truck-loader__line" style={{ top: 32 }} />
        <div className="truck-loader__line truck-loader__line--2" style={{ top: 62 }} />
        <div className="truck-loader__line truck-loader__line--3" style={{ top: 100 }} />
      </div>

      <div className="truck-loader__road" />

      <div className="truck-loader__truck">
        <svg viewBox="0 0 240 120" width="210" height="105">
          <defs>
            <linearGradient id="tl-trailer" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#F3F6F8" />
              <stop offset="1" stopColor="#C7CFD6" />
            </linearGradient>
            <linearGradient id="tl-cab" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#F7B679" />
              <stop offset="1" stopColor="#C97A2E" />
            </linearGradient>
          </defs>
          <ellipse className="truck-loader__shadow" cx="120" cy="113" rx="105" ry="6" fill="#000000" opacity="0.3" />
          <g>
            <rect x="8" y="34" width="118" height="52" rx="6" fill="url(#tl-trailer)" stroke="#9AA7B0" strokeWidth="1.5" />
            <rect x="132" y="48" width="58" height="38" rx="6" fill="url(#tl-cab)" stroke="#A85F1E" strokeWidth="1.5" />
            <polygon points="150,50 182,50 178,64 154,64" fill="#0B3D66" opacity="0.85" />
            <rect x="184" y="70" width="10" height="14" rx="2" fill="#2B2F33" />
            {WHEEL_POSITIONS.map((x) => <Wheel key={x} x={x} />)}
          </g>
        </svg>
      </div>

      <div className="truck-loader__caption">
        <span>{caption}</span>
        <span className="truck-loader__dots"><i /><i /><i /></span>
      </div>
    </div>
  );
}
