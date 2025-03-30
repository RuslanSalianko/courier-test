import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { DELIVERY_TYPE, ORDER_STATUS } from '@/constants';
import { formatDate } from '@/utils/date';
import { Link } from '@tanstack/react-router';
import { EDeliveryType, EOrderStatus, ICourier } from '@/types';

type Props = {
  id: number;
  dateDelivery: Date;
  delivetyType: EDeliveryType;
  city: string;
  curier: ICourier | undefined;
  status: EOrderStatus;
  labelId?: string;
  isItemSelected?: boolean;
  handleClick?: (event: React.MouseEvent<unknown>, id: number) => void;
};

function OrderTableRow({
  id,
  dateDelivery,
  delivetyType,
  city,
  curier,
  status,
  labelId,
  isItemSelected,
  handleClick,
}: Props) {
  return (
    <TableRow
      hover
      onClick={(event) => {
        handleClick && handleClick(event, Number(id));
      }}
      role={handleClick ? 'checkbox' : undefined}
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={id}
      selected={isItemSelected}
      sx={{ cursor: 'pointer' }}
    >
      {handleClick && (
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            checked={isItemSelected}
            inputProps={{
              'aria-labelledby': labelId,
            }}
          />
        </TableCell>
      )}
      <TableCell
        component="th"
        id={labelId}
        scope="row"
        padding="none"
        align="center"
      >
        {id.toString().padStart(6, '0')}
      </TableCell>

      <TableCell align="left">{formatDate(dateDelivery)}</TableCell>
      <TableCell align="left">{DELIVERY_TYPE[delivetyType]}</TableCell>
      <TableCell align="left">{city}</TableCell>
      <TableCell align="left">
        {curier
          ? `${curier.lastName} ${curier.firstName} `
          : ORDER_STATUS[status] === ORDER_STATUS.PAID &&
            'Нет свободного курьера'}
      </TableCell>
      <TableCell align="left">{ORDER_STATUS[status]}</TableCell>

      <TableCell align="right">
        {!handleClick && (
          <Link to="/order/$id" params={{ id: String(id) }}>
            <Button variant="contained" sx={{ color: 'secondary.main' }}>
              Подробнее
            </Button>
          </Link>
        )}
      </TableCell>
    </TableRow>
  );
}

export default OrderTableRow;
