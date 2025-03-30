import { useState } from 'react';
import { Link } from '@tanstack/react-router';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Icon from '@mui/material/Icon';
import ListItemText from '@mui/material/ListItemText';

import { useSelector } from 'react-redux';
import { RootState } from '@/store';

// ----------------------------------------------------------------------

const MENU_OPTIONS = (id: number) => [
  {
    label: 'Настройки',
    icon: 'settings-fill',
    path: `/settings/${id}`,
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const courier = useSelector((state: RootState) => state.courier);

  const handleOpen = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      {courier.id && (
        <>
          <IconButton
            onClick={handleOpen}
            sx={{
              width: 40,
              height: 40,
              background: (theme) => alpha(theme.palette.grey[500], 0.08),
              ...(open
                ? {
                    background: (theme) =>
                      `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
                  }
                : {}),
            }}
          >
            <Avatar
              alt={courier.firstName}
              sx={{
                width: 36,
                height: 36,
                border: (theme) => `solid 2px ${theme.palette.primary.main}`,
              }}
            >
              {courier.firstName.charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>
          <Popover
            open={!!open}
            anchorEl={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Box sx={{ my: 1.5, px: 2 }}>
              <Typography variant="subtitle2" noWrap>
                {courier.firstName}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.primary' }} noWrap>
                {courier.phone}
              </Typography>
            </Box>

            <Divider sx={{ borderStyle: 'dashed' }} />

            {MENU_OPTIONS(courier.id).map((option) => (
              <Link
                to={option.path}
                preload="intent"
                key={option.label}
                activeProps={{
                  style: { textDecoration: 'none', color: 'inherit' },
                }}
              >
                <MenuItem key={option.label} onClick={handleClose}>
                  <ListItemIcon>
                    <Icon>{option.icon}</Icon>
                  </ListItemIcon>
                  <ListItemText> {option.label}</ListItemText>
                </MenuItem>
              </Link>
            ))}

            <Divider sx={{ borderStyle: 'dashed', m: 0 }} />
          </Popover>
        </>
      )}
    </>
  );
}
