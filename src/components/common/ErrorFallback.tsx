import { AxiosError } from "axios"
import { useEffect, useRef } from "react"
import { useErrorBoundary } from "react-error-boundary"
import { useLocation } from "react-router-dom"

import { HttpError } from "@/components/common/HttpError.tsx"
import { ERROR_FORBIDDEN_MESSAGE } from "@/utils/constants"

export const ErrorFallback = ({ error }: { error?: unknown }) => {
  const { resetBoundary } = useErrorBoundary()
  const { pathname, search } = useLocation()
  const originalPathname = useRef(pathname)
  const originalSearch = useRef(search)

  useEffect(() => {
    if (
      pathname !== originalPathname.current ||
      (pathname === originalPathname.current && originalSearch.current !== search)
    ) {
      resetBoundary()
    }
  }, [pathname, search, resetBoundary, error])

  if (!window.navigator.onLine) return <HttpError errorCode="ERR_NETWORK" />

  if (error instanceof AxiosError) {
    if (error?.code === "ERR_NETWORK") return <HttpError errorCode="ERR_NETWORK" />
    return <HttpError errorCode={error?.response?.status as 404 | 403 | 500 | "ERR_NETWORK"} />
  }

  if (error instanceof Error && error.message === ERROR_FORBIDDEN_MESSAGE) return <HttpError errorCode={403} />

  return <HttpError errorCode={404} />
}
