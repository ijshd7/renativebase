# React Native / PocketBase Monorepo Starter

A **ready-to-use React Native monorepo** template with Expo, React Native Reusable components, TailwindCSS class support, Zustand for state management, React Hook Form for form validation, and a PocketBase backend. Includes a pre-built login flow so you can quickly scaffold a new cross-platform app.

## 🚀 Features

- **Cross-platform**: iOS, Android, and Web support via Expo
- **Modern UI Components**: React Native Reusables component library with shadcn/ui-style components
- **Styling**: NativeWind (TailwindCSS for React Native) with full class support
- **State Management**: Zustand for lightweight, performant state management
- **Form Handling**: React Hook Form with validation
- **Backend**: PocketBase for authentication, database, and real-time features
- **Authentication**: Pre-built login and signup flows with protected routes
- **Type Safety**: Full TypeScript support
- **Docker Support**: Containerized development and production environments
- **Monorepo Structure**: Organized codebase with separate UI and database services

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Docker** and **Docker Compose** (for containerized development)
- **Expo CLI** (optional, for direct development)
- **iOS Simulator** (for macOS users) or **Android Studio** (for Android development)

## 📁 Project Structure

```
renativebase/
├── db/                    # PocketBase backend service
│   ├── Dockerfile         # PocketBase container configuration
│   ├── package.json       # Backend dependencies
│   └── pb_data/           # PocketBase data directory (created at runtime)
│
├── ui/                    # React Native Expo application
│   ├── app/               # Expo Router file-based routing
│   │   ├── (authenticated)/  # Protected routes
│   │   └── (unauthenticated)/ # Public routes (login/signup)
│   ├── components/        # Reusable UI components
│   ├── config/            # Configuration files
│   ├── lib/               # Utility libraries
│   ├── services/          # API services (PocketBase client)
│   ├── stores/            # Zustand state stores
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Helper functions
│
├── docker-compose.yml     # Docker Compose configuration
├── Makefile              # Convenience commands
└── README.md             # This file
```

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd renativebase
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```bash
# PocketBase Configuration
DB_BASE_URL=http://localhost:8090

# Add other environment variables as needed
```

### 3. Install Dependencies

Install dependencies for both the UI and database services:

```bash
# Install UI dependencies
cd ui
npm install

# Install database dependencies (optional, for local development)
cd ../db
npm install

cd ..
```

## 🚦 Development

### Option 1: Docker Development (Recommended)

The easiest way to get started is using Docker Compose:

```bash
# Build and start all services
make up

# Or using docker-compose directly
docker-compose up --build
```

This will:
- Start PocketBase on `http://localhost:8090`
- Start the Expo development server (accessible via Expo Go app or web)

**Available Make Commands:**
- `make build` - Build Docker images
- `make up` - Start all services
- `make down` - Stop all services
- `make logs` - View service logs
- `make clean` - Clean up containers and volumes
- `make reset-db` - Reset the PocketBase database

### Option 2: Local Development

#### Start PocketBase Backend

```bash
cd db
npm run dev
```

PocketBase will start on `http://localhost:8090`. On first run, you'll need to:
1. Access the admin UI at `http://localhost:8090/_/`
2. Create an admin account
3. Set up your collections and authentication rules

#### Start Expo Development Server

In a new terminal:

```bash
cd ui
npm run dev
```

This will start the Expo development server. You can then:
- Press `i` to open iOS simulator
- Press `a` to open Android emulator
- Press `w` to open in web browser
- Scan the QR code with Expo Go app on your device

**Available UI Scripts:**
- `npm run dev` - Start Expo dev server with cache cleared
- `npm run android` - Start Android development
- `npm run ios` - Start iOS development
- `npm run web` - Start web development
- `npm run check` - Check for dependency updates
- `npm run doctor` - Run Expo doctor
- `npm run audit` - Run all health checks
- `npm run clean` - Clean Expo cache and node_modules

## 🔐 Authentication Flow

The app includes a pre-built authentication system:

1. **Unauthenticated Routes** (`app/(unauthenticated)/`):
   - Login page (`/`)
   - Signup page (if implemented)

