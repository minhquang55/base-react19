# Routing & Menu

## Tổng quan

Hệ thống sử dụng React Router v7 cho routing và có một hệ thống menu động dựa trên permissions của user.

## Cấu trúc

### Route Configuration

1. Định nghĩa routes trong `constants/routes.ts`:
   - Sử dụng object để định nghĩa các route paths
   - Nhóm các routes liên quan vào cùng một object
   - Export dưới dạng constant để tái sử dụng

```typescript
export const ROUTES = {
  HOME: '/',
  AUTH: { LOGIN: '/login' },
  EXAMPLE: '/example'
} as const
```

2. Cấu hình router trong `router/router.tsx`:
   - Sử dụng `createBrowserRouter` để tạo router
   - Định nghĩa các routes với path và element
   - Bọc các protected routes bằng `ProtectedRoute`
   - Bọc các guest routes bằng `GuestRoute`
   - Thêm error route cho 404

```typescript
export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <AppLayout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <ProtectedRoute><Dashboard /></ProtectedRoute>
      }
    ]
  }
])
```

### Lazy Loading

1. Sử dụng `lazyImport` utility:
   - Import component một cách lazy
   - Tự động wrap với Suspense
   - Có thể tùy chỉnh loading fallback

```typescript
const { Login } = lazyImport(() => import("@/pages/auth/login"), "Login")
```

2. Cách sử dụng:
   - Import component cần lazy load
   - Sử dụng trong route configuration
   - Component sẽ được load khi route được truy cập

```typescript
{
  path: ROUTES.AUTH.LOGIN,
  element: <GuestRoute><Login /></GuestRoute>
}
```

## Menu System

### Menu Configuration

1. Định nghĩa menu trong `constants/side-bar.ts`:
   - Nhóm các menu items theo category
   - Mỗi item có title, url và icon
   - Sử dụng route constants cho urls

```typescript
export const MENU_ITEMS = [
  {
    group: "Main",
    children: [
      {
        title: "Dashboard",
        url: ROUTES.HOME,
        icon: Home
      }
    ]
  }
]
```

2. Cấu trúc menu:
   - Menu groups cho các category
   - Menu items cho các routes
   - Icons cho visual feedback
