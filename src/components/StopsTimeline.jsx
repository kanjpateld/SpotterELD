import {
  Card, CardHeader, Box, Typography, Chip, Stack,
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import FlagIcon from '@mui/icons-material/Flag';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import HotelIcon from '@mui/icons-material/Hotel';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

export const STOP_COLORS = {
  pickup: '#eb6834',
  dropoff: '#1baf7a',
  fuel: '#2a78d6',
  break_30min: '#e87ba4',
  rest_10hr: '#4a3aa7',
  restart_34hr: '#e34948',
};

const STOP_META = {
  pickup: { icon: <Inventory2Icon fontSize="small" />, label: 'Pickup' },
  dropoff: { icon: <FlagIcon fontSize="small" />, label: 'Drop-off' },
  fuel: { icon: <LocalGasStationIcon fontSize="small" />, label: 'Fuel Stop' },
  rest_10hr: { icon: <HotelIcon fontSize="small" />, label: '10-Hour Off-Duty Rest' },
  restart_34hr: { icon: <RestartAltIcon fontSize="small" />, label: '34-Hour Restart' },
  break_30min: { icon: <FreeBreakfastIcon fontSize="small" />, label: '30-Minute Break' },
};

function formatTime(iso) {
  return new Date(iso).toLocaleString(undefined, {
    month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
  });
}

export default function StopsTimeline({ stops }) {
  return (
    <Card>
      <CardHeader
        avatar={<LocalShippingIcon sx={{ color: 'primary.main' }} />}
        title="Stops & Rest Schedule"
        subheader="Chronological order, computed for HOS compliance"
        action={<Chip size="small" label={`${stops.length} stops`} sx={{ mr: 1, mt: 0.5 }} />}
      />
      <Box sx={{ px: { xs: 2, sm: 3 }, pb: 3 }}>
        {stops.map((stop, idx) => {
          const meta = STOP_META[stop.type] ?? { icon: <LocalShippingIcon fontSize="small" />, label: stop.label };
          const color = STOP_COLORS[stop.type] ?? '#607D8B';
          const isLast = idx === stops.length - 1;

          return (
            <Box key={idx} sx={{ display: 'flex', gap: 2 }}>
              {/* Connector rail: dot + line */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 40, flexShrink: 0 }}>
                <Box
                  sx={{
                    width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    bgcolor: color, color: '#fff',
                    boxShadow: `0 0 0 4px ${color}22`,
                  }}
                >
                  {meta.icon}
                </Box>
                {!isLast && (
                  <Box sx={{ width: 2, flexGrow: 1, minHeight: 28, bgcolor: 'rgba(22,35,46,0.12)', my: 0.5 }} />
                )}
              </Box>

              {/* Content */}
              <Box sx={{ pb: isLast ? 0 : 3, pt: 0.5, minWidth: 0, flexGrow: 1 }}>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexWrap: 'wrap', rowGap: 0.5 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{meta.label}</Typography>
                  <Chip size="small" label={`${stop.duration_hours.toFixed(2)} hrs`} variant="outlined" sx={{ borderColor: color, color }} />
                </Stack>
                <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.25 }}>{stop.location}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatTime(stop.arrival)} &rarr; {formatTime(stop.departure)}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Card>
  );
}
