// Système d'icônes SVG remplaçant les émojis utilisés pour illustrer
// les modules, sous-modules et pictogrammes du programme RACINES.
// Style : traits arrondis, épaisseur constante, cohérent sur toute l'app.
import Svg, { Path, Circle, Line, Rect, G, Polygon } from 'react-native-svg';

const STROKE = 1.8;

function Base({ size, children }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {children}
    </Svg>
  );
}

// --- Définitions individuelles ------------------------------------------

const ICONS = {
  'cœur': ({ size, color }) => (
    <Base size={size}>
      <Path
        d="M12 20.5s-7.5-4.6-9.7-9.2C.9 8.1 2.3 4.8 5.6 4.1c1.9-.4 3.8.4 5 1.9 1.2-1.5 3.1-2.3 5-1.9 3.3.7 4.7 4 3.3 7.2C19.5 15.9 12 20.5 12 20.5z"
        stroke={color} strokeWidth={STROKE} strokeLinejoin="round"
      />
    </Base>
  ),
  'cœur apaisé': ({ size, color }) => (
    <Base size={size}>
      <Path
        d="M12 19.5s-6.8-4.2-8.8-8.3C1.6 8 2.9 5 5.9 4.4c1.7-.3 3.4.4 4.5 1.7 1.1-1.3 2.8-2 4.5-1.7 3 .6 4.3 3.6 2.7 6.8-2 4.1-8.8 8.3-8.8 8.3z"
        stroke={color} strokeWidth={STROKE} strokeLinejoin="round"
      />
      <Path d="M4.5 13c2 .6 4-.4 5-2" stroke={color} strokeWidth={1.3} strokeLinecap="round" />
    </Base>
  ),
  'balance': ({ size, color }) => (
    <Base size={size}>
      <Line x1="12" y1="3" x2="12" y2="19" stroke={color} strokeWidth={STROKE} strokeLinecap="round" />
      <Line x1="4" y1="7" x2="20" y2="7" stroke={color} strokeWidth={STROKE} strokeLinecap="round" />
      <Path d="M4 7L1.5 12.5a2.7 2.7 0 005 0L4 7z" stroke={color} strokeWidth={1.4} strokeLinejoin="round" />
      <Path d="M20 7l-2.5 5.5a2.7 2.7 0 005 0L20 7z" stroke={color} strokeWidth={1.4} strokeLinejoin="round" />
      <Line x1="8" y1="20.5" x2="16" y2="20.5" stroke={color} strokeWidth={STROKE} strokeLinecap="round" />
    </Base>
  ),
  'balance budgétaire': ({ size, color }) => (
    <Base size={size}>
      <Line x1="12" y1="3" x2="12" y2="19" stroke={color} strokeWidth={STROKE} strokeLinecap="round" />
      <Line x1="4" y1="7" x2="20" y2="7" stroke={color} strokeWidth={STROKE} strokeLinecap="round" />
      <Path d="M4 7L1.5 12.5a2.7 2.7 0 005 0L4 7z" stroke={color} strokeWidth={1.4} strokeLinejoin="round" />
      <Path d="M20 7l-2.5 5.5a2.7 2.7 0 005 0L20 7z" stroke={color} strokeWidth={1.4} strokeLinejoin="round" />
      <Circle cx="12" cy="7" r="1.6" stroke={color} strokeWidth={1.3} />
      <Line x1="8" y1="20.5" x2="16" y2="20.5" stroke={color} strokeWidth={STROKE} strokeLinecap="round" />
    </Base>
  ),
  'famille': ({ size, color }) => (
    <Base size={size}>
      <Circle cx="7.5" cy="6.5" r="2.3" stroke={color} strokeWidth={STROKE} />
      <Circle cx="16.5" cy="6.5" r="2.3" stroke={color} strokeWidth={STROKE} />
      <Circle cx="12" cy="14.5" r="1.7" stroke={color} strokeWidth={1.5} />
      <Path d="M2.8 19.5c.4-2.8 2.3-4.5 4.7-4.5s4.1 1.6 4.6 4" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M12 19.8c.4-2 1.9-3.2 3.9-3.2s3.7 1.4 4.1 3.6" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Base>
  ),
  'main tendue': ({ size, color }) => (
    <Base size={size}>
      <Path
        d="M3 13.5l3.3 3.2c.5.5 1.2.8 1.9.8h6.6c1 0 1.9-.6 2.3-1.5l3-6.6c.4-.9-.3-1.9-1.3-1.8-.6.1-1.1.5-1.4 1l-2 3.6"
        stroke={color} strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round"
      />
      <Path d="M9 8.3V5.6a1.6 1.6 0 013.2 0v5.1" stroke={color} strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M12.2 10.6V4.9a1.6 1.6 0 013.2 0v6.4" stroke={color} strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round" />
    </Base>
  ),
  'village/maison': ({ size, color }) => (
    <Base size={size}>
      <Path d="M4 11l8-6.5L20 11" stroke={color} strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M6 10v9h12v-9" stroke={color} strokeWidth={STROKE} strokeLinejoin="round" />
      <Rect x="10" y="14" width="4" height="5" stroke={color} strokeWidth={1.4} />
      <Path d="M2.5 12.5L4 11" stroke={color} strokeWidth={STROKE} strokeLinecap="round" />
      <Path d="M21.5 12.5L20 11" stroke={color} strokeWidth={STROKE} strokeLinecap="round" />
    </Base>
  ),
  'groupe de personnes': ({ size, color }) => (
    <Base size={size}>
      <Circle cx="8.5" cy="8" r="2.4" stroke={color} strokeWidth={STROKE} />
      <Circle cx="16" cy="9" r="2" stroke={color} strokeWidth={1.5} />
      <Path d="M3 19c.4-3 2.5-4.8 5.5-4.8s5 1.9 5.4 4.6" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M14.6 19c.3-2.2 1.7-3.6 3.8-3.6 1.9 0 3.3 1.2 3.7 3.3" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
    </Base>
  ),
  'bouclier': ({ size, color }) => (
    <Base size={size}>
      <Path
        d="M12 3l7 2.5v5.3c0 4.6-2.9 7.9-7 9.7-4.1-1.8-7-5.1-7-9.7V5.5L12 3z"
        stroke={color} strokeWidth={STROKE} strokeLinejoin="round"
      />
      <Path d="M9 12.2l2 2 4-4.2" stroke={color} strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round" />
    </Base>
  ),
  'cerveau': ({ size, color }) => (
    <Base size={size}>
      <Path
        d="M9.5 4.2c-2.1 0-3.8 1.6-3.9 3.6C4.2 8.3 3.3 9.7 3.3 11.3c0 1.2.5 2.3 1.4 3-.2.5-.3 1-.3 1.6 0 2.1 1.8 3.9 4 3.9.4 0 .8-.1 1.1-.2.4.9 1.3 1.5 2.4 1.5v-17c-.7-.6-1.5-.9-2.4-.9z"
        stroke={color} strokeWidth={1.5} strokeLinejoin="round"
      />
      <Path
        d="M14.5 4.2c2.1 0 3.8 1.6 3.9 3.6 1.4.5 2.3 1.9 2.3 3.5 0 1.2-.5 2.3-1.4 3 .2.5.3 1 .3 1.6 0 2.1-1.8 3.9-4 3.9-.4 0-.8-.1-1.1-.2-.4.9-1.3 1.5-2.4 1.5v-17c.7-.6 1.5-.9 2.4-.9z"
        stroke={color} strokeWidth={1.5} strokeLinejoin="round"
      />
    </Base>
  ),
  'parent et enfant': ({ size, color }) => (
    <Base size={size}>
      <Circle cx="8" cy="6.2" r="2.4" stroke={color} strokeWidth={STROKE} />
      <Circle cx="17" cy="10.2" r="1.7" stroke={color} strokeWidth={1.5} />
      <Path d="M3.2 19.5c.4-3.2 2.3-5.2 4.9-5.2 2.3 0 4 1.5 4.6 3.8" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M13 19.5c.3-2.2 1.7-3.6 3.9-3.6 1.9 0 3.3 1.2 3.7 3.3" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
      <Path d="M11.3 15.8L14 13.8" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
    </Base>
  ),
  'étoile': ({ size, color }) => (
    <Base size={size}>
      <Polygon
        points="12,3.2 14.6,9.2 21,9.8 16.2,14 17.6,20.4 12,17 6.4,20.4 7.8,14 3,9.8 9.4,9.2"
        stroke={color} strokeWidth={1.4} strokeLinejoin="round"
      />
    </Base>
  ),
  'bébé': ({ size, color }) => (
    <Base size={size}>
      <Circle cx="12" cy="9.5" r="5.2" stroke={color} strokeWidth={STROKE} />
      <Path d="M9 9.3c0-.6.5-1 1-1M14 9.3c0-.6.5-1 1-1" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
      <Path d="M9.5 12c.8.7 1.7 1 2.5 1s1.7-.3 2.5-1" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
      <Path d="M8.3 5.2c.6-1 1.9-1.7 3.7-1.7s3.1.7 3.7 1.7" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
      <Path d="M7 20.5c.6-2.5 2.5-3.8 5-3.8s4.4 1.3 5 3.8" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Base>
  ),
  'biberon/sein': ({ size, color }) => (
    <Base size={size}>
      <Rect x="8.5" y="8.5" width="7" height="11" rx="2.2" stroke={color} strokeWidth={STROKE} />
      <Line x1="8.5" y1="12" x2="15.5" y2="12" stroke={color} strokeWidth={1.4} />
      <Line x1="10.3" y1="9.8" x2="10.3" y2="11.3" stroke={color} strokeWidth={1.2} />
      <Line x1="12" y1="9.8" x2="12" y2="11.3" stroke={color} strokeWidth={1.2} />
      <Line x1="13.7" y1="9.8" x2="13.7" y2="11.3" stroke={color} strokeWidth={1.2} />
      <Path d="M10 8.5V6.8c0-.9.9-1.6 2-1.6s2 .7 2 1.6v1.7" stroke={color} strokeWidth={1.5} strokeLinejoin="round" />
    </Base>
  ),
  'seringue': ({ size, color }) => (
    <Base size={size}>
      <Line x1="4" y1="20" x2="9" y2="15" stroke={color} strokeWidth={STROKE} strokeLinecap="round" />
      <Rect x="8.2" y="8.4" width="10" height="4.4" rx="1" transform="rotate(45 8.2 8.4)" stroke={color} strokeWidth={1.5} />
      <Line x1="17" y1="4.5" x2="19.5" y2="7" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
      <Line x1="14.7" y1="6.8" x2="16.3" y2="8.4" stroke={color} strokeWidth={1.3} strokeLinecap="round" />
      <Line x1="12.6" y1="8.9" x2="14.2" y2="10.5" stroke={color} strokeWidth={1.3} strokeLinecap="round" />
    </Base>
  ),
  'moustiquaire': ({ size, color }) => (
    <Base size={size}>
      <Path d="M12 3v3" stroke={color} strokeWidth={STROKE} strokeLinecap="round" />
      <Path d="M6 20V9a6 6 0 0112 0v11" stroke={color} strokeWidth={STROKE} strokeLinejoin="round" />
      <Line x1="4.5" y1="20" x2="19.5" y2="20" stroke={color} strokeWidth={STROKE} strokeLinecap="round" />
      <Line x1="7.5" y1="12" x2="16.5" y2="12" stroke={color} strokeWidth={1} strokeDasharray="1.6,1.6" />
      <Line x1="7.5" y1="16" x2="16.5" y2="16" stroke={color} strokeWidth={1} strokeDasharray="1.6,1.6" />
    </Base>
  ),
  'bulle de dialogue': ({ size, color }) => (
    <Base size={size}>
      <Path
        d="M4 5.5h16a1 1 0 011 1V15a1 1 0 01-1 1H10l-4.5 4V16H4a1 1 0 01-1-1V6.5a1 1 0 011-1z"
        stroke={color} strokeWidth={STROKE} strokeLinejoin="round"
      />
      <Line x1="7" y1="9.5" x2="17" y2="9.5" stroke={color} strokeWidth={1.3} strokeLinecap="round" />
      <Line x1="7" y1="12.5" x2="14" y2="12.5" stroke={color} strokeWidth={1.3} strokeLinecap="round" />
    </Base>
  ),
  'bulle de dialogue double': ({ size, color }) => (
    <Base size={size}>
      <Path d="M2.5 4.5h11a1 1 0 011 1v6a1 1 0 01-1 1h-6l-3 2.6V12.5h-2a1 1 0 01-1-1v-6a1 1 0 011-1z" stroke={color} strokeWidth={1.5} strokeLinejoin="round" />
      <Path d="M10.2 10.7h9.3a1 1 0 011 1v5.4a1 1 0 01-1 1h-1.4v3l-3.5-3H10.2a1 1 0 01-1-1v-5.4a1 1 0 011-1z" stroke={color} strokeWidth={1.5} strokeLinejoin="round" />
    </Base>
  ),
  'oreille': ({ size, color }) => (
    <Base size={size}>
      <Path
        d="M13 3.5c3.5.3 6 3.3 6 7 0 2.6-1.6 4.2-3.4 5.7-1.1.9-1.6 1.6-1.6 2.8a2.5 2.5 0 01-5 0"
        stroke={color} strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round"
      />
      <Path d="M12.5 7.3a3.3 3.3 0 013.3 3.5c0 1.6-1 2.4-2 3.2" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
    </Base>
  ),
  'enfant qui parle': ({ size, color }) => (
    <Base size={size}>
      <Circle cx="9.5" cy="8" r="3.6" stroke={color} strokeWidth={STROKE} />
      <Path d="M4.5 20c.4-3 2.4-4.9 5-4.9s4.4 1.7 4.9 4.4" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M15.5 6.5h5.2a.9.9 0 01.9.9v3.4a.9.9 0 01-.9.9h-1v2.4l-2.4-2.4h-1.8a.9.9 0 01-.9-.9V7.4a.9.9 0 01.9-.9z" stroke={color} strokeWidth={1.4} strokeLinejoin="round" />
    </Base>
  ),
  'main levée barrée': ({ size, color }) => (
    <Base size={size}>
      <Path
        d="M9 12.5V5.6a1.5 1.5 0 013 0v5.6M12 11V4.4a1.5 1.5 0 013 0v6.9M15 11.6V6.6a1.5 1.5 0 013 0v7.6c0 3.5-2.4 6.3-6.3 6.3-2 0-3.3-.7-4.4-2.1L4 14.8c-.6-.8-.4-1.9.5-2.4.7-.4 1.5-.2 2 .4l1.5 1.8"
        stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
      />
      <Line x1="3" y1="3" x2="21" y2="21" stroke={color} strokeWidth={STROKE} strokeLinecap="round" />
    </Base>
  ),
  'règle/livre': ({ size, color }) => (
    <Base size={size}>
      <Path d="M4 5.2C6 4.3 8.5 4 12 5v14.3c-3.5-1-6-.7-8 .2V5.2z" stroke={color} strokeWidth={STROKE} strokeLinejoin="round" />
      <Path d="M20 5.2c-2-.9-4.5-1.2-8-.2v14.3c3.5-1 6-.7 8 .2V5.2z" stroke={color} strokeWidth={STROKE} strokeLinejoin="round" />
    </Base>
  ),
  'main stop': ({ size, color }) => (
    <Base size={size}>
      <Path
        d="M8 12.5V5.6a1.5 1.5 0 013 0v5.6M11 11V4.4a1.5 1.5 0 013 0v6.9M14 11.6V6.6a1.5 1.5 0 013 0v7.6c0 3.5-2.4 6.3-6.3 6.3-2 0-3.3-.7-4.4-2.1L3.5 15c-.6-.8-.4-1.9.5-2.4.7-.4 1.5-.2 2 .4l1.5 1.8"
        stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
      />
    </Base>
  ),
  'carte du Cameroun': ({ size, color }) => (
    <Base size={size}>
      <Path
        d="M6 4.5l3.5 1.2 2-1.4 3 1 3.5 2.4-.8 3 1.3 2.4-1.6 3-.4 3.4-2.5 1.6-2.8-.6-2.3 1.5-3-1-1-3 1-2.6-1.6-2.4.7-2.9L6 4.5z"
        stroke={color} strokeWidth={1.4} strokeLinejoin="round"
      />
      <Circle cx="12" cy="12" r="1.3" stroke={color} strokeWidth={1.2} />
    </Base>
  ),
  "téléphone d'aide": ({ size, color }) => (
    <Base size={size}>
      <Path
        d="M6.6 3.8l2.6.6c.6.1 1 .7.9 1.3l-.5 2.3c-.1.5-.5.9-1 1-.3.9-.1 2 .6 3.1a7.7 7.7 0 004.2 3c.6.2 1.2 0 1.6-.4l1.4-1.7c.4-.4 1-.5 1.5-.3l2.1 1.1c.6.3.8 1 .5 1.6l-1 2c-.4.8-1.2 1.3-2.1 1.2-3.6-.4-6.9-2.1-9.3-4.8C5.6 10.9 4 7.5 3.9 3.9c0-.9.6-1.7 1.4-2l1.3-.1z"
        stroke={color} strokeWidth={1.4} strokeLinejoin="round"
      />
      <Path d="M14 3.5c2.5.3 4.4 2.2 4.7 4.7" stroke={color} strokeWidth={1.2} strokeLinecap="round" />
      <Path d="M14.5 6.4c1.2.2 2.1 1.1 2.3 2.3" stroke={color} strokeWidth={1.1} strokeLinecap="round" />
    </Base>
  ),
  'adolescent': ({ size, color }) => (
    <Base size={size}>
      <Circle cx="12" cy="7" r="3.4" stroke={color} strokeWidth={STROKE} />
      <Path d="M5.5 20.5c.5-4 3-6.3 6.5-6.3s6 2.3 6.5 6.3" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
      <Line x1="12" y1="14.4" x2="12" y2="18.5" stroke={color} strokeWidth={1.3} strokeLinecap="round" />
    </Base>
  ),
  'chemin/étapes': ({ size, color }) => (
    <Base size={size}>
      <Circle cx="4.5" cy="19" r="1.6" stroke={color} strokeWidth={1.4} />
      <Circle cx="11" cy="13" r="1.6" stroke={color} strokeWidth={1.4} />
      <Circle cx="17.5" cy="7" r="1.6" stroke={color} strokeWidth={1.4} />
      <Path d="M6 17.7L9.6 14.3M12.6 11.7L16 8.4" stroke={color} strokeWidth={1.4} strokeLinecap="round" strokeDasharray="0.1,3.2" />
      <Path d="M17.5 3.5v2M20 5l-1.7 1.2" stroke={color} strokeWidth={1.2} strokeLinecap="round" />
    </Base>
  ),
  'pièces de monnaie': ({ size, color }) => (
    <Base size={size}>
      <Circle cx="9" cy="10" r="5.3" stroke={color} strokeWidth={STROKE} />
      <Circle cx="15" cy="15.5" r="5.3" stroke={color} strokeWidth={STROKE} />
      <Path d="M9 8v4M7.3 10h3.4" stroke={color} strokeWidth={1.2} strokeLinecap="round" />
      <Path d="M15 13.5v4M13.3 15.5h3.4" stroke={color} strokeWidth={1.2} strokeLinecap="round" />
    </Base>
  ),
  'calendrier': ({ size, color }) => (
    <Base size={size}>
      <Rect x="3.5" y="5.5" width="17" height="15" rx="2" stroke={color} strokeWidth={STROKE} />
      <Line x1="3.5" y1="9.8" x2="20.5" y2="9.8" stroke={color} strokeWidth={STROKE} />
      <Line x1="8" y1="3.5" x2="8" y2="7.2" stroke={color} strokeWidth={STROKE} strokeLinecap="round" />
      <Line x1="16" y1="3.5" x2="16" y2="7.2" stroke={color} strokeWidth={STROKE} strokeLinecap="round" />
      <Circle cx="8.2" cy="14" r="1" fill={color} />
      <Circle cx="12" cy="14" r="1" fill={color} />
      <Circle cx="15.8" cy="14" r="1" fill={color} />
      <Circle cx="8.2" cy="17.2" r="1" fill={color} />
      <Circle cx="12" cy="17.2" r="1" fill={color} />
    </Base>
  ),
  'respiration/vague': ({ size, color }) => (
    <Base size={size}>
      <Path d="M2.5 9c1.5-1.6 3-1.6 4.5 0s3 1.6 4.5 0 3-1.6 4.5 0 3 1.6 4.5 0" stroke={color} strokeWidth={STROKE} strokeLinecap="round" />
      <Path d="M2.5 14.5c1.5-1.6 3-1.6 4.5 0s3 1.6 4.5 0 3-1.6 4.5 0 3 1.6 4.5 0" stroke={color} strokeWidth={STROKE} strokeLinecap="round" />
      <Path d="M2.5 20c1.5-1.6 3-1.6 4.5 0s3 1.6 4.5 0 3-1.6 4.5 0 3 1.6 4.5 0" stroke={color} strokeWidth={1.3} strokeLinecap="round" opacity={0.5} />
    </Base>
  ),
  'soleil': ({ size, color }) => (
    <Base size={size}>
      <Circle cx="12" cy="12" r="4.3" stroke={color} strokeWidth={STROKE} />
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
  'parent souriant': ({ size, color }) => (
    <Base size={size}>
      <Circle cx="12" cy="10" r="5.4" stroke={color} strokeWidth={STROKE} />
      <Path d="M9 9.6c0-.5.4-.9.9-.9M14.1 9.6c0-.5.4-.9.9-.9" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
      <Path d="M8.8 12c.9.9 2 1.4 3.2 1.4s2.3-.5 3.2-1.4" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M6.5 21c.7-3 3-4.7 5.5-4.7s4.8 1.7 5.5 4.7" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
    </Base>
  ),
};

const FALLBACK = ({ size, color }) => (
  <Base size={size}>
    <Circle cx="12" cy="12" r="8" stroke={color} strokeWidth={STROKE} />
    <Path d="M12 8v5" stroke={color} strokeWidth={STROKE} strokeLinecap="round" />
    <Circle cx="12" cy="16" r="0.9" fill={color} />
  </Base>
);

/**
 * <PictoIcon name="cœur" size={28} color="#1c6b3f" />
 * Rend l'icône SVG correspondant à une clé de pictogramme du programme.
 * Retombe sur une icône générique si la clé est inconnue.
 */
export default function PictoIcon({ name, size = 24, color = '#1c2733' }) {
  const Renderer = ICONS[name] || FALLBACK;
  return <Renderer size={size} color={color} />;
}

export const PICTO_ICON_KEYS = Object.keys(ICONS);
