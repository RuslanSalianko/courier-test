import { Suspense } from 'react';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import MainLayout from '@/layouts';

export const Route = createRootRoute({
  component: () => (
    <>
      <MainLayout>
        <Suspense>
          <Outlet />
        </Suspense>
      </MainLayout>
      <TanStackRouterDevtools />
    </>
  ),
});
