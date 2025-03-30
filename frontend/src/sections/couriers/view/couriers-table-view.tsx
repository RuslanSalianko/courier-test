import { useMemo, useState } from 'react';

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';

import { TableHead } from '@components/table';
import { getComparator } from '@components/table/utils';
import { HEAD_LABEL } from './config';

import CouriersTableRow from '../couriers-table-row';
import TablePagination from '@mui/material/TablePagination';
import { ICourier, OrderBy } from '@/types';

type Props = { couriers: ICourier[] };

function CouriersTableView({ couriers }: Props) {
  const [order, setOrder] = useState<OrderBy>('asc');
  const [orderBy, setOrderBy] = useState<keyof ICourier>('lastName');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof ICourier,
  ) => {
    event;
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    event;
    setPage(newPage);
  };

  const visibleRows = useMemo(
    () =>
      [...couriers]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage],
  );

  return (
    <>
      <TableContainer>
        <Table size="small">
          <TableHead<ICourier>
            order={order}
            orderBy={orderBy}
            headLabel={HEAD_LABEL}
            onRequestSort={handleRequestSort}
          ></TableHead>
          <TableBody>
            {visibleRows.map((row) => (
              <CouriersTableRow
                key={row.id}
                id={row.id}
                lastName={row.lastName}
                firstName={row.firstName}
                city={row.city.name}
                phone={row.phone}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={couriers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export default CouriersTableView;
