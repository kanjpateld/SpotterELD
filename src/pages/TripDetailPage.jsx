import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Stack, Typography, Box, CircularProgress, Alert, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TripResult from '../components/TripResult';
import { getTrip } from '../api/trips';

export default function TripDetailPage() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setTrip(null);
    setError('');
    getTrip(id)
      .then(setTrip)
      .catch(() => setError('Could not load this trip.'));
  }, [id]);

  return (
    <Stack spacing={3}>
      <Box>
        <Button component={Link} to="/history" startIcon={<ArrowBackIcon />} sx={{ mb: 1 }}>
          Back to history
        </Button>
        <Typography variant="h4">
          {trip ? `${trip.pickup_location} → ${trip.dropoff_location}` : 'Trip Details'}
        </Typography>
      </Box>

      {error && <Alert severity="error">{error}</Alert>}
      {!trip && !error && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      )}
      {trip && <TripResult result={trip.result} />}
    </Stack>
  );
}
