import { createBrowserRouter } from "react-router-dom"

import { ErrorFallback } from "@/components/common/ErrorFallback"
import AppLayout from "@/layouts/AppLayout"
import { lazyImport } from "@/lib/lazy-import"
import { GuestRoute } from "@/router/GuestRoute"
import { ProtectedRoute } from "@/router/ProtectedRoute"

const { Login } = lazyImport(() => import("@/pages/auth/login"), "Login")
const { Dashboard } = lazyImport(() => import("@/pages/dashboard/dashboard"), "Dashboard")
const { Example } = lazyImport(() => import("@/pages/example/example"), "Example")
const { ExampleList } = lazyImport(() => import("@/pages/example/example-list"), "ExampleList")

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/example",
        element: (
          <ProtectedRoute>
            <Example />
          </ProtectedRoute>
        ),
      },
      {
        path: "/sample-list",
        element: (
          <ProtectedRoute>
            <ExampleList />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
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
