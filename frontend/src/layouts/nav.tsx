import { useEffect } from 'react';
import { Link, useLocation } from '@tanstack/react-router';

import { alpha, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ListItemButton from '@mui/material/ListItemButton';
import Drawer from '@mui/material/Drawer';

import Scrollbar from '@components/scrollbar';
import Logo from '@components/logo';

import { useResponsive } from '@hooks/use-responsive';

import { NAV } from './config';
import { navConfig } from './nav-config';
import { INavItem } from './types/nav-item.interface';
import { useSelector } from 'react-redux';

type Props = {
  openNav: boolean;
  onCloseNav: VoidFunction;
};

export default function Nav({ openNav, onCloseNav }: Props) {
  const id = useSelector((state: any) => state.courier.id);
  const { pathname } = useLocation();

  const theme = useTheme();

  const upLg = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
        background: theme.palette.primary.main,
      }}
    >
      <Logo sx={{ mt: 3, ml: 4, mb: 4 }} />

      <RenderMenu navItem={navConfig(id)} />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
        top: '100px',
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer open={openNav} onClose={onCloseNav}>
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

// ----------------------------------------------------------------------
//

function RenderMenu({ navItem }: { navItem: INavItem[] }) {
  return (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navItem.map((item) => {
        return <NavItem key={item.title} item={item} />;
      })}
    </Stack>
  );
}

function NavItem({ item }: { item: INavItem }) {
  const { pathname } = useLocation();
  const active = item.path === pathname;

  return (
    <ListItemButton
      component={Link}
      href={item.path}
      sx={{
        display: item.hidden ? 'none' : 'flex',
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'text.secondary',
        textTransform: 'capitalize',
        fontWeight: 'fontWeightMedium',
        ...(active && {
          color: 'secondary.main',
          fontWeight: 'fontWeightSemiBold',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
        }),
        '&:hover': {
          bgcolor: (theme) => alpha(theme.palette.grey[50], 0.16),
        },
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>

      <Box component="span">{item.title} </Box>
    </ListItemButton>
  );
}
