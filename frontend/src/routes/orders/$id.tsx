import OrdersTableView from '@sections/orders/view';
import Page from '@components/page';
import Typography from '@mui/material/Typography';
import { orderService } from '@services/order.service';
import { createFileRoute } from '@tanstack/react-router';
import { ERROR_PAGE } from '@/constants';

export const Route = createFileRoute('/orders/$id')({
  loader: async ({ params }) => await orderService.findByCourierId(+params.id),
  component: RouteComponent,
});

function RouteComponent() {
  const orders = Route.useLoaderData();

  if (!orders) {
    return ERROR_PAGE;
  }

  return (
    <Page name="Заказы курьера">
      {orders.length !== 0 && (
        <>
          <OrdersTableView orders={orders} isCurier />
        </>
      )}
      {orders.length === 0 && (
        <Typography variant="h5" sx={{ textAlign: 'center', m: 1 }}>
          Заказов нет у этого курьера, или не выбран курьер
        </Typography>
      )}
    </Page>
  );
}
