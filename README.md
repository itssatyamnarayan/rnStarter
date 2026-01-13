# React Native Starter Kit

A production-ready, scalable React Native starter template with TypeScript, following industry-standard architecture and best practices.

## 🚀 Features

- **TypeScript** - Full type safety throughout the codebase
- **Type-safe Navigation** - React Navigation with typed params and screens
- **State Management** - Zustand with persistence middleware
- **API Layer** - Axios with interceptors, token refresh, and typed responses
- **Theme System** - Light/Dark theme support with customizable colors
- **i18n** - Internationalization ready with i18next
- **Reusable Components** - Production-ready UI components
- **Custom Hooks** - Common patterns (debounce, throttle, form handling)
- **Complete Auth Flow** - Login, Signup, Password Reset, Email Verification

## 📁 Project Structure

```
src/
├── app/                          # App entry & navigation
│   ├── navigation/               # Navigation configuration
│   │   ├── auth.stack.tsx        # Auth stack (unauthenticated)
│   │   ├── app.stack.tsx         # App stack (authenticated)
│   │   ├── app.tabs.tsx          # Bottom tab navigator
│   │   ├── root.tsx              # Root navigator with auth switching
│   │   └── index.ts              # Navigation exports
│   ├── App.tsx                   # Main App component
│   ├── providers.tsx             # App providers wrapper
│   └── index.ts                  # App exports
│
├── components/                   # Reusable UI components
│   └── shared/                   # Shared components
│       ├── button/               # Button component
│       ├── input/                # Input component
│       ├── loader/               # Loader component
│       ├── modal/                # Modal component
│       ├── bottom-sheet/         # Bottom sheet component
│       ├── dropdown/             # Dropdown component
│       ├── Fonts.tsx             # Typography components
│       └── index.ts              # Component exports
│
├── constants/                    # App constants
│   ├── routes.ts                 # Route names
│   ├── regex.ts                  # Validation patterns
│   └── limits.ts                 # App limits
│
├── hooks/                        # Custom React hooks
│   ├── useDebounce.ts            # Debounce hook
│   ├── useThrottle.ts            # Throttle hook
│   ├── useLoading.ts             # Loading state hook
│   ├── useForm.ts                # Form management hook
│   └── index.ts                  # Hook exports
│
├── i18n/                         # Internationalization
│   ├── locales/                  # Translation files
│   │   └── en.json               # English translations
│   └── index.ts                  # i18n configuration
│
├── screens/                      # App screens
│   ├── auth/                     # Authentication screens
│   │   ├── login/                # Login screen
│   │   ├── signup/               # Signup screen
│   │   ├── forgot-password/      # Forgot password screen
│   │   ├── verify-email/         # Email verification screen
│   │   ├── profile-setup/        # Profile setup screen
│   │   └── index.ts              # Auth screen exports
│   ├── tabs/                     # Tab screens
│   │   ├── home/                 # Home tab screen
│   │   ├── profile/              # Profile tab screen
│   │   └── index.ts              # Tab screen exports
│   └── index.ts                  # Screen exports
│
├── services/                     # API & services layer
│   ├── api/                      # API configuration
│   │   ├── axios.ts              # Axios instance
│   │   ├── interceptors.ts       # Request/response interceptors
│   │   └── endPoints.ts          # API endpoints
│   ├── types/                    # Service types
│   │   ├── auth.types.ts         # Auth types
│   │   └── user.types.ts         # User types
│   ├── auth.api.ts               # Auth API functions
│   ├── user.api.ts               # User API functions
│   └── index.ts                  # Service exports
│
├── store/                        # State management (Zustand)
│   ├── auth.store.ts             # Auth store
│   └── index.ts                  # Store exports
│
├── theme/                        # Theme configuration
│   ├── colors/                   # Color definitions
│   │   ├── palette.ts            # Color palette
│   │   ├── light.ts              # Light theme
│   │   └── dark.ts               # Dark theme
│   ├── spacing.ts                # Spacing scale
│   ├── fonts.ts                  # Typography
│   ├── globalStyle.ts            # Global styles
│   └── index.ts                  # Theme exports
│
├── types/                        # TypeScript types
│   ├── api.types.ts              # API types
│   ├── navigation.types.ts       # Navigation types
│   └── index.ts                  # Type exports
│
└── assets/                       # Static assets (fonts, images)
```

## 📦 Required Dependencies

Install these packages to use all features:

### Core Dependencies

```bash
# Navigation
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context

# State Management
npm install zustand

# HTTP Client
npm install axios

# Storage
npm install @react-native-async-storage/async-storage

# Gestures
npm install react-native-gesture-handler

# Network Connectivity
npm install @react-native-community/netinfo
```

### Optional Dependencies

```bash
# Internationalization (if using i18n)
npm install i18next react-i18next react-native-localize

# Icons (recommended)
npm install react-native-vector-icons
# or
npm install @expo/vector-icons  # for Expo

# Forms (alternative to useForm hook)
npm install react-hook-form yup @hookform/resolvers
```

