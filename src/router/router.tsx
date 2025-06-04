import { createBrowserRouter } from "react-router-dom"

import { ErrorFallback } from "@/components/shared/common/error-fallback"
import { GuestRoute } from "@/components/shared/routes/GuestRoute"
import { ProtectedRoute } from "@/components/shared/routes/ProtectedRoute"
import { ROUTES } from "@/constants/routes"
import AppLayout from "@/layouts/AppLayout"
import { lazyImport } from "@/lib/lazy-import"

const { Login } = lazyImport(() => import("@/pages/auth/login"), "Login")
const { Dashboard } = lazyImport(() => import("@/pages/dashboard/dashboard"), "Dashboard")
const { Example } = lazyImport(() => import("@/pages/example/example"), "Example")
const { SimpleTablePage } = lazyImport(() => import("@/pages/table/simple-table-page"), "SimpleTablePage")
const { SelectedTablePage } = lazyImport(() => import("@/pages/table/selected-table-page"), "SelectedTablePage")


export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <AppLayout />,
    children: [
      {
        path: ROUTES.HOME,
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.EXAMPLE,
        element: (
          <ProtectedRoute>
            <Example />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.TABLE.SIMPLE,
        element: (
          <ProtectedRoute>
            <SimpleTablePage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.TABLE.SELECTED,
        element: (
          <ProtectedRoute>
            <SelectedTablePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: ROUTES.AUTH.LOGIN,
    element: (
      <GuestRoute>
        <Login />
      </GuestRoute>
    ),
  },
  {
    path: "*",
    element: <ErrorFallback error={404} />,
  },
])
