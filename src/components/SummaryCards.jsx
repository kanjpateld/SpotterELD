import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import RouteIcon from '@mui/icons-material/Route';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';

function StatTile({ icon, label, value, accentColor }) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            width: 48, height: 48, borderRadius: 2, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            bgcolor: `${accentColor}1A`, color: accentColor, flexShrink: 0,
          }}
        >
          {icon}
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="body2" color="text.secondary" noWrap>{label}</Typography>
          <Typography variant="h6" sx={{ fontWeight: 700 }} noWrap>{value}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function SummaryCards({ summary }) {
  if (!summary) return null;

  const tiles = [
    {
      icon: <RouteIcon />,
      label: 'Total Distance',
      value: `${summary.total_distance_miles.toLocaleString()} mi`,
      accentColor: '#0B3D66',
    },
    {
      icon: <AccessTimeIcon />,
      label: 'Driving Time',
      value: `${summary.total_driving_hours} hrs`,
      accentColor: '#F2994A',
    },
    {
      icon: <CalendarMonthIcon />,
      label: 'Trip Length',
      value: `${summary.num_days} day${summary.num_days === 1 ? '' : 's'}`,
      accentColor: '#0F9D8F',
    },
    {
      icon: <LocalGasStationIcon />,
      label: 'Fuel / Rest Stops',
      value: `${summary.num_fuel_stops} / ${summary.num_rest_stops}`,
      accentColor: '#8E24AA',
    },
  ];

  return (
    <Grid container spacing={2}>
      {tiles.map((tile) => (
        <Grid key={tile.label} size={{ xs: 12, sm: 6, md: 3 }}>
          <StatTile {...tile} />
        </Grid>
      ))}
    </Grid>
  );
}
