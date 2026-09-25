import { useMemo } from 'react';
import { Card, CardContent, Box, Typography, Stack, Divider } from '@mui/material';

const ROWS = [
  { key: 'off_duty', label: 'Off Duty', color: '#2a78d6' },
  { key: 'sleeper_berth', label: 'Sleeper Berth', color: '#4a3aa7' },
  { key: 'driving', label: 'Driving', color: '#eb6834' },
  { key: 'on_duty', label: 'On Duty (Not Driving)', color: '#1baf7a' },
];

const LEFT_MARGIN = 168;
const RIGHT_MARGIN = 56;
const TOP_MARGIN = 34;
const ROW_HEIGHT = 40;
const GRID_HEIGHT = ROW_HEIGHT * ROWS.length;
const CHART_WIDTH = 900;
const GRID_WIDTH = CHART_WIDTH - LEFT_MARGIN - RIGHT_MARGIN;
const REMARKS_HEIGHT = 78;
const SVG_HEIGHT = TOP_MARGIN + GRID_HEIGHT + REMARKS_HEIGHT;

const hourLabel = (h) => {
  const hh = Math.round(h) % 24;
  if (hh === 0) return 'Midnight';
  if (hh === 12) return 'Noon';
  return `${hh}`;
};

function xForHour(hour) {
  return LEFT_MARGIN + (hour / 24) * GRID_WIDTH;
}

function yForRow(index) {
  return TOP_MARGIN + index * ROW_HEIGHT;
}

function dedupeRemarks(remarks) {
  const out = [];
  let prevKey = null;
  for (const r of remarks) {
    const key = `${r.location}|${r.label}`;
    if (key !== prevKey) {
      out.push(r);
      prevKey = key;
    }
  }
  return out;
}

export default function DailyLogSheet({ day, dayIndex, inputs }) {
  const rowIndex = useMemo(
    () => Object.fromEntries(ROWS.map((r, i) => [r.key, i])),
    [],
  );

  const polylinePoints = useMemo(() => {
    const pts = [];
    for (const seg of day.segments) {
      const y = yForRow(rowIndex[seg.status]) + ROW_HEIGHT / 2;
      pts.push(`${xForHour(seg.start_hour).toFixed(1)},${y}`);
      pts.push(`${xForHour(seg.end_hour).toFixed(1)},${y}`);
    }
    return pts.join(' ');
  }, [day.segments, rowIndex]);

  const remarks = useMemo(() => dedupeRemarks(day.remarks), [day.remarks]);

  return (
    <Card sx={{ minWidth: 0 }}>
      <CardContent>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
          sx={{ mb: 1, justifyContent: 'space-between', alignItems: { sm: 'center' } }}
        >
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              Day {dayIndex + 1} &mdash; {new Date(day.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {inputs.current_location} &rarr; {inputs.pickup_location} &rarr; {inputs.dropoff_location}
            </Typography>
          </Box>
          <Stack direction="row" spacing={1.5} useFlexGap sx={{ flexWrap: 'wrap' }}>
            {ROWS.map((row) => (
              <Stack key={row.key} direction="row" spacing={0.6} sx={{ alignItems: 'center' }}>
                <Box sx={{ width: 10, height: 10, borderRadius: '2px', bgcolor: row.color }} />
                <Typography variant="caption" color="text.secondary">{row.label}</Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>

        <Box sx={{ width: '100%', overflowX: 'auto' }}>
          <svg
            viewBox={`0 0 ${CHART_WIDTH} ${SVG_HEIGHT}`}
            width="100%"
            style={{ minWidth: 640, display: 'block', fontFamily: 'inherit' }}
          >
            {/* Row backgrounds (tint) + labels + totals */}
            {ROWS.map((row, i) => (
              <g key={row.key}>
                <rect
                  x={LEFT_MARGIN}
                  y={yForRow(i)}
                  width={GRID_WIDTH}
                  height={ROW_HEIGHT}
                  fill={row.color}
                  fillOpacity={0.07}
                  stroke="rgba(22,35,46,0.18)"
                  strokeWidth={1}
                />
                <text x={LEFT_MARGIN - 10} y={yForRow(i) + ROW_HEIGHT / 2 + 4} textAnchor="end" fontSize="12.5" fill="#33424D" fontWeight={600}>
                  {row.label}
                </text>
                <text
                  x={CHART_WIDTH - RIGHT_MARGIN + 10}
                  y={yForRow(i) + ROW_HEIGHT / 2 + 4}
                  fontSize="12.5"
                  fill="#33424D"
                  fontWeight={700}
                >
                  {(day.totals[row.key] ?? 0).toFixed(2)}
                </text>
              </g>
            ))}

            {/* Hour gridlines: minor (15 min) + major (hour) + bold (6 hr) */}
            {Array.from({ length: 97 }).map((_, i) => {
              const hour = i / 4;
              const x = xForHour(hour);
              const isHour = i % 4 === 0;
              const isMajor = i % 24 === 0;
              return (
                <line
                  key={i}
                  x1={x} x2={x}
                  y1={TOP_MARGIN}
                  y2={TOP_MARGIN + GRID_HEIGHT}
                  stroke={isMajor ? '#33424D' : isHour ? 'rgba(22,35,46,0.35)' : 'rgba(22,35,46,0.12)'}
                  strokeWidth={isMajor ? 1.6 : isHour ? 1 : 0.6}
                />
              );
            })}

            {/* Hour axis labels (skip the trailing Midnight to avoid crowding the Total column) */}
            {Array.from({ length: 12 }).map((_, i) => {
              const hour = i * 2;
              return (
                <text
                  key={i}
                  x={xForHour(hour)}
                  y={TOP_MARGIN - 12}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#51636F"
                >
                  {hourLabel(hour)}
                </text>
              );
            })}

            {/* Row separator baseline top */}
            <rect x={LEFT_MARGIN} y={TOP_MARGIN} width={GRID_WIDTH} height={GRID_HEIGHT} fill="none" stroke="#16232E" strokeWidth={1.6} />

            {/* The status step-line */}
            <polyline
              points={polylinePoints}
              fill="none"
              stroke="#16232E"
              strokeWidth={2.75}
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* Remarks: tick + rotated label */}
            {remarks.map((r, i) => {
              const x = xForHour(r.hour);
              const y0 = TOP_MARGIN + GRID_HEIGHT;
              return (
                <g key={i}>
                  <line x1={x} x2={x} y1={y0} y2={y0 + 10} stroke="#51636F" strokeWidth={1} />
                  <text
                    x={x}
                    y={y0 + 14}
                    fontSize="10.5"
                    fill="#33424D"
                    transform={`rotate(-40 ${x} ${y0 + 14})`}
                    textAnchor="end"
                  >
                    {r.location}
                  </text>
                </g>
              );
            })}

            <text x={CHART_WIDTH - RIGHT_MARGIN + 10} y={TOP_MARGIN - 12} fontSize="11" fontWeight={700} fill="#16232E">
              Total
            </text>
          </svg>
        </Box>

        <Divider sx={{ my: 1.5 }} />
        <Typography variant="caption" color="text.secondary">
          Total hours logged: {day.total_hours.toFixed(2)} / 24.00
        </Typography>
      </CardContent>
    </Card>
  );
}
