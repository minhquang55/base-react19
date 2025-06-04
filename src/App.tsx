import { QueryClientProvider } from "@tanstack/react-query"
import { NuqsAdapter } from "nuqs/adapters/react"
import { ErrorBoundary } from "react-error-boundary"
import { HelmetProvider } from "react-helmet-async"

import AppProvider from "@/components/shared/common/app-provider"
import { ErrorFallback } from "@/components/shared/common/error-fallback"
import { Toaster } from "@/components/shared/ui/sonner"
import { queryClient } from "@/lib/react-query"
import AppRouter from "@/router"

function App() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <QueryClientProvider client={queryClient}>
        <NuqsAdapter>
          <HelmetProvider>
            <AppProvider>
              <AppRouter />
            </AppProvider>
          </HelmetProvider>
        </NuqsAdapter>
        <Toaster position="top-center" theme="light" richColors />
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App
