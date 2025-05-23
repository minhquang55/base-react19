import AppLayout from '@/layouts/AppLayout'
import { lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const Dashboard = lazy(() => import('@/pages/dashboard/Dashboard'))
const Project = lazy(() => import('@/pages/project/Project'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/project',
        element: <Project />,
      },
    ],
  },
])

export default function AppRouter() {
  return <RouterProvider router={router} />
} 