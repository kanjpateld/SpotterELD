import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Stack, Typography, Card, List, ListItemButton, ListItemText, Chip,
  Box, CircularProgress, Alert,
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { listTrips } from '../api/trips';

export default function HistoryPage() {
  const [trips, setTrips] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    listTrips()
      .then(setTrips)
      .catch(() => setError('Could not load trip history.'));
  }, []);

  return (
    <Stack spacing={3}>
      <Typography variant="h4">Trip History</Typography>

      {error && <Alert severity="error">{error}</Alert>}

      {!trips && !error && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      )}

      {trips && trips.length === 0 && (
        <Card sx={{ p: 4, textAlign: 'center' }}>
          <LocalShippingIcon sx={{ fontSize: 40, color: 'text.disabled', mb: 1 }} />
          <Typography color="text.secondary">No trips planned yet.</Typography>
        </Card>
      )}

      {trips && trips.length > 0 && (
        <Card>
          <List sx={{ py: 0 }}>
            {trips.map((trip) => (
              <ListItemButton
                key={trip.id}
                component={Link}
                to={`/history/${trip.id}`}
                divider
                sx={{
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'flex-start', sm: 'center' },
                  gap: { xs: 1, sm: 0 },
                  py: 1.5,
                }}
              >
                <ListItemText
                  primary={`${trip.pickup_location} → ${trip.dropoff_location}`}
                  secondary={`From ${trip.current_location} · ${new Date(trip.created_at).toLocaleString()}`}
                />
                {trip.summary && (
                  <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', flexShrink: 0 }}>
                    <Chip size="small" label={`${trip.summary.total_distance_miles} mi`} />
                    <Chip size="small" label={`${trip.summary.num_days} day${trip.summary.num_days === 1 ? '' : 's'}`} color="secondary" variant="outlined" />
                  </Stack>
                )}
              </ListItemButton>
            ))}
          </List>
        </Card>
      )}
    </Stack>
  );
}
