import { useState } from 'react';
import { Stack, Typography, Card, CardContent } from '@mui/material';
import TripForm from '../components/TripForm';
import TripResult from '../components/TripResult';
import TruckLoader from '../components/TruckLoader';
import { planTrip } from '../api/trips';

export default function PlanTripPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [trip, setTrip] = useState(null);

  const handleSubmit = async (payload) => {
    setLoading(true);
    setError('');
    setTrip(null);
    try {
      const created = await planTrip(payload);
      setTrip(created);
    } catch (err) {
      setError(
        err.response?.data?.detail
        || err.response?.data?.current_cycle_used?.[0]
        || 'Something went wrong while planning this trip. Please check the locations and try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h4">Plan a Trip</Typography>
      <TripForm onSubmit={handleSubmit} loading={loading} error={error} />
      {loading && (
        <Card>
          <CardContent>
            <TruckLoader caption="Mapping stops & rest breaks…" />
          </CardContent>
        </Card>
      )}
      {trip && <TripResult result={trip.result} />}
    </Stack>
  );
}