### iOS Setup

```bash
cd ios && pod install && cd ..
```

## 🏃 Getting Started

1. **Clone and install dependencies:**

```bash
git clone <repository-url>
cd rnStarter
npm install
cd ios && pod install && cd ..
```

2. **Update the root App entry point:**

Replace the contents of `App.tsx` in your project root:

```tsx
// App.tsx (root)
export { default } from './src/app';
```

3. **Run the app:**

```bash
# iOS
npm run ios

# Android
npm run android
```

## 🔐 Authentication Flow

The starter includes a complete authentication flow:

1. **Login** - Email/password authentication
2. **Signup** - User registration with validation
3. **Forgot Password** - Password reset via email
4. **Verify Email** - OTP-based email verification
5. **Profile Setup** - Post-registration profile completion

### Auth State Management

```typescript
import { useAuthStore, useUser, useIsAuthenticated } from './src/store';

// In your component
const user = useUser();
const isAuthenticated = useIsAuthenticated();
const { login, logout, signup } = useAuthStore();

// Login
await login('email@example.com', 'password');

// Logout
await logout();
```

## 🎨 Theming

### Using Theme Colors

```typescript
import { light, dark, spacing } from './src/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: light.background,
    padding: spacing.md,
  },
  text: {
    color: light.textPrimary,
  },
});
```

### Theme Switching

The root navigator automatically uses the system color scheme:

```typescript
const colorScheme = useColorScheme();
const isDark = colorScheme === 'dark';
```

## 🧭 Navigation

### Type-Safe Navigation

```typescript
import type { AuthScreenProps, AppScreenProps, TabScreenProps } from './src/types';

// Auth screen props
type Props = AuthScreenProps<'Login'>;

// Navigate with type safety
navigation.navigate('VerifyEmail', { email: 'user@example.com' });
```

### Adding New Screens

1. Add the screen to the appropriate param list in `types/navigation.types.ts`
2. Create the screen component in the appropriate folder
3. Register it in the navigator

## 📝 Components

### CustomButton

The `CustomButton` component includes:
- **Double-press prevention** - Prevents accidental multiple taps
- **Network-aware** - Automatically disabled when offline
- **Async handling** - Auto-loading state for async operations
- **Multiple variants** - primary, secondary, outline, ghost, danger

```tsx
import { CustomButton } from './src/components/shared';

// Basic usage
<CustomButton title="Submit" onPress={handleSubmit} />

// With async operation (auto-loading state)
<CustomButton
  title="Save"
  onPress={async () => {
    await saveData(); // Button stays disabled until complete
  }}
/>

// Disable network check for offline actions
<CustomButton
  title="Cache Data"
  disableWhenOffline={false}
  onPress={cacheLocally}
/>

// Different variants
<CustomButton title="Cancel" variant="outline" onPress={handleCancel} />
<CustomButton title="Delete" variant="danger" onPress={handleDelete} />
```

### NetworkAwareView

Wrap screens or views to show "No Internet" when offline:

```tsx
import { NetworkAwareView } from './src/components/shared';

<NetworkAwareView>
  <YourContent />
</NetworkAwareView>

// With custom message
<NetworkAwareView 
  offlineTitle="Connection Required"
  offlineMessage="This feature requires internet access"
>
  <YourContent />
</NetworkAwareView>
```

### NoInternet

Standalone "No Internet" component:

```tsx
import { NoInternet } from './src/components/shared';

<NoInternet
  onRetry={() => refetch()}
  title="Oops!"
  message="Please check your connection"
/>
```

### Input

```tsx
import { Input } from './src/components/shared';

<Input
  label="Email"
  value={email}
  onChangeText={setEmail}
  placeholder="Enter email"
  keyboardType="email-address"
  error={errors.email}
  leftIcon={<MailIcon />}
/>
```

### Modal

```tsx
import { Modal } from './src/components/shared';

<Modal
  visible={isVisible}
  onClose={() => setVisible(false)}
  title="Confirm Action"
>
  <Text>Modal content here</Text>
</Modal>
```

### Bottom Sheet

```tsx
import { BottomSheet } from './src/components/shared';

<BottomSheet
  visible={isVisible}
  onClose={() => setVisible(false)}
  height={300}
>
  <Text>Sheet content here</Text>
</BottomSheet>
```

## 🪝 Custom Hooks

### useForm

```typescript
import { useForm } from './src/hooks';

const {
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
} = useForm({
  initialValues: { email: '', password: '' },
  validationSchema: {
    email: (v) => (!v ? 'Required' : !isEmail(v) ? 'Invalid email' : undefined),
    password: (v) => (!v ? 'Required' : v.length < 8 ? 'Too short' : undefined),
  },
  onSubmit: async (values) => {
    await login(values.email, values.password);
  },
});
```

### useDebounce

