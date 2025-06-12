# Custom Hooks

## Tổng quan

Custom hooks giúp tái sử dụng logic giữa các components và tuân thủ nguyên tắc DRY (Don't Repeat Yourself).

## Cấu trúc thư mục

```
src/hooks/
├── queries/          # Hooks cho data fetching với React Query
├── common/           # Hooks dùng chung cho toàn bộ ứng dụng
└── example/          # Hooks cho feature Example
```

## Queries Hooks

### 1. Auth Queries

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

// Sử dụng trong component
const { mutate: login } = useLogin()
login({ email: "test@example.com", password: "123456" })
```

### 2. Data Queries

```typescript
// hooks/queries/usePrimeContractorUserQuery.ts
export const usePrimeContractorUsers = (params: QueryParams) => {
  return useQuery({
    queryKey: ['prime-contractor-users', params],
    queryFn: () => getPrimeContractorUsers(params),
  })
}

// Sử dụng trong component
const { data, isLoading } = usePrimeContractorUsers({ page: 1, limit: 10 })
```

## Common Hooks

### 1. State Management

```typescript
// hooks/common/useStateWithGetter.ts
export const useStateWithGetter = <T>(initialValue: T) => {
  const [state, setState] = useState<T>(initialValue)
  const getState = useCallback(() => state, [state])
  
  return [state, setState, getState] as const
}

// Sử dụng trong component
const [value, setValue, getValue] = useStateWithGetter(0)
```

### 2. UI Hooks

```typescript
// hooks/common/use-mobile.ts
export const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  return isMobile
}

// Sử dụng trong component
const isMobile = useMobile()
```