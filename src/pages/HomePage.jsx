import { Link } from 'react-router-dom';
import {
  Box, Container, Typography, Button, Grid, Card, CardContent, Stack, Chip, Divider,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RouteIcon from '@mui/icons-material/Route';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import DrawIcon from '@mui/icons-material/Draw';
import HistoryIcon from '@mui/icons-material/History';
import EditNoteIcon from '@mui/icons-material/EditNote';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import MapIcon from '@mui/icons-material/Map';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const FEATURES = [
  {
    icon: <RouteIcon fontSize="large" />,
    color: 'primary.main',
    title: 'Real Route Calculation',
    body: 'Live geocoding and road routing turn three plain addresses into an actual driving path, mileage, and drive time.',
  },
  {
    icon: <FactCheckIcon fontSize="large" />,
    color: 'secondary.main',
    title: 'HOS-Compliant Scheduling',
    body: 'The 11-hour drive limit, 14-hour window, 30-minute breaks, 10-hour resets, and the 70-hour/8-day cycle — all enforced automatically.',
  },
  {
    icon: <DrawIcon fontSize="large" />,
    color: 'tertiary.main',
    title: 'Drawn ELD Log Sheets',
    body: 'One FMCSA-style daily log per day of the trip, with the classic stepped line across Off Duty, Sleeper Berth, Driving, and On Duty lanes.',
  },
  {
    icon: <HistoryIcon fontSize="large" />,
    color: '#8E24AA',
    title: 'Trip History',
    body: 'Every trip you plan is saved, so you can reopen the full route, stops, and logs for any past trip at any time.',
  },
];

const STEPS = [
  {
    icon: <EditNoteIcon />,
    title: 'Enter Trip Details',
    body: 'Current location, pickup, drop-off, and hours already used in your current cycle.',
  },
  {
    icon: <SettingsSuggestIcon />,
    title: 'We Do the Math',
    body: 'Routing, geocoding, and the HOS engine calculate the whole trip and every required stop.',
  },
  {
    icon: <MapIcon />,
    title: 'Review Route & Stops',
    body: 'See the path on a map, plus a chronological list of every break, rest, and fuel stop.',
  },
  {
    icon: <AssignmentTurnedInIcon />,
    title: 'Get Your Daily Logs',
    body: 'Ready-to-submit ELD log sheets, one per day, fully filled out and compliant.',
  },
];

function GradientBlob({ sx }) {
  return (
    <Box
      sx={{
        position: 'absolute',
        borderRadius: '50%',
        filter: 'blur(60px)',
        opacity: 0.35,
        pointerEvents: 'none',
        ...sx,
      }}
    />
  );
}

export default function HomePage() {
  return (
    <Box>
      {/* Hero */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 4,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          px: { xs: 3, md: 7 },
          py: { xs: 6, md: 9 },
          mb: 5,
        }}
      >
        <GradientBlob sx={{ width: 320, height: 320, bgcolor: 'secondary.main', top: -120, right: -80 }} />
        <GradientBlob sx={{ width: 260, height: 260, bgcolor: 'tertiary.main', bottom: -100, left: -60 }} />

        <Box sx={{ position: 'relative', maxWidth: 760 }}>
          <Chip
            label="FMCSA Part 395 &middot; 70-hr / 8-day property carriers"
            size="small"
            sx={{ bgcolor: 'rgba(255,255,255,0.14)', color: '#fff', fontWeight: 600, mb: 2.5 }}
          />
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, lineHeight: 1.15 }}>
            Plan the trip. Stay compliant. Skip the paperwork.
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 400, opacity: 0.9, mb: 4 }}>
            Enter where you are, what you're hauling, and where it's going — Spotter ELD calculates
            the route, schedules every required break and rest, and draws your daily log sheets for you.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button
              component={Link}
              to="/plan"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{
                bgcolor: 'secondary.main', color: 'secondary.contrastText', px: 4, py: 1.4,
                '&:hover': { bgcolor: 'secondary.dark' },
              }}
            >
              Plan a Trip
            </Button>
            <Button
              component={Link}
              to="/history"
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'rgba(255,255,255,0.5)', color: '#fff', px: 4, py: 1.4,
                '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.08)' },
              }}
            >
              View Trip History
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* Problem / Solution */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: '100%', borderTop: '4px solid', borderColor: 'error.main' }}>
            <CardContent sx={{ p: 3.5 }}>
              <Stack direction="row" spacing={1.5} sx={{ mb: 1.5, alignItems: 'center' }}>
                <WarningAmberIcon color="error" />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>The Problem</Typography>
              </Stack>
              <Typography color="text.secondary">
                Hours-of-Service rules are precise and unforgiving: an 11-hour driving cap, a 14-hour
                window, mandatory 30-minute breaks, 10-hour resets, and a rolling 70-hour/8-day limit.
                Working out where those land on a real route — and then hand-drawing a compliant daily
                log for each day — is slow, error-prone, and easy to get wrong.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: '100%', borderTop: '4px solid', borderColor: 'tertiary.main' }}>
            <CardContent sx={{ p: 3.5 }}>
              <Stack direction="row" spacing={1.5} sx={{ mb: 1.5, alignItems: 'center' }}>
                <CheckCircleIcon sx={{ color: 'tertiary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>The Solution</Typography>
              </Stack>
              <Typography color="text.secondary">
                Give Spotter ELD your current location, pickup, drop-off, and cycle hours used. It
                calculates the real route, simulates the entire trip against every HOS rule, and hands
                you back a map, a stop-by-stop schedule, and fully drawn daily log sheets — compliant
                by construction, every time.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Features */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>What you get</Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Four things, generated from four inputs.
        </Typography>
        <Grid container spacing={2.5}>
          {FEATURES.map((f) => (
            <Grid key={f.title} size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      width: 52, height: 52, borderRadius: 2, display: 'flex',
                      alignItems: 'center', justifyContent: 'center', mb: 2,
                      bgcolor: f.color, color: '#fff',
                    }}
                  >
                    {f.icon}
                  </Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>{f.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{f.body}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* How it works */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>How it works</Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          One form, four outputs, in under a minute.
        </Typography>
        <Grid container spacing={2.5}>
          {STEPS.map((s, i) => (
            <Grid key={s.title} size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ height: '100%', position: 'relative' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    sx={{
                      position: 'absolute', top: 12, right: 16, fontWeight: 800,
                      fontSize: 34, color: 'rgba(11,61,102,0.08)', lineHeight: 1,
                    }}
                  >
                    {i + 1}
                  </Typography>
                  <Box
                    sx={{
                      width: 44, height: 44, borderRadius: '50%', display: 'flex',
                      alignItems: 'center', justifyContent: 'center', mb: 2,
                      bgcolor: 'primary.main', color: '#fff',
                    }}
                  >
                    {s.icon}
                  </Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>{s.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{s.body}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ mb: 5 }} />

      {/* CTA banner */}
      <Card sx={{ bgcolor: 'background.paper', border: '1px dashed', borderColor: 'primary.main' }}>
        <CardContent sx={{ p: { xs: 3, md: 5 }, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            Ready to plan your next trip?
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            It only takes four fields — current location, pickup, drop-off, and cycle hours used.
          </Typography>
          <Button
            component={Link}
            to="/plan"
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{ px: 5, py: 1.4 }}
          >
            Plan a Trip
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
