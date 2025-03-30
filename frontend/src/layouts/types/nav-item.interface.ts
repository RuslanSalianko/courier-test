import { ReactNode } from 'react';

export interface INavItem {
  title: string;
  path: string;
  icon: ReactNode;
  hidden?: boolean;
}
