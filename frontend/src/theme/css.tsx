import { alpha, Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

type paperProps = {
  theme: Theme;
  bgcolor?: string;
  dropdown?: boolean;
};
export const paper = ({ theme, bgcolor, dropdown }: paperProps) => ({
  ...bgBlur({
    blur: 20,
    opacity: 0.9,
    color: theme.palette.background.paper,
    ...(!!bgcolor && {
      color: bgcolor,
    }),
  }),
  backgroundRepeat: 'no-repeat, no-repeat',
  backgroundPosition: 'top right, left bottom',
  backgroundSize: '50%, 50%',
  ...(theme.direction === 'rtl' && {
    backgroundPosition: 'top left, right bottom',
  }),
  ...(dropdown && {
    padding: theme.spacing(0.5),
    borderRadius: theme.shape.borderRadius * 1.25,
  }),
});

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
type bgBlurProps = {
  color?: string;
  opacity?: number;
  blur?: number;
  imgUrl?: string;
};

export function bgBlur(props?: bgBlurProps) {
  const color = props?.color || '#000000';
  const blur = props?.blur || 6;
  const opacity = props?.opacity || 0.8;
  const imgUrl = props?.imgUrl;

  if (imgUrl) {
    return {
      position: 'relative' as const,
      backgroundImage: `url(${imgUrl})`,
      '&:before': {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 9,
        content: '""',
        width: '100%',
        height: '100%',
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        backgroundColor: alpha(color, opacity),
      },
    };
  }

  return {
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    backgroundColor: alpha(color, opacity),
  };
}