```typescript
import { useDebounce, useDebouncedCallback } from './src/hooks';

// Debounce a value
const debouncedSearch = useDebounce(searchTerm, 300);

// Debounce a callback
const handleSearch = useDebouncedCallback((term: string) => {
  searchApi(term);
}, 300);
```

### useLoading

```typescript
import { useLoading } from './src/hooks';

const { isLoading, startLoading, stopLoading, withLoading } = useLoading();

// Wrap async operations
await withLoading(async () => {
  await fetchData();
});
```

### useNetworkAwareRequest

Make API calls with automatic network checking:

```typescript
import { useNetworkAwareRequest } from './src/hooks';

const { execute, isLoading, error, isOnline } = useNetworkAwareRequest();

const fetchData = async () => {
  const result = await execute(() => api.get('/data'));
  if (result) {
    // Handle success
  }
};

// Shows alert automatically if offline
```

## 🌐 Network Handling

The starter kit includes comprehensive network handling:

### Network Provider

Automatically monitors connectivity and shows toast notifications:

```tsx
// Already included in providers.tsx
<NetworkProvider showToast={true} toastDuration={3000}>
  {children}
</NetworkProvider>
```

### Network Store

Access network status anywhere in your app:

```typescript
import { useIsOnline, useNetworkStore } from './src/store';

// Simple online check
const isOnline = useIsOnline();

// Detailed network info
const { isConnected, isInternetReachable, connectionType } = useNetworkStore();

// Conditional rendering
if (!isOnline) {
  return <NoInternet onRetry={refetch} />;
}
```

### Network-Aware Components

The `CustomButton` automatically:
- Disables when offline (configurable)
- Shows "No Internet" text when offline
- Prevents double-press
- Shows loading state for async operations

Screens wrapped with `NetworkAwareView` automatically show "No Internet" when offline.

## 🌐 API Layer

### Making API Calls

```typescript
import { api } from './src/services';

// GET request
const users = await api.get<User[]>('/users');

// POST request
const result = await api.post<LoginResponse>('/auth/login', {
  email,
  password,
});

// File upload
const avatar = await api.uploadFile('/upload', file);
```

### API Services

```typescript
import * as authApi from './src/services/auth.api';
import * as userApi from './src/services/user.api';

// Auth
await authApi.login({ email, password });
await authApi.signup({ email, password, firstName, lastName });
await authApi.logout();

// User
const profile = await userApi.getProfile();
await userApi.updateProfile({ firstName: 'John' });
```

## 🌍 Internationalization

### Using Translations

```typescript
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();

// In JSX
<Text>{t('auth.login')}</Text>
<Text>{t('home.greeting', { name: 'John' })}</Text>
```

### Changing Language

```typescript
import { changeLanguage, getCurrentLanguage } from './src/i18n';

// Get current language
const lang = getCurrentLanguage();

// Change language
await changeLanguage('es');
```

## 📱 Screens Overview

### Auth Screens

| Screen | Path | Description |
|--------|------|-------------|
| Login | `/screens/auth/login` | User login with email/password |
| Signup | `/screens/auth/signup` | New user registration |
| Forgot Password | `/screens/auth/forgot-password` | Password reset request |
| Verify Email | `/screens/auth/verify-email` | OTP email verification |
| Profile Setup | `/screens/auth/profile-setup` | Post-registration profile |

### Tab Screens

| Screen | Path | Description |
|--------|------|-------------|
| Home | `/screens/tabs/home` | Main home screen |
| Profile | `/screens/tabs/profile` | User profile & settings |

## 🛠 Customization

### Adding a New Store

```typescript
// src/store/myFeature.store.ts
import { create } from 'zustand';

interface MyFeatureState {
  data: string[];
  setData: (data: string[]) => void;
}

export const useMyFeatureStore = create<MyFeatureState>((set) => ({
  data: [],
  setData: (data) => set({ data }),
}));
```

### Adding a New API Service

```typescript
// src/services/myFeature.api.ts
import { api, API_ENDPOINTS } from './api';

export const getItems = () => api.get('/items');
export const createItem = (data) => api.post('/items', data);
```

## 📋 Best Practices

1. **Type everything** - Use TypeScript types for props, state, and API responses
2. **Keep components small** - Split large components into smaller, reusable pieces
3. **Use the theme** - Always use theme colors and spacing, not hardcoded values
4. **Handle errors** - Always handle API errors and show user-friendly messages
5. **Test navigation** - Ensure all navigation flows work correctly
6. **Optimize performance** - Use `useMemo`, `useCallback`, and `React.memo` appropriately

## 🐛 Troubleshooting

### Common Issues

**Metro bundler cache:**
```bash
npm start -- --reset-cache
```

**iOS build issues:**
```bash
cd ios
pod deintegrate
pod install
cd ..
```

**Android build issues:**
```bash
cd android
./gradlew clean
cd ..
```

## 📄 License

MIT License - Feel free to use this starter for any project.

## 🤝 Contributing

Contributions are welcome! Please read the contributing guidelines before submitting a PR.
