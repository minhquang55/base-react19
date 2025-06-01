import { ErrorBoundary } from "react-error-boundary"
import { Navigate, useLocation } from "react-router-dom"

import { ErrorFallback } from "@/components/common/ErrorFallback"
import authStore from "@/stores/auth.store"
import { PATHS } from "@/utils/constants"

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = authStore.use.auth()
  const location = useLocation()

  if (!auth) {
    return <Navigate to={PATHS.LOGIN} state={{ from: location }} replace />
  }

  return <ErrorBoundary fallback={<ErrorFallback />}>{children}</ErrorBoundary>
}
