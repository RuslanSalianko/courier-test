import { useMemo } from 'react';
import {
  ThemeOptions,
  CssBaseline,
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from '@mui/material';

import { palette } from './palette';
import { components } from './components';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette: palette(),
      components: components(),
    }),
    [],
  );
  const theme = createTheme(themeOptions);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
};
