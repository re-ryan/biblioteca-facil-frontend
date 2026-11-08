import { createElement, lazy, Suspense } from 'react'
import { CircularProgress, Stack } from '@mui/material'
import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '../components/layout/AppLayout'
import { ProtectedRoute } from '../features/auth/components/ProtectedRoute'
import { BooksProvider } from '../features/books/context/BooksProvider'

const pages = {
  home: lazy(() =>
    import('../pages/HomePage').then(({ HomePage: page }) => ({ default: page })),
  ),
  bookManagement: lazy(() =>
    import('../pages/BookManagementPage').then(({ BookManagementPage: page }) => ({ default: page })),
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
          path: 'login',
          element: withLoading(createElement(pages.login)),
        },
        {
          path: 'livros',
          element: (
            <ProtectedRoute>
              <BooksProvider>{withLoading(createElement(pages.bookManagement))}</BooksProvider>
            </ProtectedRoute>
          ),
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
