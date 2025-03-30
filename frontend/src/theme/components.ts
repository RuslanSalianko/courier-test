import { Components, Theme } from '@mui/material/styles';
import { grey } from './palette';

export const components = (): Components<Omit<Theme, 'components'>> => {
  return {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            color: grey['A200'],
          },
          '& .MuiInputLabel-root': {
            color: grey['A200'],
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: grey[200],
          },
          '&:hover .MuiInputLabel-root': {
            color: grey[200],
          },
          '& .MuiOutlinedInput-root': {
            backgroundColor: grey['A100'],
            '& fieldset': {
              borderColor: grey['A200'],
            },
            '&:hover fieldset': {
              borderColor: grey[200],
            },

            '&.Mui-focused fieldset': {
              borderColor: grey[200],
            },
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: grey['A200'],
          '&.Mui-checked': {
            color: grey[200],
          },
        },
      },
    },
    MuiTableSortLabel: {
      styleOverrides: {
        root: {
          color: grey['A200'],
          ':hover': {
            color: grey[200],
          },
          '&.Mui-active': {
            color: grey[200],
            '& .MuiTableSortLabel-icon': {
              color: grey[200],
            },
          },
        },
      },
    },
  };
};
