import { Stack, Typography, Divider, Box } from '@mui/material';
import SummaryCards from './SummaryCards';
import RouteMap from './RouteMap';
import StopsTimeline from './StopsTimeline';
import DailyLogSheet from './DailyLogSheet';

export default function TripResult({ result }) {
  if (!result) return null;
  const { summary, route, stops, daily_logs: dailyLogs, inputs } = result;

  return (
    <Stack spacing={3}>
      <SummaryCards summary={summary} />
      <RouteMap route={route} stops={stops} />
      <StopsTimeline stops={stops} />

      <Box>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h6" sx={{ mb: 0.5 }}>Daily Log Sheets</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          One FMCSA-style record of duty status per 24-hour period, generated from the schedule above.
        </Typography>
        <Stack spacing={2.5}>
          {dailyLogs.map((day, idx) => (
            <DailyLogSheet key={day.date} day={day} dayIndex={idx} inputs={inputs} />
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}
