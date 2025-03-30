import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

type Props = {
  numSelected: number;
  handleClick: () => void;
};
function OrdersTableToolbar({ numSelected, handleClick }: Props) {
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity,
            ),
        },
      ]}
    >
      {numSelected > 0 && (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      )}
      {numSelected > 0 && (
        <Tooltip title="Оплатить">
          <Button
            variant="contained"
            sx={{ color: 'secondary.main' }}
            onClick={handleClick}
          >
            Оплатить
          </Button>
        </Tooltip>
      )}
    </Toolbar>
  );
}

export default OrdersTableToolbar;
