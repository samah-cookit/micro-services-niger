import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import { getProvider } from '../../data/providers';
import { getNeighborhood } from '../../data/neighborhoods';
import page from '../../styles/page.module.css';
import styles from './ProviderSearchPage.module.css';

// Correctif nécessaire : les icônes par défaut de Leaflet ne se chargent pas
// correctement avec les bundlers modernes (Vite/Webpack).
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const meIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Provisoire : en attendant l'authentification, on utilise ce prestataire
// comme étant "le compte connecté" (même ID que dans ProviderPage).
const CURRENT_PROVIDER_ID = 'p-rabiou-garba';

const NIAMEY_CENTER: [number, number] = [13.5137, 2.1098];

// Coordonnées APPROXIMATIVES des quartiers de Niamey, en attendant de vraies
// données géographiques. À ajuster/affiner si tu as des coordonnées précises.
const NEIGHBORHOOD_COORDS: Record<string, [number, number]> = {
  yantala: [13.5304, 2.0921],
  plateau: [13.529524, 2.094422],
  lazaret: [13.5225, 2.1051],
  'koira-kano': [13.4939, 2.1364],
  talladje: [13.5217, 2.0847],
  gamkalley: [13.4864, 2.1027],
  boukoki: [13.5089, 2.0875],
  wadata: [13.5074, 2.1225],
  harobanda: [13.5450, 2.0700],
  saga: [13.5350, 2.0500],
  'niamey-2000': [13.4750, 2.1150],
};

interface MarkerPoint {
  id: string;
  position: [number, number];
  label: string;
}

function ClickHandler({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function ProviderSearchPage() {
  const navigate = useNavigate();
  const [markers, setMarkers] = useState<MarkerPoint[]>([]);

  const provider = getProvider(CURRENT_PROVIDER_ID);
  const neighborhood = provider ? getNeighborhood(provider.neighborhoodId) : undefined;
  const mapCenter =
    (neighborhood && NEIGHBORHOOD_COORDS[neighborhood.id]) || NIAMEY_CENTER;

  function handleMapClick(lat: number, lng: number) {
    setMarkers((prev) => [
      ...prev,
      { id: `${lat}-${lng}-${Date.now()}`, position: [lat, lng], label: 'Demande' },
    ]);
  }

  return (
    <div className={page.page}>
      <a
        href="/provider"
        className={page.backLink}
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
      >
        <ArrowLeft size={16} aria-hidden="true" /> Retour
      </a>

      <h1 className={page.title}>Rechercher autour de moi</h1>
      {neighborhood && (
        <p className={page.subtitle}>Autour de {neighborhood.name}</p>
      )}

      <div className={styles.mapWrapper}>
        <MapContainer
          key={mapCenter.join(',')}
          center={mapCenter}
          zoom={15}
          scrollWheelZoom
          className={styles.map}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ClickHandler onMapClick={handleMapClick} />
          <Marker position={mapCenter} icon={meIcon}>
            <Popup>Vous êtes ici</Popup>
          </Marker>
          {markers.map((marker) => (
            <Marker key={marker.id} position={marker.position}>
              <Popup>{marker.label}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
