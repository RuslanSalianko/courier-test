import { PaletteOptions, TypeBackground } from '@mui/material';

export const grey = {
  50: '#52414C',
  100: '#1e1f29',
  200: '#e47ad5',
  A100: '#FFFFFF',
  A200: '#000000',
  A300: '#F2F2F2',
};

const primary = {
  main: grey[100],
};

const secondary = {
  main: grey[200],
};

const background: Partial<TypeBackground> = {
  default: grey['A300'],
  paper: grey['A100'],
};

const base = {
  primary,
  secondary,
  background,
};
export function palette(): PaletteOptions {
  return {
    ...base,
    text: {
      primary: grey['A200'],
      secondary: grey['A100'],
      disabled: grey['A300'],
    },
    grey,
  };
}
