import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { IHeadLabel } from './types';
import TableSortLabel from '@mui/material/TableSortLabel';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';
import Checkbox from '@mui/material/Checkbox';
import { OrderBy } from '@/types';

type Props<T> = {
  order: OrderBy;
  orderBy: string;
  headLabel: IHeadLabel[];
  rowCount?: number;
  numSelected?: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
  onSelectAllClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function Head<T>({
  order,
  orderBy,
  headLabel,
  numSelected,
  rowCount,
  onRequestSort,
  onSelectAllClick,
}: Props<T>) {
  const createSortHandler =
    (property: keyof T) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {onSelectAllClick !== undefined && (
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={
                numSelected !== undefined &&
                rowCount !== undefined &&
                numSelected > 0 &&
                numSelected < rowCount
              }
              checked={
                rowCount !== undefined &&
                rowCount > 0 &&
                numSelected === rowCount
              }
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
        )}
        {headLabel.map((cell) => (
          <TableCell
            key={cell.id}
            sortDirection={orderBy === cell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === cell.id}
              direction={orderBy === cell.id ? order : 'asc'}
              onClick={createSortHandler(cell.id as keyof T)}
            >
              {cell.label}
              {orderBy === cell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default Head;
