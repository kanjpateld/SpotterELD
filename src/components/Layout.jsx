import { useState } from 'react';
import { Link, useLocation, matchPath } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, Box, Drawer, List, ListItemButton,
  ListItemIcon, ListItemText, IconButton, useMediaQuery, useTheme, Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HomeIcon from '@mui/icons-material/Home';
import AddRoadIcon from '@mui/icons-material/AddRoad';
import HistoryIcon from '@mui/icons-material/History';

const DRAWER_WIDTH = 240;
const BRAND_NAME = 'Spotter ELD';

const NAV_ITEMS = [
  { label: 'Home', to: '/', icon: <HomeIcon /> },
  { label: 'Plan a Trip', to: '/plan', icon: <AddRoadIcon /> },
  { label: 'Trip History', to: '/history', icon: <HistoryIcon /> },
];

const PAGE_TITLES = [
  { pattern: '/', title: BRAND_NAME },
  { pattern: '/plan', title: 'Plan a Trip' },
  { pattern: '/history', title: 'Trip History' },
  { pattern: '/history/:id', title: 'Trip Details' },
];

function usePageTitle(pathname) {
  const match = PAGE_TITLES.find((entry) => matchPath({ path: entry.pattern, end: true }, pathname));
  return match?.title ?? BRAND_NAME;
}

export default function Layout({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const pageTitle = usePageTitle(location.pathname);

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Toolbar sx={{ gap: 1 }}>
        <LocalShippingIcon sx={{ color: 'secondary.main' }} />
        <Typography variant="h6" noWrap sx={{ color: 'primary.main', fontWeight: 800 }}>
          Spotter ELD
        </Typography>
      </Toolbar>
      <Divider />
      <List sx={{ flexGrow: 1, px: 1, pt: 1 }}>
        {NAV_ITEMS.map((item) => {
          const selected = location.pathname === item.to;
          return (
            <ListItemButton
              key={item.to}
              component={Link}
              to={item.to}
              selected={selected}
              onClick={() => setMobileOpen(false)}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  '& .MuiListItemIcon-root': { color: 'primary.contrastText' },
                  '&:hover': { bgcolor: 'primary.dark' },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          );
        })}
      </List>
      
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{ width: { md: `calc(100% - ${DRAWER_WIDTH}px)` }, ml: { md: `${DRAWER_WIDTH}px` } }}
      >
        <Toolbar sx={{ gap: 1.5 }}>
          {isMobile && (
            <IconButton color="inherit" edge="start" onClick={() => setMobileOpen(true)}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            component="div"
            noWrap
            sx={{ flexGrow: 1, fontWeight: 700, fontSize: { xs: '1.05rem', sm: '1.25rem' } }}
          >
            {pageTitle}
          </Typography>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileOpen : true}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
              borderRight: '1px solid rgba(16,35,46,0.08)',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          bgcolor: 'background.default',
          minHeight: '100vh',
          overflowX: 'hidden',
        }}
      >
        <Toolbar />
        <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>{children}</Box>
      </Box>
    </Box>
  );
}
