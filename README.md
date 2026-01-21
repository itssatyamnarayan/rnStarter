# React Native Starter Kit

A comprehensive React Native starter template with pre-configured features and reusable components to accelerate your development workflow. This kit includes authentication, navigation, theming, internationalization, form handling, and much more out of the box.

## 🚀 Features

- ✅ **Navigation Setup** - React Navigation with Stack & Tab navigation pre-configured
- ✅ **Theme System** - Dark/Light mode with custom theme support
- ✅ **Authentication** - Complete auth flow with login/signup screens
- ✅ **Internationalization (i18n)** - Multi-language support with react-i18next
- ✅ **Form Handling** - React Hook Form integration with custom form components
- ✅ **State Management** - Custom stores for auth and network state
- ✅ **Custom Components** - Reusable UI components (Buttons, Inputs, Dropdowns, etc.)
- ✅ **Network Monitoring** - Built-in network connectivity detection
- ✅ **Custom Hooks** - Useful hooks (useDebounce, useThrottle, useLoading, etc.)
- ✅ **SVG Support** - SVG icons with auto-generation script
- ✅ **Google Fonts** - Custom font support for Android and iOS
- ✅ **TypeScript** - Full TypeScript support with path aliases
- ✅ **Haptic Feedback** - Native haptic feedback for better UX
- ✅ **Fast Image** - Optimized image loading with caching

---

## 📁 Project Structure

```
rnStarter/
├── src/
│   ├── app/                    # Main app entry and providers
│   │   ├── App.tsx
│   │   ├── providers.tsx
│   │   └── navigation/         # Navigation configuration
│   ├── assets/                 # Images, fonts, and icons
│   │   ├── fonts/              # Custom fonts
│   │   └── icons/              # SVG icons
│   ├── components/             # Reusable components
│   │   └── shared/
│   │       ├── CustomButton.tsx
│   │       ├── CustomText.tsx
│   │       ├── AppImage.tsx
│   │       ├── Icon.tsx
│   │       ├── bottom-sheet/
│   │       ├── dropdown/
│   │       ├── form-input/     # Form input components
│   │       ├── loader/
│   │       ├── modal/
│   │       └── network-aware-view/
│   ├── constants/              # App constants
│   │   ├── device.ts
│   │   ├── limits.ts
│   │   ├── regex.ts
│   │   └── routes.ts
│   ├── context/                # React Context providers
│   │   └── ThemeContext.tsx
│   ├── hooks/                  # Custom hooks
│   │   ├── useDebounce.ts
│   │   ├── useThrottle.ts
│   │   ├── useLoading.ts
│   │   └── useForm.ts
│   ├── i18n/                   # Internationalization
│   │   ├── index.ts
│   │   ├── resources.ts
│   │   └── locales/            # Translation files
│   ├── screens/                # Screen components
│   │   ├── auth/               # Authentication screens
│   │   ├── app/                # Main app screens
│   │   └── tab/                # Tab screens
│   ├── services/               # API services
│   │   ├── api/
│   │   ├── auth.api.ts
│   │   └── user.api.ts
│   ├── store/                  # State management
│   │   ├── auth.store.ts
│   │   └── network.store.ts
│   ├── theme/                  # Theme configuration
│   │   ├── dark.ts
│   │   ├── light.ts
│   │   ├── fonts.ts
│   │   ├── typography.ts
│   │   ├── palette.ts
│   │   ├── spacing.ts
│   │   └── layout.ts
│   ├── types/                  # TypeScript types
│   └── utils/                  # Utility functions
│       └── normalize.ts        # Responsive size normalization
├── scripts/
│   └── generate-icons.js       # Auto-generate icon exports
└── ...
```

---

## 🛠️ Setup Instructions

### Prerequisites

- Node.js >= 20
- React Native CLI
- Xcode (for iOS)
- Android Studio (for Android)

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd rnStarter
   ```

2. **Install dependencies**

   ```bash
   yarn install
   # or
   npm install
   ```

3. **Install iOS dependencies (macOS only)**
   ```bash
   cd ios
   pod install
   cd ..
   ```

---

## ⚙️ Configuration

### 1. Path Aliases Setup

Path aliases are already configured for cleaner imports. You can use `@/` to reference the `src` directory.

**Files configured:** (Custom configuration marked with `//by own` comments)

