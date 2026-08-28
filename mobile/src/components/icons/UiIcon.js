// Icônes SVG utilitaires pour l'interface (boutons, badges, résultats),
// en complément des pictogrammes de contenu dans PictoIcon.js.
import Svg, { Path, Circle, Line, Polygon, G } from 'react-native-svg';

function Base({ size, children }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {children}
    </Svg>
  );
}

const ICONS = {
  play: ({ size, color }) => (
    <Base size={size}>
      <Polygon points="6,4 20,12 6,20" fill={color} />
    </Base>
  ),
  pause: ({ size, color }) => (
    <Base size={size}>
      <G fill={color}>
        <Path d="M6 4h4v16H6zM14 4h4v16h-4z" />
      </G>
    </Base>
  ),
  book: ({ size, color }) => (
    <Base size={size}>
      <Path d="M4 5.2C6 4.3 8.5 4 12 5v14.3c-3.5-1-6-.7-8 .2V5.2z" stroke={color} strokeWidth={1.7} strokeLinejoin="round" />
      <Path d="M20 5.2c-2-.9-4.5-1.2-8-.2v14.3c3.5-1 6-.7 8 .2V5.2z" stroke={color} strokeWidth={1.7} strokeLinejoin="round" />
    </Base>
  ),
  quiz: ({ size, color }) => (
    <Base size={size}>
      <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth={1.7} />
      <Path d="M9.3 9.6a2.7 2.7 0 015.2 1c0 1.7-2.5 1.9-2.5 3.7" stroke={color} strokeWidth={1.7} strokeLinecap="round" />
      <Circle cx="12" cy="17.2" r="0.9" fill={color} />
    </Base>
  ),
  check: ({ size, color }) => (
    <Base size={size}>
      <Circle cx="12" cy="12" r="9.5" stroke={color} strokeWidth={1.6} />
      <Path d="M7.5 12.3l3 3 6-6.4" stroke={color} strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" />
    </Base>
  ),
  checkFilled: ({ size, color }) => (
    <Base size={size}>
      <Circle cx="12" cy="12" r="10" fill={color} />
      <Path d="M7.5 12.3l3 3 6-6.4" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Base>
  ),
  lock: ({ size, color }) => (
    <Base size={size}>
      <Path d="M6.5 10.5V8a5.5 5.5 0 0111 0v2.5" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
      <Path d="M5.5 10.5h13a1 1 0 011 1V19a2 2 0 01-2 2h-11a2 2 0 01-2-2v-7.5a1 1 0 011-1z" stroke={color} strokeWidth={1.6} strokeLinejoin="round" />
      <Circle cx="12" cy="15" r="1.3" fill={color} />
    </Base>
  ),
  trophy: ({ size, color }) => (
    <Base size={size}>
      <Path d="M7 4.5h10v5a5 5 0 01-10 0v-5z" stroke={color} strokeWidth={1.7} strokeLinejoin="round" />
      <Path d="M7 6H4.5a1 1 0 00-1 1.2c.4 1.9 1.7 3.1 3.7 3.4M17 6h2.5a1 1 0 011 1.2c-.4 1.9-1.7 3.1-3.7 3.4" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M12 14.5v3M9 20h6M9.5 20c0-1.3.7-1.9 2.5-2s2.5.7 2.5 2" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
    </Base>
  ),
  thumbsUp: ({ size, color }) => (
    <Base size={size}>
      <Path
        d="M3 11h3.3v9H3v-9zM6.3 11l3.4-6.8c.3-.6 1-.9 1.6-.6.9.4 1.4 1.3 1.2 2.2l-.7 3.2h5.6c1.1 0 1.9 1 1.6 2.1l-1.6 6.4a2 2 0 01-1.9 1.5H6.3V11z"
        stroke={color} strokeWidth={1.5} strokeLinejoin="round"
      />
    </Base>
  ),
  settings: ({ size, color }) => (
    <Base size={size}>
      <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth={1.6} />
      <Path
        d="M12 3.5v2M12 18.5v2M20.5 12h-2M5.5 12h-2M17.7 6.3l-1.4 1.4M7.7 16.3l-1.4 1.4M17.7 17.7l-1.4-1.4M7.7 7.7L6.3 6.3"
        stroke={color} strokeWidth={1.5} strokeLinecap="round"
      />
    </Base>
  ),
  speaker: ({ size, color }) => (
    <Base size={size}>
      <Path d="M4 9.5h3.2L11 6v12l-3.8-3.5H4v-5z" stroke={color} strokeWidth={1.6} strokeLinejoin="round" />
      <Path d="M14.5 9c1 .8 1.6 1.9 1.6 3s-.6 2.2-1.6 3" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M17 6.8c1.8 1.3 2.9 3.2 2.9 5.2s-1.1 3.9-2.9 5.2" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Base>
  ),
  chatBubble: ({ size, color }) => (
    <Base size={size}>
      <Path
        d="M3.5 5.5h13a1 1 0 011 1V13a1 1 0 01-1 1H10l-3.6 3.2V14H3.5a1 1 0 01-1-1V6.5a1 1 0 011-1z"
        stroke={color} strokeWidth={1.6} strokeLinejoin="round"
      />
    </Base>
  ),
  offline: ({ size, color }) => (
    <Base size={size}>
      <Path d="M4 9.5a12 12 0 0116 0" stroke={color} strokeWidth={1.6} strokeLinecap="round" opacity={0.4} />
      <Path d="M7 12.8a7.5 7.5 0 0110 0" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
      <Path d="M9.7 16.1a3.6 3.6 0 014.6 0" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
      <Circle cx="12" cy="19" r="1.1" fill={color} />
    </Base>
  ),
  seedling: ({ size, color }) => (
    <Base size={size}>
      <Path d="M12 21V11" stroke={color} strokeWidth={1.7} strokeLinecap="round" />
      <Path d="M12 12c0-3.5-2.7-6-6.5-6C5.7 9.8 8.4 12 12 12z" stroke={color} strokeWidth={1.6} strokeLinejoin="round" />
      <Path d="M12 10c0-3 2.3-5.2 5.5-5.2C17.3 8 15 10 12 10z" stroke={color} strokeWidth={1.6} strokeLinejoin="round" />
    </Base>
  ),
};

export default function UiIcon({ name, size = 20, color = '#1c2733' }) {
  const Renderer = ICONS[name];
  if (!Renderer) return null;
  return <Renderer size={size} color={color} />;
}
