import { EOrderStatus } from './types/order';

export const DELIVERY_TYPE: {
  [key: number]: string;
} = {
  50: 'Самовывоз',
  70: 'Обычная доставка',
  75: 'Express доставка',
};

export const ORDER_STATUS: { [key in keyof typeof EOrderStatus]: string } = {
  CREATED: 'Создан',
  PAID: 'Оплачен',
  ASSIGNED: 'Назначен',
  IN_PROGRESS: 'Взят в работу',
  DELIVERY: 'Доставка',
  COMPLETE: 'Завершен',
};

export const ERROR_PAGE = '<h3>Ошибка загрузки</h3>';
