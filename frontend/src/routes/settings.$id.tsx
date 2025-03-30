import { ERROR_PAGE } from '@/constants';
import Page from '@components/page';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { courierService } from '@services/courier.service';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/settings/$id')({
  loader: async ({ params }) => await courierService.findById(+params.id),
  component: RouteComponent,
});

function RouteComponent() {
  const courier = Route.useLoaderData();

  if (!courier) {
    return ERROR_PAGE;
  }

  return (
    <Page name="Настройки">
      <Stack
        direction="column"
        spacing={2}
        sx={{
          m: 3,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <TextField label="Имя" value={courier.firstName} />
        <TextField label="Отчество" value={courier.middleName} />
        <TextField label="Фамилия" value={courier.lastName} />
        <TextField label="Город" value={courier.city.name} />
        <TextField label="Число  заказов" value={courier.numberOrders} />
        <TextField label="Начало работы" value={courier.startWork} />
        <TextField label="Конец работы" value={courier.endWork} />
        <TextField label="Автомобиль" value={courier.numberAuto} />
        <TextField label="Телефон" value={courier.phone} />
      </Stack>
    </Page>
  );
}
