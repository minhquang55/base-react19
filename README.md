# React Base

A modern React application template with TypeScript, Vite, and best practices.

## 🚀 Features

- ⚡️ [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- 🔥 [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- 💎 [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- 📦 [pnpm](https://pnpm.io/) - Fast, disk space efficient package manager
- 🎨 [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- 🔍 [ESLint](https://eslint.org/) - Pluggable JavaScript linter
- 💖 [Prettier](https://prettier.io/) - Code formatter
- 🧪 [Vitest](https://vitest.dev/) - Testing framework
- 🌐 [i18next](https://www.i18next.com/) - Internationalization framework
- 📊 [React Query](https://tanstack.com/query/latest) - Data fetching and caching
- 🎯 [Zustand](https://github.com/pmndrs/zustand) - State management
- 📝 [React Hook Form](https://react-hook-form.com/) - Form validation
- 🔒 [Zod](https://zod.dev/) - TypeScript-first schema validation

## 📦 Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Lint code
pnpm lint

# Format code
pnpm format
```

## 🏗 Project Structure

```
src/
├── api/          # API calls and services
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
├── test/         # Test setup and utilities
├── types/        # TypeScript types
└── utils/        # Utility functions
```

## 🧪 Testing

The project uses Vitest and React Testing Library for testing. Tests are organized in the following structure:

```
src/
├── __tests__/
│   ├── unit/     # Unit tests
│   ├── integration/  # Integration tests
│   └── e2e/      # End-to-end tests
```

## 📝 Coding Conventions

- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Write tests for new features
- Use functional components with hooks
- Follow the project's file structure
- Use meaningful variable and function names
- Write clear and concise comments

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
