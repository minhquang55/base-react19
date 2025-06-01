import { ErrorBoundary } from "react-error-boundary"
import { Navigate } from "react-router-dom"

import { ErrorFallback } from "@/components/common/ErrorFallback.tsx"
import authStore from "@/stores/auth.store.ts"
import { PATHS } from "@/utils/constants"

import type { ReactNode } from "react"

export const GuestRoute = ({ children }: { children: ReactNode }) => {
  const auth = authStore.use.auth()

  if (auth) {
    return <Navigate to={PATHS.HOME} replace />
  }

  return <ErrorBoundary fallback={<ErrorFallback />}>{children}</ErrorBoundary>
}
