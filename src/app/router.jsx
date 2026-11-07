import { createElement, lazy, Suspense } from 'react'
import { CircularProgress, Stack } from '@mui/material'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppLayout } from '../components/layout/AppLayout'
import { ProtectedRoute } from '../features/session/components/ProtectedRoute'

const pages = {
  home: lazy(() =>
    import('../pages/HomePage').then(({ HomePage: page }) => ({ default: page })),
  ),
  catalog: lazy(() =>
    import('../pages/CatalogPage').then(({ CatalogPage: page }) => ({ default: page })),
  ),
  library: lazy(() =>
    import('../pages/LibraryPage').then(({ LibraryPage: page }) => ({ default: page })),
  ),
  bookManagement: lazy(() =>
    import('../pages/BookManagementPage').then(({ BookManagementPage: page }) => ({ default: page })),
  ),
  bookForm: lazy(() =>
    import('../pages/BookFormPage').then(({ BookFormPage: page }) => ({ default: page })),
  ),
  login: lazy(() =>
    import('../pages/LoginPage').then(({ LoginPage: page }) => ({ default: page })),
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
          path: 'login',
          element: withLoading(createElement(pages.login)),
        },
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: 'biblioteca',
              element: withLoading(createElement(pages.library)),
            },
            {
              path: 'biblioteca/livros',
              element: withLoading(createElement(pages.bookManagement)),
            },
            {
              path: 'biblioteca/livros/novo',
              element: withLoading(createElement(pages.bookForm)),
            },
            {
              path: 'biblioteca/livros/:bookId/editar',
              element: withLoading(createElement(pages.bookForm)),
            },
            {
              path: 'admin',
              element: <Navigate to="/biblioteca" replace />,
            },
          ],
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
