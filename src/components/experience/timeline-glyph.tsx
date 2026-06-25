export function TimelineGlyph() {
  return (
    <span
      className="relative grid size-16 shrink-0 place-items-center overflow-hidden rounded-full"
      aria-hidden="true"
    >
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="100"
          cy="100"
          fill="none"
          r="80"
          stroke="#10B981"
          strokeDasharray="20 10"
          strokeWidth="4"
        >
          <animateTransform
            attributeName="transform"
            dur="10s"
            from="0 100 100"
            repeatCount="indefinite"
            to="360 100 100"
            type="rotate"
          />
        </circle>
        <circle cx="100" cy="100" fill="#10B981" opacity="0.2" r="40">
          <animate
            attributeName="r"
            dur="3s"
            repeatCount="indefinite"
            values="35;45;35"
          />
          <animate
            attributeName="opacity"
            dur="3s"
            repeatCount="indefinite"
            values="0.2;0.5;0.2"
          />
        </circle>
        <rect fill="#10B981" height="50" rx="4" width="50" x="75" y="75">
          <animateTransform
            attributeName="transform"
            dur="5s"
            from="0 100 100"
            repeatCount="indefinite"
            to="-360 100 100"
            type="rotate"
          />
          <animate
            attributeName="opacity"
            dur="2s"
            repeatCount="indefinite"
            values="0.8;1;0.8"
          />
        </rect>
        <circle cx="60" cy="60" fill="#10B981" r="3">
          <animate
            attributeName="cy"
            dur="4s"
            repeatCount="indefinite"
            values="60;40;60"
          />
          <animate
            attributeName="opacity"
            dur="4s"
            repeatCount="indefinite"
            values="0;1;0"
          />
        </circle>
        <circle cx="140" cy="140" fill="#10B981" r="3">
          <animate
            attributeName="cy"
            dur="5s"
            repeatCount="indefinite"
            values="140;160;140"
          />
          <animate
            attributeName="opacity"
            dur="5s"
            repeatCount="indefinite"
            values="0;1;0"
          />
        </circle>
      </svg>
    </span>
  );
}
