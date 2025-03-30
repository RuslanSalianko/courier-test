import { useMemo, useState } from 'react';

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TablePagination from '@mui/material/TablePagination';

import { getComparator } from '@components/table/utils';
import { TableHead } from '@components/table';

import { HEAD_LABEL } from './config';

import OrdersTableRow from '../orders-table-row';
import OrdersTableToolbar from '../orders-table-toolbar';
import { orderService } from '@/api/services/order.service';
import { IOrder, OrderBy } from '@/types';

type Props = {
  orders: IOrder[];
  isCurier?: boolean;
};
function OrdersTableView({ orders, isCurier = false }: Props) {
  const [rows, setRows] = useState<IOrder[]>(orders);
  const [order, setOrder] = useState<OrderBy>('asc');
  const [orderBy, setOrderBy] = useState<keyof IOrder>('id');
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof IOrder,
  ) => {
    event;
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    event;
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
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

  const handlePayment = async () => {
    await orderService.payments(selected);
    const orders = await orderService.findAll();
    if (!orders) return;
    setRows(orders);
  };

  const visibleRows = useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [rows, orders, order, orderBy, page, rowsPerPage],
  );

  return (
    <>
      {!isCurier && (
        <OrdersTableToolbar
          numSelected={selected.length}
          handleClick={handlePayment}
        />
      )}
      <TableContainer>
        <Table size="small">
          {isCurier ? (
            <TableHead<IOrder>
              key="curier"
              order={order}
              orderBy={orderBy}
              headLabel={HEAD_LABEL}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
          ) : (
            <TableHead<IOrder>
              order={order}
              orderBy={orderBy}
              headLabel={HEAD_LABEL}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              numSelected={selected.length}
              rowCount={rows.length}
            />
          )}
          <TableBody>
            {visibleRows.map((row, index) => {
              return isCurier ? (
                <OrdersTableRow
                  key={row.id}
                  id={row.id}
                  dateDelivery={row.delivery.dateDelivery}
                  delivetyType={row.delivery.type}
                  city={row.delivery.city.name}
                  curier={row.courier}
                  status={row.status}
                />
              ) : (
                <OrdersTableRow
                  key={row.id}
                  id={row.id}
                  dateDelivery={row.delivery.dateDelivery}
                  delivetyType={row.delivery.type}
                  city={row.delivery.city.name}
                  curier={row.courier}
                  status={row.status}
                  labelId={`enhanced-table-checkbox-${index}`}
                  isItemSelected={selected.includes(Number(row.id))}
                  handleClick={handleClick}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export default OrdersTableView;
