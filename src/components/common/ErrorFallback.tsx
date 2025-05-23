export default function ErrorFallback({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) {
  return (
    <div role="alert" className="p-8 text-center">
      <h2 className="text-lg font-bold mb-2 text-red-600">Đã có lỗi xảy ra!</h2>
      <pre className="text-sm text-red-500 mb-4">{error.message}</pre>
      <button onClick={resetErrorBoundary} className="px-4 py-2 bg-primary text-white rounded">Thử lại</button>
    </div>
  )
}
