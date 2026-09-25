import { useState } from 'react';
import {
  Card, CardContent, CardHeader, TextField, Grid, Button, Box,
  InputAdornment, Alert, CircularProgress,
} from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import FlagIcon from '@mui/icons-material/Flag';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SendIcon from '@mui/icons-material/Send';

const EMPTY_FORM = {
  current_location: '',
  pickup_location: '',
  dropoff_location: '',
  current_cycle_used: '',
};

export default function TripForm({ onSubmit, loading, error }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [touched, setTouched] = useState(false);

  const cycleValue = Number(form.current_cycle_used);
  const errors = {
    current_location: !form.current_location.trim() ? 'Required' : '',
    pickup_location: !form.pickup_location.trim() ? 'Required' : '',
    dropoff_location: !form.dropoff_location.trim() ? 'Required' : '',
    current_cycle_used:
      form.current_cycle_used === '' || Number.isNaN(cycleValue)
        ? 'Required'
        : cycleValue < 0 || cycleValue > 70
          ? 'Must be between 0 and 70'
          : '',
  };
  const hasErrors = Object.values(errors).some(Boolean);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTouched(true);
    if (hasErrors) return;
    onSubmit({ ...form, current_cycle_used: cycleValue });
  };

  return (
    <Card component="form" onSubmit={handleSubmit} noValidate>
      <CardHeader
        title="Plan a New Trip"
        subheader="Enter trip details to generate a compliant route and daily ELD logs"
      />
      <CardContent>
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Current Location"
              placeholder="e.g. Chicago, IL"
              value={form.current_location}
              onChange={handleChange('current_location')}
              error={touched && !!errors.current_location}
              helperText={touched && errors.current_location}
              slotProps={{ input: { startAdornment: (
                <InputAdornment position="start"><MyLocationIcon color="primary" fontSize="small" /></InputAdornment>
              ) } }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Current Cycle Used (Hrs)"
              placeholder="e.g. 15"
              type="number"
              slotProps={{
                htmlInput: { min: 0, max: 70, step: 0.5 },
                input: { startAdornment: (
                  <InputAdornment position="start"><ScheduleIcon color="primary" fontSize="small" /></InputAdornment>
                ) },
              }}
              value={form.current_cycle_used}
              onChange={handleChange('current_cycle_used')}
              error={touched && !!errors.current_cycle_used}
              helperText={(touched && errors.current_cycle_used) || 'Hours already on duty in the current 70-hr/8-day cycle'}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Pickup Location"
              placeholder="e.g. Indianapolis, IN"
              value={form.pickup_location}
              onChange={handleChange('pickup_location')}
              error={touched && !!errors.pickup_location}
              helperText={touched && errors.pickup_location}
              slotProps={{ input: { startAdornment: (
                <InputAdornment position="start"><Inventory2Icon color="secondary" fontSize="small" /></InputAdornment>
              ) } }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Drop-off Location"
              placeholder="e.g. Dallas, TX"
              value={form.dropoff_location}
              onChange={handleChange('dropoff_location')}
              error={touched && !!errors.dropoff_location}
              helperText={touched && errors.dropoff_location}
              slotProps={{ input: { startAdornment: (
                <InputAdornment position="start"><FlagIcon sx={{ color: 'tertiary.main' }} fontSize="small" /></InputAdornment>
              ) } }}
            />
          </Grid>
        </Grid>

        {error && (
          <Alert severity="error" sx={{ mt: 2.5 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <SendIcon />}
            sx={{ px: 4, py: 1.2 }}
          >
            {loading ? 'Calculating route…' : 'Generate Route & Logs'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
