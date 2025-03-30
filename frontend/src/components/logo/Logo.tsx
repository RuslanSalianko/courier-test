import { Link as RouterLink } from '@tanstack/react-router';
import { forwardRef } from 'react';

import { Box, Link, SxProps, Typography } from '@mui/material';

type Props = {
  disabledLink?: boolean;
  sx?: SxProps;
};

const Logo = forwardRef(
  ({ disabledLink = false, sx, ...other }: Props, ref) => {
    const logo = (
      <Box
        ref={ref}
        component="div"
        sx={{
          width: 150,
          heigth: 60,
          display: 'inline-flex',

          ...sx,
        }}
        {...other}
      >
        <Typography variant="h5" sx={{ color: 'white' }}>
          Courier
        </Typography>
      </Box>
    );

    if (disabledLink) {
      return <>{logo} </>;
    }

    return (
      <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
        {logo}
      </Link>
    );
  },
);

export default Logo;
