# Bắt đầu

## Yêu cầu hệ thống

- Node.js >= 18.0.0
- pnpm >= 8.0.0

## Cài đặt

1. Clone repository:
```bash
git clone https://github.com/your-username/react-base.git
cd react-base
```

2. Cài đặt dependencies:
```bash
pnpm install
```

3. Tạo file môi trường:
```bash
cp .env.example .env
```

4. Chạy development server:
```bash
pnpm dev
```

## Cấu trúc Project

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
├── test/         # Test setup và utilities
├── types/        # TypeScript types
└── utils/        # Utility functions
```

## Các lệnh thường dùng

```bash
# Chạy development server
pnpm dev

# Build cho production
pnpm build

# Preview production build
pnpm preview

# Chạy tests
pnpm test

# Chạy tests với coverage
pnpm test:coverage

# Lint code
pnpm lint

# Format code
pnpm format
```

## Công nghệ sử dụng

- [Vite](https://vitejs.dev/) - Build tool
- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type checking
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [React Query](https://tanstack.com/query/latest) - Data fetching
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [React Hook Form](https://react-hook-form.com/) - Form handling
- [Zod](https://zod.dev/) - Schema validation
- [i18next](https://www.i18next.com/) - Internationalization

## Quy ước Code

1. **TypeScript**
   - Sử dụng strict mode
   - Định nghĩa types/interfaces cho tất cả props
   - Tránh sử dụng `any`

2. **Components**
   - Sử dụng functional components
   - Tách logic vào custom hooks
   - Sử dụng React.memo khi cần thiết

3. **Styling**
   - Sử dụng Tailwind CSS
   - Tuân thủ BEM naming convention
   - Tách styles vào modules

4. **Testing**
   - Viết tests cho tất cả components
   - Sử dụng React Testing Library
   - Đạt coverage tối thiểu 80%

## Tiếp theo

- [Kiến trúc](architecture.md)
- [Xác thực](authentication.md)
- [Phân quyền](permission.md) 