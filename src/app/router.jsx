import { createElement, lazy, Suspense } from 'react'
import { CircularProgress, Stack } from '@mui/material'
import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '../components/layout/AppLayout'

const pages = {
  home: lazy(() =>
    import('../pages/HomePage').then(({ HomePage: page }) => ({ default: page })),
  ),
  catalog: lazy(() =>
    import('../pages/CatalogPage').then(({ CatalogPage: page }) => ({ default: page })),
  ),
  admin: lazy(() =>
    import('../pages/AdminPage').then(({ AdminPage: page }) => ({ default: page })),
  ),
  notFound: lazy(() =>
    import('../pages/NotFoundPage').then(({ NotFoundPage: page }) => ({ default: page })),
  ),
}

const withLoading = (page) => (
  <Suspense
    fallback={
      <Stack sx={{ minHeight: '50vh', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress aria-label="Carregando página" />
      </Stack>
    }
  >
    {page}
  </Suspense>
)

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: withLoading(createElement(pages.home)),
        },
        {
          path: 'catalogo',
          element: withLoading(createElement(pages.catalog)),
        },
        {
          path: 'admin',
          element: withLoading(createElement(pages.admin)),
        },
        {
          path: '*',
          element: withLoading(createElement(pages.notFound)),
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
)
