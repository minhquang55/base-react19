# API & Services

## Tổng quan

Hệ thống sử dụng Axios cho HTTP requests và được tổ chức theo feature-based architecture.

## Cách tạo API Method

### 1. Định nghĩa Types

```typescript
// types/auth.type.ts
export type Profile = {
  id: string
  email: string
  name: string
}

// types/common.type.ts
export type Response<T> = {
  data: T
  message: string
  status: number
}
```

### 2. Định nghĩa Endpoints

```typescript
// constants/api.ts
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile'
  }
} as const
```

### 3. Tạo API Methods

```typescript
// api/auth/authApi.ts
import { API_ENDPOINTS } from "@/constants/api"
import { http } from "@/lib/http"
import type { LoginDTO } from "@/schemas/auth.schema"
import type { Profile } from "@/types/auth.type"
import type { Response } from "@/types/common.type"

// GET Method
export const getUserProfile = async (): Promise<Response<Profile>> => {
  return http.get<Response<Profile>>(API_ENDPOINTS.AUTH.PROFILE)
}

// POST Method
export const loginApi = (data: LoginDTO) => {
  return http.post<Response<LoginResponse>>(API_ENDPOINTS.AUTH.LOGIN, {
    data,
  })
}

// POST Method (không có body)
export const logoutApi = () => {
  return http.post(API_ENDPOINTS.AUTH.LOGOUT)
}
```

### 4. Sử dụng trong Components/Hooks

```typescript
// hooks/queries/useAuthQuery.ts
export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginDTO) => loginApi(data),
    onSuccess: (data) => {
      queryClient.setQueryData([USER_PROFILE], data)
    },
  })
}

// Trong component
const { mutate: login } = useLogin()
login({ email: "test@example.com", password: "123456" })
```