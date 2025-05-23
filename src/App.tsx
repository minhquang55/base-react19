import AppRouter from '@/router'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from './components/common/ErrorFallback'

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AppRouter />
    </ErrorBoundary>
  )
}

export default App
