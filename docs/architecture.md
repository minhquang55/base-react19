# Kiến trúc

## Tổng quan

Dự án được xây dựng theo kiến trúc module hóa, sử dụng các best practices của React và TypeScript. Kiến trúc này giúp code dễ bảo trì, mở rộng và test.

## Cấu trúc thư mục

```
src/
├── api/          # API calls và services
├── assets/       # Static assets
├── components/   # UI components
├── config/       # Configuration files
├── constants/    # Application constants
├── hooks/        # Custom hooks
├── layouts/      # Layout components
├── lib/          # Utility libraries
├── locales/      # i18n translations
├── pages/        # Page components
├── router/       # Routing configuration
├── schemas/      # Zod schemas
├── stores/       # Zustand stores
├── styles/       # Global styles
├── test/         # Test setup và utilities
├── __tests__/    # Test files
├── types/        # TypeScript types
└── utils/        # Utility functions
```

## Components

### Shared Components
```
components/
├── shared/           # Shared components
│   ├── ui/          # Base UI components
│   ├── common/      # Common components
│   ├── data-table/  # Reusable table components
│   └── routes/      # Route-related components
```

### Feature Components
```
components/
└── features/        # Feature-specific components
    ├── auth/        # Authentication components
    ├── dashboard/   # Dashboard components
    └── table/       # Table components
```

## State Management

### Global State (Zustand)
- Quản lý state toàn cục
- Tách thành các slices theo feature
- Sử dụng selectors để tối ưu performance

### Server State (React Query)
- Quản lý data fetching
- Caching và revalidation
- Optimistic updates

## Routing

- Sử dụng React Router v7
- Protected routes
- Lazy loading
- Route-based code splitting

## API Layer

- Axios instance với interceptors
- API services được tổ chức theo feature
- Error handling và retry logic
- Type-safe API calls

## Styling

- Tailwind CSS cho styling
- CSS Modules cho component-specific styles
- Theme customization
- Responsive design

## Testing

- Vitest cho unit testing
- React Testing Library cho component testing
- MSW cho API mocking
- Coverage reporting

## Build & Development

- Vite cho development và build
- Environment variables
- Code splitting
- Tree shaking

## Performance Optimization

- Code splitting và lazy loading thông qua React.lazy và Suspense
- Route-based code splitting
- React Query cho data caching và revalidation
- Axios interceptors cho request/response transformation

## Security

- Authentication
- Authorization
- CSRF protection
- XSS prevention

## Internationalization

- i18next cho đa ngôn ngữ
- Lazy loading translations
- RTL support

## Error Handling

- Global error boundary
- API error handling
- Form validation
- Error logging

## Best Practices

1. **Code Organization**
   - Feature-based structure
   - Clear separation of concerns
   - DRY principle

2. **Type Safety**
   - Strict TypeScript
   - Zod validation
   - Type inference

3. **Performance**
   - Code splitting
   - Lazy loading
   - Memoization

4. **Testing**
   - Unit tests
   - Integration tests
   - E2E tests

5. **Security**
   - Authentication
   - Authorization
   - Data validation

## Tiếp theo

- [Xác thực](authentication.md)
- [Phân quyền](permission.md)
- [Routing & Menu](route.md) 