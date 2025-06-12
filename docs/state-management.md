# State Management

## Tổng quan

Hệ thống sử dụng Zustand cho global state management và React Query cho server state management.

## Zustand Store

### 1. Tạo Store

```typescript
// stores/auth.store.ts
import { create } from "zustand"
import { persist } from "zustand/middleware"

type AuthState = {
  auth: TAuth | undefined
  isInitialize: "success" | "error" | "isLoading"
}

type AuthAction = {
  setAuth: (data: TAuth | undefined) => void
  setIsInitialize: (data: "success" | "error" | "isLoading") => void
  clearAuth: () => void
}

const useAuthStore = create<AuthState & AuthAction>()(
  persist(
    (set) => ({
      // State
      auth: undefined,
      isInitialize: "isLoading",
      
      // Actions
      setAuth: (user) => set((state) => ({ ...state, auth: user })),
      setIsInitialize: (data) => set((state) => ({ ...state, isInitialize: data })),
      clearAuth: () => {
        localStorage.clear()
        set((state) => ({ ...state, auth: undefined }))
        queryClient.setQueryData([USER_PROFILE], null)
        router.navigate(ROUTES.AUTH.LOGIN)
      },
    }),
    {
      name: "auth_store",
    },
  ),
)
```

### 2. Sử dụng Store

```typescript
// Trong component
const auth = useAuthStore.use.auth()
const setAuth = useAuthStore.use.setAuth()

// Sử dụng
if (auth) {
  console.log(auth.name)
}

// Update state
setAuth({ id: "1", name: "John", email: "john@example.com" })
```

## React Query

```typescript
// hooks/queries/useAuthQuery.ts
export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginData) => loginApi(data),
    onSuccess: (data) => {
      queryClient.setQueryData([USER_PROFILE], data)
    },
  })
}
```