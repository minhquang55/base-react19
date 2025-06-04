import { ErrorBoundary } from "react-error-boundary"
import { Navigate, useLocation } from "react-router-dom"

import { ErrorFallback } from "@/components/shared/common/error-fallback"
import { ROUTES } from "@/constants/routes"
import authStore from "@/stores/auth.store"

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = authStore.use.auth()
  const location = useLocation()

  if (!auth) {
    return <Navigate to={ROUTES.AUTH.LOGIN} state={{ from: location }} replace />
  }

  return <ErrorBoundary fallback={<ErrorFallback />}>{children}</ErrorBoundary>
}
