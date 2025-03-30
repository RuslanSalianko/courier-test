import { createFileRoute } from '@tanstack/react-router';
import { courierService } from '@services/courier.service';
import Page from '@components/page';
import CouriersTableView from '@sections/couriers/view/couriers-table-view';
import { ICourier } from '@/types';
import { ERROR_PAGE } from '@/constants';

export const Route = createFileRoute('/couriers')({
  loader: async () => await courierService.findAll(),
  component: RouteComponent,
});

function RouteComponent() {
  const couriers = Route.useLoaderData() as ICourier[];

  if (!couriers) {
    return ERROR_PAGE;
  }

  return (
    <Page name="Курьеры">
      <CouriersTableView couriers={couriers}></CouriersTableView>
    </Page>
  );
}
