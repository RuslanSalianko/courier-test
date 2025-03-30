import { ReactNode } from 'react';

import { Icon } from '@mui/material';
import { INavItem } from './types/nav-item.interface';

const icon = (name: string): ReactNode => {
  return <Icon>{name}</Icon>;
};

export const navConfig = (id: number): INavItem[] => [
  {
    title: 'Заказы',
    path: `/orders`,
    icon: icon('shopping_bag'),
  },

  {
    title: 'Заказы курьера',
    path: `/orders/${id}`,
    icon: icon('shopping_bag'),
    hidden: !id,
  },
  {
    title: 'Курьеры',
    path: '/couriers',
    icon: icon('group'),
  },
];
