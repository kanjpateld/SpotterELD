import { useMemo } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Box, Card, CardHeader, Chip, Stack } from '@mui/material';
import 'leaflet/dist/leaflet.css';
import { STOP_COLORS } from './StopsTimeline';

const STOP_LABELS = {
  pickup: 'Pickup',
  dropoff: 'Drop-off',
  fuel: 'Fuel',
  rest_10hr: '10-Hr Rest',
  restart_34hr: '34-Hr Restart',
  break_30min: '30-Min Break',
};

function dotIcon(color, size = 14) {
  return L.divIcon({
    className: '',
    html: `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 0 0 1px rgba(0,0,0,0.25);"></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function FitBounds({ positions }) {
  const map = useMap();
  useMemo(() => {
    if (positions.length > 1) {
      map.fitBounds(positions, { padding: [40, 40] });
    }
  }, [positions, map]);
  return null;
}

export default function RouteMap({ route, stops }) {
  const positions = route?.geometry ?? [];
  const waypoints = route?.waypoints ?? [];

  const center = positions.length ? positions[Math.floor(positions.length / 2)] : [39.8, -98.5];

  return (
    <Card>
      <CardHeader
        title="Route Map"
        subheader={`${route?.distance_miles ?? 0} miles · ${(route?.duration_hours ?? 0).toFixed(1)} hrs driving`}
      />
      <Stack direction="row" spacing={1} sx={{ px: 2, pb: 1.5, flexWrap: 'wrap', gap: 0.75 }}>
        {Object.entries(STOP_LABELS).map(([key, label]) => (
          <Chip
            key={key}
            size="small"
            label={label}
            sx={{ bgcolor: STOP_COLORS[key], color: '#fff' }}
          />
        ))}
      </Stack>
      <Box sx={{ height: { xs: 320, sm: 400, md: 460 }, width: '100%' }}>
        <MapContainer center={center} zoom={5} style={{ height: '100%', width: '100%' }} scrollWheelZoom>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {positions.length > 1 && <Polyline positions={positions} pathOptions={{ color: '#0B3D66', weight: 4, opacity: 0.85 }} />}
          <FitBounds positions={positions} />

          {waypoints.map((wp, idx) => (
            <Marker key={`wp-${idx}`} position={[wp.lat, wp.lon]} icon={dotIcon('#16232E', 18)}>
              <Popup>
                <strong>{wp.label}</strong>
                <br />
                {wp.address}
              </Popup>
            </Marker>
          ))}

          {(stops ?? [])
            .filter((s) => s.lat != null && s.lon != null)
            .map((s, idx) => (
              <Marker key={`stop-${idx}`} position={[s.lat, s.lon]} icon={dotIcon(STOP_COLORS[s.type] ?? '#666', 12)}>
                <Popup>
                  <strong>{STOP_LABELS[s.type] ?? s.label}</strong>
                  <br />
                  {s.location}
                  <br />
                  {new Date(s.arrival).toLocaleString()} &rarr; {new Date(s.departure).toLocaleString()}
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </Box>
    </Card>
  );
}
