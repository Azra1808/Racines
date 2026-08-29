// Icônes SVG utilitaires pour l'interface (boutons, badges, résultats),
// en complément des pictogrammes de contenu dans PictoIcon.js.
import Svg, { Path, Circle, Line, Polygon, G, Rect } from 'react-native-svg';

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
  arrowLeft: ({ size, color }) => (
    <Base size={size}>
      <Path d="M19 12H5M11 6l-6 6 6 6" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Base>
  ),
  arrowRight: ({ size, color }) => (
    <Base size={size}>
      <Path d="M5 12h14M13 6l6 6-6 6" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Base>
  ),
  send: ({ size, color }) => (
    <Base size={size}>
      <Path d="M4 12l16-7.5-6.2 16-2.6-6.9L4 12z" stroke={color} strokeWidth={1.6} strokeLinejoin="round" strokeLinecap="round" fill={color} fillOpacity={0.12} />
    </Base>
  ),
  mail: ({ size, color }) => (
    <Base size={size}>
      <Path d="M4 6.5h16a1 1 0 011 1V17a1 1 0 01-1 1H4a1 1 0 01-1-1V7.5a1 1 0 011-1z" stroke={color} strokeWidth={1.6} strokeLinejoin="round" />
      <Path d="M3.5 7.2L12 13l8.5-5.8" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
    </Base>
  ),
  call: ({ size, color }) => (
    <Base size={size}>
      <Path
        d="M6.6 3.8l2.6.6c.6.1 1 .7.9 1.3l-.5 2.3c-.1.5-.5.9-1 1-.3.9-.1 2 .6 3.1a7.7 7.7 0 004.2 3c.6.2 1.2 0 1.6-.4l1.4-1.7c.4-.4 1-.5 1.5-.3l2.1 1.1c.6.3.8 1 .5 1.6l-1 2c-.4.8-1.2 1.3-2.1 1.2-3.6-.4-6.9-2.1-9.3-4.8C5.6 10.9 4 7.5 3.9 3.9c0-.9.6-1.7 1.4-2l1.3-.1z"
        stroke={color} strokeWidth={1.5} strokeLinejoin="round"
      />
    </Base>
  ),
  noSignal: ({ size, color }) => (
    <Base size={size}>
      <Path d="M4 18h1.6v-4H4v4zM8 18h1.6V11H8v7zM12 18h1.6V8H12v10zM16 18h1.6V5H16v13z" fill={color} />
      <Line x1="3" y1="3" x2="21" y2="21" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Base>
  ),
  sun: ({ size, color }) => (
    <Base size={size}>
      <Circle cx="12" cy="12" r="4.3" stroke={color} strokeWidth={1.7} />
      <G stroke={color} strokeWidth={1.5} strokeLinecap="round">
        <Line x1="12" y1="2.3" x2="12" y2="4.6" />
        <Line x1="12" y1="19.4" x2="12" y2="21.7" />
        <Line x1="2.3" y1="12" x2="4.6" y2="12" />
        <Line x1="19.4" y1="12" x2="21.7" y2="12" />
        <Line x1="5" y1="5" x2="6.6" y2="6.6" />
        <Line x1="17.4" y1="17.4" x2="19" y2="19" />
        <Line x1="19" y1="5" x2="17.4" y2="6.6" />
        <Line x1="6.6" y1="17.4" x2="5" y2="19" />
      </G>
    </Base>
  ),
  moon: ({ size, color }) => (
    <Base size={size}>
      <Path d="M19.5 14.5a8 8 0 11-9-11 6.5 6.5 0 009 11z" stroke={color} strokeWidth={1.6} strokeLinejoin="round" />
    </Base>
  ),
  image: ({ size, color }) => (
    <Base size={size}>
      <Rect x="3.5" y="4.5" width="17" height="15" rx="2" stroke={color} strokeWidth={1.6} />
      <Circle cx="8.5" cy="9.5" r="1.6" stroke={color} strokeWidth={1.4} />
      <Path d="M4 16.5l5-4.5 3.5 3 3-2.7L20 16" stroke={color} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
    </Base>
  ),
  celebrate: ({ size, color }) => (
    <Base size={size}>
      <Path d="M4.5 19.5L14 8l1.5 1.5L6 20l-1.5-.5z" stroke={color} strokeWidth={1.5} strokeLinejoin="round" />
      <Path d="M13 5.5l1.2 1.2M16.5 4l.6 1.7 1.7.6-1.7.6-.6 1.7-.6-1.7-1.7-.6 1.7-.6.6-1.7zM20 9l1 1" stroke={color} strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" />
    </Base>
  ),
};

export default function UiIcon({ name, size = 20, color = '#1c2733' }) {
  const Renderer = ICONS[name];
  if (!Renderer) return null;
  return <Renderer size={size} color={color} />;
}