2. **Authenticated Routes** (`app/(authenticated)/`):
   - Protected routes that require authentication
   - Automatically redirects to login if not authenticated

3. **Authentication State**:
   - Managed via Zustand (`stores/userStore.ts`)
   - PocketBase handles session persistence using AsyncStorage
   - Protected routes use Expo Router's `Stack.Protected` component

### Using Authentication

The PocketBase client is configured in `ui/services/pb.ts` and can be imported anywhere:

```typescript
import pb from '@/services/pb';

// Login
await pb.collection('users').authWithPassword(email, password);

// Signup
await pb.collection('users').create({ email, password, passwordConfirm });

// Check authentication
const isAuth = pb.authStore.isValid;

// Get current user
const user = pb.authStore.model;

// Logout
pb.authStore.clear();
```

## 🎨 Styling

This project uses **NativeWind** (TailwindCSS for React Native). You can use Tailwind classes directly in your components:

```tsx
<View className="flex-1 items-center justify-center bg-white">
  <Text className="text-2xl font-bold text-gray-900">Hello World</Text>
</View>
```

Configuration files:
- `ui/tailwind.config.js` - Tailwind configuration
- `ui/global.css` - Global styles
- `ui/components.json` - Component configuration for React Native Reusables

## 📦 Key Dependencies

### UI
- **Expo** (~54.0) - React Native framework
- **Expo Router** (~6.0) - File-based routing
- **React Native Reusables** - UI component library
- **NativeWind** (4.1) - TailwindCSS for React Native
- **Zustand** (5.0) - State management
- **React Hook Form** (7.64) - Form validation
- **PocketBase** (0.26) - Backend client

### Backend
- **PocketBase** (0.34.2) - Backend-as-a-Service
- **@dotenvx/dotenvx** - Environment variable management

## 🐳 Docker Configuration

### Database Service (`db/`)
- Runs PocketBase in a container
- Persists data in Docker volume `db_data`
- Exposes port `8090`
- Supports migrations and hooks (commented in Dockerfile)

### UI Service (`ui/`)
- Multi-stage build for web production
- Exposes port `8081` for web
- Uses environment variables from `.env`

## 🔧 Configuration

### Expo Configuration
Edit `ui/app.config.js` to customize:
- App name, slug, version
- Icons and splash screens
- Platform-specific settings
- Environment variables

### PocketBase Configuration
- Admin UI: `http://localhost:8090/_/`
- API: `http://localhost:8090/api/`
- Data stored in `db/pb_data/` (or Docker volume)

## 🧪 Development Tips

1. **Hot Reload**: Changes are automatically reflected in the app
2. **TypeScript**: Full type safety - check `ui/types/` for type definitions
3. **Component Library**: Browse `ui/components/ui/` for available components
4. **State Management**: Add new stores in `ui/stores/` following the Zustand pattern
5. **API Calls**: Use the PocketBase client from `ui/services/pb.ts`

## 📝 Next Steps

1. **Customize PocketBase**:
   - Set up collections in the admin UI
   - Configure authentication rules
   - Add hooks and migrations if needed

2. **Build Your App**:
   - Modify routes in `ui/app/`
   - Create new components in `ui/components/`
   - Add new stores in `ui/stores/`

3. **Deploy**:
   - Build for production using `expo build` or EAS Build
   - Deploy PocketBase to your preferred hosting service
   - Update `DB_BASE_URL` in production environment

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test on iOS, Android, and Web
4. Submit a pull request

## 📄 License

[Add your license here]

## 🆘 Troubleshooting

### Common Issues

**Port already in use:**
- Change ports in `docker-compose.yml` or stop conflicting services

**PocketBase connection errors:**
- Ensure `DB_BASE_URL` in `.env` matches your PocketBase URL
- Check that PocketBase is running and accessible

**Expo cache issues:**
- Run `npm run clean` in the `ui/` directory
- Restart the Expo dev server with `npm run dev` (clears cache)

**Docker issues:**
- Run `make clean` to reset containers
- Check Docker logs with `make logs`

---

**Happy coding! 🎉**
