import { AppDispatch, RootState } from '@/store';
import { fetchCourier } from '@/store/reducer/courier';
import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
  id: number;
  lastName: string;
  firstName: string;
  city: string;
  phone: string;
};

function CouriersTableRow({ id, lastName, firstName, city, phone }: Props) {
  const courierActivatedId = useSelector(
    (state: RootState) => state.courier.id,
  );
  const dispach = useDispatch<AppDispatch>();

  const handleActivate = async (id: number) => {
    await dispach(fetchCourier(id));
  };
  return (
    <>
      <TableRow hover tabIndex={-1} key={id} sx={{ cursor: 'pointer' }}>
        <TableCell align="left">{firstName}</TableCell>
        <TableCell align="left">{lastName}</TableCell>
        <TableCell align="left">{city}</TableCell>
        <TableCell align="left">{phone}</TableCell>
        <TableCell align="right">
          {courierActivatedId !== id && (
            <Button
              variant="contained"
              sx={{ color: 'secondary.main' }}
              onClick={() => handleActivate(id)}
            >
              Активировать
            </Button>
          )}
        </TableCell>
      </TableRow>
    </>
  );
}

export default CouriersTableRow;
