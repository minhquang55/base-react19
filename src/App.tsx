import { QueryClientProvider } from "@tanstack/react-query"
import { ErrorBoundary } from "react-error-boundary"

import "@/App.css"
import AppProvider from "@/components/common/AppProvider"
import { ErrorFallback } from "@/components/common/ErrorFallback"
import { Toaster } from "@/components/ui/sonner"
import { queryClient } from "@/lib/react-query"
import AppRouter from "@/router"

function App() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <AppRouter />
        </AppProvider>
        <Toaster position="top-center" theme="light" richColors />
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App
