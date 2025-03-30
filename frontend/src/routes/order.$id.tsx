import { orderService } from '@services/order.service';
import Page from '@/components/page';
import { DELIVERY_TYPE, ORDER_STATUS } from '@/constants';
import { formatDate } from '@utils/date';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { createFileRoute } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';
import z from 'zod';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { packageService } from '@services/package.service';
import { EDeliveryType, IOrder } from '@/types';

export const Route = createFileRoute('/order/$id')({
  loader: async ({ params }) => await orderService.findById(+params.id),
  component: RouteComponent,
});

const trackNoSchema = z.object({
  trackNo: z
    .string()
    .regex(/^[0-9]{6}_[0-9]{6}$/, { message: 'Неверный формат' }),
});

const parceTrackNo = (trackNo: string) => {
  const [firstPart, _] = trackNo.split('_');
  const packageNumber = +firstPart.slice(2, 4);

  return { packageNumber };
};

function RouteComponent() {
  const [order, setOrder] = useState<IOrder>(Route.useLoaderData() as IOrder);

  const form = useForm({
    defaultValues: {
      trackNo: '',
    },
    onSubmit: async ({ value }) => {
      const { packageNumber } = parceTrackNo(value.trackNo);
      await packageService.checkPackage(packageNumber, order.id);
      const newOrder = await orderService.findById(order.id);
      if (newOrder) setOrder(newOrder);
    },
    validators: {
      onChange: trackNoSchema,
    },
  });

  const formantPackageNo = (
    type: EDeliveryType,
    packageId: number,
    packagesLength: number,
    orderId: number,
  ) =>
    `${type}${String(packageId).padStart(2, '0')}${String(packagesLength).padStart(2, '0')}_${String(orderId).padStart(6, '0')}`;

  return (
    <Page name={`Заказ № ${String(order.id).padStart(6, '0')}`}>
      <Stack
        direction="column"
        spacing={2}
        sx={{ m: 3, display: 'flex', justifyContent: 'space-between' }}
      >
        <Typography variant="h5" sx={{ textAlign: 'left', m: 1 }}>
          Доставка
        </Typography>
        <TextField
          label="Дата доставки"
          value={formatDate(order.delivery.dateDelivery)}
        />
        <TextField label="Город" value={order.delivery.city.name} />
        <TextField label="Адрес" value={order.delivery.address} />
        <TextField label="Координаты" value={order.delivery.coordinates} />
        <TextField
          label="Тип доставки"
          value={DELIVERY_TYPE[order.delivery.type]}
        />
        <TextField label="Статус" value={ORDER_STATUS[order.status]} />
      </Stack>
      <Stack
        direction="column"
        spacing={2}
        sx={{ m: 3, display: 'flex', justifyContent: 'space-between' }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Номер пакета</TableCell>
              <TableCell>Обработан</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.packages.map((item) => (
              <TableRow key={item.id}>
                <TableCell data-id={item.id}>
                  {formantPackageNo(
                    order.delivery.type,
                    item.numberSign,
                    order.packages.length,
                    order.id,
                  )}
                </TableCell>
                <TableCell>{item.check ? 'Да' : 'Нет'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        sx={{ m: 3, display: 'flex', justifyContent: 'space-between' }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault(), e.stopPropagation(), form.handleSubmit();
          }}
          style={{ display: 'flex', flexDirection: 'row', gap: 10 }}
        >
          <form.Field
            name="trackNo"
            children={(field) => (
              <TextField
                error={field.state.meta.errors.length > 0}
                label="Номер пакета"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                sx={{ width: '100%' }}
                helperText={field.state.meta.errors[0]?.message}
              />
            )}
          />
          <form.Subscribe
            children={() => (
              <Button variant="contained" type="submit">
                Сохранить
              </Button>
            )}
          />
        </form>
      </Stack>
    </Page>
  );
}
