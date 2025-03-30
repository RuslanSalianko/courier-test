import { createFileRoute } from '@tanstack/react-router';
import Page from '@components/page';
import { orderService } from '@services/order.service';
import OrdersTableView from '@sections/orders/view';
import { ERROR_PAGE } from '@/constants';

export const Route = createFileRoute('/orders/')({
  loader: async () => await orderService.findAll(),
  component: RouteComponent,
});

function RouteComponent() {
  const orders = Route.useLoaderData();

  if (!orders) {
    return ERROR_PAGE;
  }

  return (
    <Page name="Заказы">
      <OrdersTableView orders={orders}></OrdersTableView>
    </Page>
  );
}