- **[babel.config.js](file:///Users/sstpc/Desktop/Satyam/Others/rnStarter/babel.config.js)** - Module resolver plugin configured

  ```javascript
  alias: {
    '@': './src',
  }
  ```

- **[tsconfig.json](file:///Users/sstpc/Desktop/Satyam/Others/rnStarter/tsconfig.json)** - TypeScript path mapping

  ```json
  "paths": {
    "@/*": ["src/*"]
  }
  ```

- **[metro.config.js](file:///Users/sstpc/Desktop/Satyam/Others/rnStarter/metro.config.js)** - Metro bundler resolver
  ```javascript
  extraNodeModules: {
    '@': path.resolve(__dirname, 'src'),
  }
  ```

### 2. Google Fonts Setup for Android and iOS

Custom fonts are located in `src/assets/fonts/`.

**Configuration file:** [react-native.config.js](file:///Users/sstpc/Desktop/Satyam/Others/rnStarter/react-native.config.js)

```javascript
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./src/assets/fonts/'],
};
```

**Run this command to link fonts:**

```bash
# For latest yarn
yarn dlx react-native-asset

# OR for npm
npx react-native-asset
```

**Reset cache and run:**

```bash
npx react-native start --reset-cache
```

### 3. SVG Icon Setup

SVG support is configured using `react-native-svg` and `react-native-svg-transformer`.

**Files configured:**

- **[metro.config.js](file:///Users/sstpc/Desktop/Satyam/Others/rnStarter/metro.config.js)** - SVG transformer configuration
- **[declarations.d.ts](file:///Users/sstpc/Desktop/Satyam/Others/rnStarter/declarations.d.ts)** - TypeScript declaration for SVG imports

**Auto-generate icon exports:**

Place your SVG files in `src/assets/icons/` and run:

```bash
yarn generate:icons
# or
npm run generate:icons
```

This will auto-generate an `index.ts` file with typed icon exports. See [scripts/generate-icons.js](file:///Users/sstpc/Desktop/Satyam/Others/rnStarter/scripts/generate-icons.js) for implementation.

### 4. App Icon Setup

#### For Android

**Option 1: Manual Copy**

1. Go to [icon.kitchen](https://icon.kitchen) or [appicon.co](https://appicon.co) and create your icon
2. Download and unzip the file
3. Copy files from `android/res` in the downloaded folder
4. Paste to `android/app/src/main/res` in your project
5. Remove this line from `AndroidManifest.xml`:
   ```xml
   android:roundIcon="@mipmap/ic_launcher"
   ```
6. Refresh the app

**Option 2: Android Studio**

1. Open project in Android Studio
2. Go to `res` → Right click → New → Image Asset
3. Paste your image path
4. Follow the wizard

#### For iOS

1. Unzip the downloaded file and navigate to iOS folder
2. Run:
   ```bash
   cd ios
   xed .
   ```
3. In Xcode, click on your project dropdown → Go to `YourProject/Images`
4. Click on `AppIcon`
5. Drag and drop images according to their pt size
6. Set the 1024pt marketing image
7. Uninstall the app and run again

---

## 🎨 Components

### CustomButton

A versatile button component with multiple variants, loading states, haptic feedback, and icon support.

**Location:** [src/components/shared/CustomButton.tsx](file:///Users/sstpc/Desktop/Satyam/Others/rnStarter/src/components/shared/CustomButton.tsx)

**Usage:**

```tsx
import CustomButton from '@/components/shared/CustomButton';

// Basic usage
<CustomButton
  title="Click Me"
  onPress={() => console.log('Pressed')}
/>

// With variants
<CustomButton
  title="Primary Button"
  variant="primary"
/>

<CustomButton
  title="Outline Button"
  variant="outline"
/>

<CustomButton
  title="Danger Button"
  variant="danger"
/>

<CustomButton
  title="Ghost Button"
  variant="ghost"
/>

// With loading state
<CustomButton
  title="Submit"
  loading={isLoading}
  onPress={handleSubmit}
/>

// With icons
<CustomButton
  title="Next"
  rightIcon={<Icon name="arrow-right" />}
/>

// Full width
<CustomButton
  title="Continue"
  fullWidth
/>

// Custom styling
<CustomButton
  title="Custom"
  backgroundColor="#FF6B6B"
  borderRadius={24}
  containerStyle={{ marginTop: 20 }}
  textStyle={{ fontSize: 18 }}
/>

// With haptic feedback
<CustomButton
  title="Heavy Haptic"
  haptic="heavy"
/>
```

**Props:**

| Prop              | Type                                                  | Default     | Description             |
| ----------------- | ----------------------------------------------------- | ----------- | ----------------------- |
| `title`           | `string`                                              | -           | Button text             |
| `onPress`         | `() => void \| Promise<void>`                         | -           | Press handler           |
| `variant`         | `'primary' \| 'outline' \| 'danger' \| 'ghost'`       | `'primary'` | Button style variant    |
| `loading`         | `boolean`                                             | `false`     | Show loading spinner    |
| `disabled`        | `boolean`                                             | `false`     | Disable button          |
| `fullWidth`       | `boolean`                                             | `false`     | Make button full width  |
| `align`           | `'left' \| 'center' \| 'right'`                       | `'center'`  | Button alignment        |
| `leftIcon`        | `ReactNode`                                           | -           | Icon on the left        |
| `rightIcon`       | `ReactNode`                                           | -           | Icon on the right       |
| `haptic`          | `'light' \| 'medium' \| 'heavy' \| 'soft' \| 'rigid'` | `'light'`   | Haptic feedback type    |
| `backgroundColor` | `string`                                              | -           | Custom background color |
| `borderRadius`    | `number`                                              | `16`        | Border radius           |
| `containerStyle`  | `StyleProp<ViewStyle>`                                | -           | Custom container styles |
| `textStyle`       | `StyleProp<TextStyle>`                                | -           | Custom text styles      |

---

### CustomText

A text component that respects the app's typography system and theme.

**Location:** [src/components/shared/CustomText.tsx](file:///Users/sstpc/Desktop/Satyam/Others/rnStarter/src/components/shared/CustomText.tsx)

**Usage:**

```tsx
import CustomText from '@/components/shared/CustomText';

<CustomText variant="h1" weight="bold">
  Heading 1
</CustomText>

<CustomText variant="body" weight="400">
  Body text
</CustomText>

<CustomText variant="button" weight="500">
  Button Text
</CustomText>
```

---

### AppImage

Optimized image component using `react-native-fast-image` for better performance and caching.

**Location:** [src/components/shared/AppImage.tsx](file:///Users/sstpc/Desktop/Satyam/Others/rnStarter/src/components/shared/AppImage.tsx)

**Usage:**

```tsx
import AppImage from '@/components/shared/AppImage';

// Remote image
<AppImage
  source={{ uri: 'https://example.com/image.jpg' }}
  style={{ width: 200, height: 200 }}
/>

// Local image
<AppImage
  source={require('@/assets/images/logo.png')}
  style={{ width: 100, height: 100 }}
/>
```

---

### Icon

SVG icon component with type-safe icon names.

**Location:** [src/components/shared/Icon.tsx](file:///Users/sstpc/Desktop/Satyam/Others/rnStarter/src/components/shared/Icon.tsx)

**Usage:**

```tsx
import Icon from '@/components/shared/Icon';

<Icon name="home" width={24} height={24} color="#000" />;
```

---

### FormInput

Comprehensive form input component with multiple variants (text, dropdown, date/time, country code, toggle).

**Location:** [src/components/shared/form-input/](file:///Users/sstpc/Desktop/Satyam/Others/rnStarter/src/components/shared/form-input/)

**Variants:**

1. **TextInputVariant** - Standard text input
2. **DropdownVariant** - Dropdown selector
3. **DateTimeVariant** - Date and time picker
4. **CountryCodeVariant** - Country code selector
5. **ToggleVariant** - Toggle switch

**Usage with React Hook Form:**

```tsx
import { FormInput } from '@/components/shared/form-input';
import { useForm } from 'react-hook-form';

const MyForm = () => {
  const { control } = useForm();

  return (
    <>
      {/* Text Input */}
      <FormInput
        name="email"
        control={control}
        variant="text"
        placeholder="Enter email"
        rules={{ required: 'Email is required' }}
      />

      {/* Dropdown */}
      <FormInput
        name="country"
        control={control}
        variant="dropdown"
        placeholder="Select Country"
        data={[
          { label: 'USA', value: 'us' },
          { label: 'Canada', value: 'ca' },
        ]}
      />

      {/* Date Picker */}
      <FormInput
        name="birthdate"
        control={control}
        variant="datetime"
        mode="date"
      />

      {/* Country Code */}
      <FormInput name="country_code" control={control} variant="country" />

      {/* Toggle */}
      <FormInput name="notifications" control={control} variant="toggle" />
    </>
  );
};
```

---

### Modal

Custom modal component for dialogs and overlays.

**Location:** [src/components/shared/modal/](file:///Users/sstpc/Desktop/Satyam/Others/rnStarter/src/components/shared/modal/)

---

### BottomSheet

Bottom sheet component for slides-up content.

**Location:** [src/components/shared/bottom-sheet/](file:///Users/sstpc/Desktop/Satyam/Others/rnStarter/src/components/shared/bottom-sheet/)

---

### Loader

Loading indicator component.

**Location:** [src/components/shared/loader/](file:///Users/sstpc/Desktop/Satyam/Others/rnStarter/src/components/shared/loader/)

---

### Network Components

Components for handling network connectivity:

- **NetworkProvider** - Context provider for network state
- **NetworkAwareView** - Component that responds to network changes
- **NoInternet** - No internet connection screen

**Locations:**

- [src/components/shared/network-provider/](file:///Users/sstpc/Desktop/Satyam/Others/rnStarter/src/components/shared/network-provider/)
- [src/components/shared/network-aware-view/](file:///Users/sstpc/Desktop/Satyam/Others/rnStarter/src/components/shared/network-aware-view/)
- [src/components/shared/no-internet/](file:///Users/sstpc/Desktop/Satyam/Others/rnStarter/src/components/shared/no-internet/)

---

## 🎣 Custom Hooks

### useDebounce

Debounce a value with a delay.

**Location:** [src/hooks/useDebounce.ts](file:///Users/sstpc/Desktop/Satyam/Others/rnStarter/src/hooks/useDebounce.ts)

**Usage:**

```tsx
import { useDebounce } from '@/hooks';

const MyComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    // API call with debounced value
    fetchResults(debouncedSearch);
  }, [debouncedSearch]);

  return <TextInput value={searchTerm} onChangeText={setSearchTerm} />;
};
```

---

### useThrottle

Throttle a value to limit updates.

**Location:** [src/hooks/useThrottle.ts](file:///Users/sstpc/Desktop/Satyam/Others/rnStarter/src/hooks/useThrottle.ts)

**Usage:**

```tsx
import { useThrottle } from '@/hooks';

const throttledValue = useThrottle(value, 1000);
```

---

### useLoading

Manage loading state for async operations.

**Location:** [src/hooks/useLoading.ts](file:///Users/sstpc/Desktop/Satyam/Others/rnStarter/src/hooks/useLoading.ts)

**Usage:**

```tsx
import { useLoading } from '@/hooks';

const MyComponent = () => {
  const { isLoading, startLoading, stopLoading } = useLoading();

  const handleSubmit = async () => {
    startLoading();
    try {
      await api.submit();
    } finally {
      stopLoading();
    }
  };

  return (
    <CustomButton title="Submit" loading={isLoading} onPress={handleSubmit} />
  );
};
```

---

### useForm

Custom form hook integration.

**Location:** [src/hooks/useForm.ts](file:///Users/sstpc/Desktop/Satyam/Others/rnStarter/src/hooks/useForm.ts)

---

## 🎨 Theming

The app includes a complete theming system with dark and light modes.

**Files:**

- [src/theme/dark.ts](file:///Users/sstpc/Desktop/Satyam/Others/rnStarter/src/theme/dark.ts) - Dark theme colors
- [src/theme/light.ts](file:///Users/sstpc/Desktop/Satyam/Others/rnStarter/src/theme/light.ts) - Light theme colors
- [src/theme/fonts.ts](file:///Users/sstpc/Desktop/Satyam/Others/rnStarter/src/theme/fonts.ts) - Font configuration
- [src/theme/typography.ts](file:///Users/sstpc/Desktop/Satyam/Others/rnStarter/src/theme/typography.ts) - Typography styles
- [src/theme/spacing.ts](file:///Users/sstpc/Desktop/Satyam/Others/rnStarter/src/theme/spacing.ts) - Spacing constants
- [src/theme/layout.ts](file:///Users/sstpc/Desktop/Satyam/Others/rnStarter/src/theme/layout.ts) - Layout utilities
- [src/theme/palette.ts](file:///Users/sstpc/Desktop/Satyam/Others/rnStarter/src/theme/palette.ts) - Color palette

**Usage:**

```tsx
import { useAppTheme } from '@/context/ThemeContext';

const MyComponent = () => {
  const { color, toggleTheme, isDarkMode } = useAppTheme();

  return (
    <View style={{ backgroundColor: color.background_primary }}>
      <CustomText style={{ color: color.text }}>Hello World</CustomText>
      <CustomButton
        title={`Switch to ${isDarkMode ? 'Light' : 'Dark'} Mode`}
        onPress={toggleTheme}
      />
    </View>
  );
};
```

---

## 🌍 Internationalization (i18n)

Multi-language support using `react-i18next`.

**Location:** [src/i18n/](file:///Users/sstpc/Desktop/Satyam/Others/rnStarter/src/i18n/)

**Usage:**

```tsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <CustomText>{t('welcome.title')}</CustomText>
      <CustomButton
        title={t('common.submit')}
        onPress={() => i18n.changeLanguage('es')}
      />
    </>
  );
};
```

**Add translations:** Add your translation files in `src/i18n/locales/`

---

## 🔐 Authentication

Pre-built authentication flow with login, signup, and auth state management.

**Store:** [src/store/auth.store.ts](file:///Users/sstpc/Desktop/Satyam/Others/rnStarter/src/store/auth.store.ts)

**Screens:** [src/screens/auth/](file:///Users/sstpc/Desktop/Satyam/Others/rnStarter/src/screens/auth/)

**API:** [src/services/auth.api.ts](file:///Users/sstpc/Desktop/Satyam/Others/rnStarter/src/services/auth.api.ts)

---

## 🌐 Network Monitoring

Built-in network state monitoring with store and components.

**Store:** [src/store/network.store.ts](file:///Users/sstpc/Desktop/Satyam/Others/rnStarter/src/store/network.store.ts)

**Usage:**

```tsx
import { useNetworkStore } from '@/store';

const MyComponent = () => {
  const { isConnected } = useNetworkStore();

  return <CustomText>{isConnected ? 'Online' : 'Offline'}</CustomText>;
};
```

---

## 📱 Running the App

### Android

```bash
yarn android
# or
npm run android
```

### iOS

```bash
yarn ios
# or
npm run ios
```

### Start Metro

```bash
yarn start
# or
npm start
```

### Reset Cache

```bash
npx react-native start --reset-cache
```

---

## 📦 Key Dependencies

- **react-navigation** - Navigation
- **react-hook-form** - Form handling
- **i18next** - Internationalization
- **react-native-svg** - SVG support
- **react-native-fast-image** - Optimized image loading
- **@mhpdev/react-native-haptics** - Haptic feedback
- **react-native-element-dropdown** - Dropdown component
- **react-native-country-select** - Country selector
- **@react-native-community/datetimepicker** - Date/Time picker

---

## 🛠️ Utility Functions

### normalize

Responsive size normalization for consistent UI across devices.

**Location:** [src/utils/normalize.ts](file:///Users/sstpc/Desktop/Satyam/Others/rnStarter/src/utils/normalize.ts)

**Usage:**

```tsx
import { normalize } from '@/utils/normalize';

const styles = StyleSheet.create({
  text: {
    fontSize: normalize(16),
    padding: normalize(12),
  },
});
```

---

## 📋 Constants

Pre-defined constants for app-wide use:

- **[src/constants/device.ts](file:///Users/sstpc/Desktop/Satyam/Others/rnStarter/src/constants/device.ts)** - Device dimensions and utilities
- **[src/constants/limits.ts](file:///Users/sstpc/Desktop/Satyam/Others/rnStarter/src/constants/limits.ts)** - Input limits and constraints
- **[src/constants/regex.ts](file:///Users/sstpc/Desktop/Satyam/Others/rnStarter/src/constants/regex.ts)** - Common regex patterns
- **[src/constants/routes.ts](file:///Users/sstpc/Desktop/Satyam/Others/rnStarter/src/constants/routes.ts)** - Navigation route names

---

## 🎯 Development Tips

1. **Use path aliases** - Import with `@/` instead of relative paths

   ```tsx
   // ✅ Good
   import { CustomButton } from '@/components/shared/CustomButton';

   // ❌ Avoid
   import { CustomButton } from '../../../components/shared/CustomButton';
   ```

2. **Follow the component structure** - Keep components in `src/components/shared/`

3. **Use the theme system** - Always reference colors from the theme context

4. **Leverage custom hooks** - Use provided hooks for common patterns

5. **Type everything** - The project uses strict TypeScript mode

---

## 🤝 Contributing

This is a starter kit designed to be customized for your needs. Feel free to:

- Add more components
- Customize the theme
- Add new features
- Modify navigation structure
- Extend the store and services

---

## 📄 License

This project is a starter template and can be used freely for your projects.

---

## 🎉 Getting Started with Development

1. Clone this repository
2. Follow the setup instructions above
3. Start building your app with pre-configured features!
4. Customize components and theme to match your brand
5. Add your API endpoints in `src/services/`
6. Build your screens and connect them to navigation

---

**Happy Coding! 🚀**

For questions or issues, please refer to the individual component files linked throughout this README.
