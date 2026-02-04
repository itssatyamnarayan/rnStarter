# React Native Starter Kit

A comprehensive React Native starter template with pre-configured features and reusable components to accelerate your development workflow. This kit includes authentication, navigation, theming, internationalization, form handling, Redux state management, and much more out of the box.

---

## 🚀 Features

- ✅ **Navigation Setup** - React Navigation with Stack & Tab navigation pre-configured
- ✅ **Theme System** - Dark/Light/System mode with custom theme support
- ✅ **Authentication** - Complete auth flow with login/signup screens
- ✅ **Internationalization (i18n)** - Multi-language support with react-i18next
- ✅ **Form Handling** - React Hook Form integration with custom form components
- ✅ **Redux State Management** - Redux Toolkit with type-safe hooks and persistence
- ✅ **Validation System** - Dual approach: Rule-based & Schema-based (Yup) validation
- ✅ **Custom Components** - Reusable UI components (Buttons, Inputs, Dropdowns, etc.)
- ✅ **Network Monitoring** - Built-in network connectivity detection
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
│   │       └── stacks/
│   │           ├── app.stack.tsx
│   │           ├── app.tab.tsx
│   │           └── auth.stack.tsx
│   ├── assets/                 # Static assets
│   │   ├── fonts/              # Custom fonts
│   │   ├── icons/              # General SVG icons
│   │   │   ├── tabs/           # Tab-specific icons (light/dark variants)
│   │   │   └── index.ts        # Auto-generated icon exports
│   │   ├── images/             # Image assets
│   │   └── lottie/             # Lottie animations
│   ├── components/             # Reusable components
│   │   └── shared/
│   │       ├── CustomButton.tsx
│   │       ├── CustomText.tsx
│   │       ├── AppImage.tsx
│   │       ├── Icon.tsx
│   │       ├── bottom-sheet/
│   │       ├── dropdown/
│   │       ├── form-input/     # FormInput component with variants
│   │       │   └── variants/
│   │       │       ├── CountryPhoneVariant.tsx
│   │       │       ├── DateTimeVariant.tsx
│   │       │       ├── DropdownVariant.tsx
│   │       │       ├── TextInputVariant.tsx
│   │       │       └── ToggleVariant.tsx
│   │       ├── loader/
│   │       ├── modal/
│   │       ├── navigation/     # Navigation-related shared components
│   │       │   ├── AnimatedTabIcon.tsx
│   │       │   ├── HeaderActionButton.tsx
│   │       │   ├── HeaderBackButton.tsx
│   │       │   └── tabIconRender.tsx
│   │       ├── network-aware-view/
│   │       ├── network-provider/
│   │       └── no-internet/
│   ├── constants/              # App constants
│   │   ├── device.ts
│   │   ├── limits.ts
│   │   └── regex.ts
│   ├── context/                # React Context providers
│   │   └── ThemeContext.tsx
│   ├── hooks/                  # Custom hooks
│   │   ├── useAppDispatch.ts   # Type-safe Redux dispatch
│   │   └── useAppSelector.ts   # Type-safe Redux selector
│   ├── i18n/                   # Internationalization
│   │   ├── index.ts
│   │   ├── resources.ts
│   │   └── locales/            # Translation files (en.json, etc.)
│   ├── redux/                  # Redux slices
│   │   ├── selectors/          # Redux selectors
│   │   └── slice/              # Redux slices
│   │       ├── auth.slice.ts
│   │       └── user.slice.ts
│   ├── screens/                # Screen components
│   │   ├── auth/               # Authentication screens
│   │   ├── app/                # Main app screens
│   │   └── tab/                # Tab screens
│   ├── services/               # API services
│   │   ├── api/
│   │   ├── auth.api.ts
│   │   └── user.api.ts
│   ├── store/                  # Redux store configuration
│   │   ├── index.ts            # Store setup
│   │   ├── rootReducer.ts      # Root reducer combining all slices
│   │   ├── persist.ts          # Redux persist configuration
│   │   └── mmkv.ts             # MMKV storage adapter
│   ├── theme/                  # Theme configuration
│   │   ├── dark.ts             # Dark theme colors & icons
│   │   ├── light.ts            # Light theme colors & icons
│   │   ├── fonts.ts
│   │   ├── typography.ts
│   │   ├── palette.ts
│   │   ├── spacing.ts
│   │   └── layout.ts
│   ├── types/                  # Global TypeScript types
│   │   ├── api.types.ts
│   │   ├── navigation.types.ts
│   │   └── index.ts
│   ├── utils/                  # Utility functions
│   │   └── normalize.ts
│   └── validation/             # Validation system
│       ├── messages.ts         # i18n validation message keys
│       ├── rules.ts            # Rule-based validation
│       ├── tValError.ts        # Validation error translation helper
│       └── schema/             # Schema-based validation (Yup)
│           ├── auth.schema.ts
│           └── user.schema.ts
├── scripts/
│   └── generate-icons.js       # Auto-generate icon exports
└── ...
```

---

## 🔄 Using This Starter Kit in Your Own Project

If you want to use only the `src` folder and create your own React Native project:

1. **Search for custom configurations:**

   - Perform a global search for `(//by own)` in the codebase
   - Copy all related configuration code into your new project

2. **Files with custom configuration:**

   - `babel.config.js` - Module resolver plugin
   - `tsconfig.json` - TypeScript path mapping
   - `metro.config.js` - Metro bundler & SVG transformer

3. **Important Note:**
   - If you use a newer React Native version and face compatibility issues, you must resolve them manually

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

Path aliases are configured for cleaner imports. Use `@/` to reference the `src` directory.

**Files configured:** (Custom configuration marked with `//by own` comments)

- **babel.config.js** - Module resolver plugin

  ```javascript
  alias: {
    '@': './src',
  }
  ```

- **tsconfig.json** - TypeScript path mapping

  ```json
  "paths": {
    "@/*": ["src/*"]
  }
  ```

- **metro.config.js** - Metro bundler resolver
  ```javascript
  extraNodeModules: {
    '@': path.resolve(__dirname, 'src'),
  }
  ```

### 2. Google Fonts Setup

Custom fonts are located in `src/assets/fonts/`.

**Configuration file:** `react-native.config.js`

```javascript
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./src/assets/fonts/'],
};
```

**Link fonts:**

```bash
yarn dlx react-native-asset
# OR
npx react-native-asset
```

**Reset cache and run:**

```bash
npx react-native start --reset-cache
```

### 3. App Icon Setup

#### For Android

**Option 1: Manual Copy**

1. Generate icons at [icon.kitchen](https://icon.kitchen) or [appicon.co](https://appicon.co)
2. Copy files from `android/res` in the downloaded folder to `android/app/src/main/res`
3. Remove `android:roundIcon="@mipmap/ic_launcher"` from `AndroidManifest.xml`
4. Rebuild the app

**Option 2: Android Studio**

1. Open project in Android Studio
2. Go to `res` → Right click → New → Image Asset
3. Follow the wizard

#### For iOS

1. Run `cd ios && xed .` to open Xcode
2. Navigate to `YourProject/Images` → `AppIcon`
3. Drag and drop images according to their pt size
4. Set the 1024pt marketing image
5. Uninstall and rebuild the app

---

## 🏪 Redux Store Setup

Redux Toolkit is fully configured with persistence using MMKV storage.

### Store Structure

```
src/
├── redux/
│   ├── slice/              # Create your slices here
│   │   ├── auth.slice.ts
│   │   └── user.slice.ts
│   └── selectors/          # Redux selectors
└── store/
    ├── index.ts            # Store configuration
    ├── rootReducer.ts      # Combines all reducers
    ├── persist.ts          # Persistence configuration
    └── mmkv.ts             # MMKV storage adapter
```

### Creating a New Slice

Create slices in `src/redux/slice/`:

```typescript
// filepath: src/redux/slice/example.slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ExampleState {
  data: string | null;
  isLoading: boolean;
}

const initialState: ExampleState = {
  data: null,
  isLoading: false,
};

const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<string>) {
      state.data = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    resetExample() {
      return initialState;
    },
  },
});

export const { setData, setLoading, resetExample } = exampleSlice.actions;
export default exampleSlice.reducer;
```

### Registering a New Slice

Add your new slice to `src/store/rootReducer.ts`:

```typescript
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '@/redux/slice/auth.slice';
import userReducer from '@/redux/slice/user.slice';
import exampleReducer from '@/redux/slice/example.slice'; // Add this

const appReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  example: exampleReducer, // Add this
});

// ...rest of the file
```

### Type-Safe Redux Hooks

> ⚠️ **IMPORTANT:** Always use `useAppDispatch` and `useAppSelector` instead of the standard React-Redux hooks. These are type-safe and ensure proper TypeScript inference.

**Location:** `src/hooks/`

```typescript
// useAppDispatch.ts
import { AppDispatch } from '@/store';
import { useDispatch } from 'react-redux';

export const useAppDispatch = () => {
  return useDispatch<AppDispatch>();
};

// useAppSelector.ts
import { RootStoreState } from '@/store/rootReducer';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const useAppSelector: TypedUseSelectorHook<RootStoreState> = useSelector;
```

### Usage Example

```tsx
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { loginAction } from '@/redux/slice/auth.slice';

const MyComponent = () => {
  const dispatch = useAppDispatch();

  // Type-safe state selection
  const accessToken = useAppSelector(state => state.auth.access_token);
  const isProfileSetup = useAppSelector(state => state.user.isProfileSetup);

  const handleLogin = () => {
    // Type-safe dispatch
    dispatch(loginAction({ access_token: 'my_token' }));
  };

  return (/* ... */);
};
```

---

## ✅ Validation System

The validation system supports **two approaches** for flexibility.

### Validation Folder Structure

```
src/validation/
├── messages.ts         # i18n validation message keys (NOT actual messages)
├── rules.ts            # Rule-based validation for React Hook Form
├── tValError.ts        # Translation helper for validation errors
└── schema/             # Schema-based validation using Yup
    ├── auth.schema.ts
    └── user.schema.ts
```

---

### Approach 1: Rule-Based Validation

Use rules directly with FormInput for simple validation needs.

**Location:** `src/validation/rules.ts`

```typescript
import { REGEX } from '@/constants/regex';
import { MSG } from './messages';
import { LIMITS } from '@/constants/limits';

export const rules = {
  name: (override?: { min?: number; max?: number }) => ({
    required: MSG.required,
    pattern: { value: REGEX.HAS_LETTER, message: MSG.hasLetter },
    minLength: { value: LIMITS.NAME.min, message: MSG.min },
    maxLength: { value: LIMITS.NAME.max, message: MSG.max },
  }),

  email: () => ({
    required: MSG.required,
    pattern: { value: REGEX.EMAIL, message: MSG.email },
  }),

  password: () => ({
    required: MSG.required,
    pattern: { value: REGEX.STRONG_PASSWORD, message: MSG.strongPassword },
  }),
};
```

**Usage with FormInput:**

```tsx
import FormInput from '@/components/shared/form-input/FormInput';
import { rules } from '@/validation/rules';

<FormInput
  control={control}
  name="email"
  rules={rules.email()} // Rule-based validation
  variant="text"
  placeholder="Enter email"
/>;
```

---

### Approach 2: Schema-Based Validation (Recommended)

Use Yup schemas with `yupResolver` for complex validation logic.

**Location:** `src/validation/schema/`

```typescript
// filepath: src/validation/schema/auth.schema.ts
import * as yup from 'yup';
import { LIMITS } from '@/constants/limits';
import { REGEX } from '@/constants/regex';
import { MSG } from '../messages';

export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .required(MSG.required)
    .email(MSG.email)
    .min(LIMITS.EMAIL.min, MSG.min)
    .max(LIMITS.EMAIL.max, MSG.max)
    .matches(REGEX.EMAIL, MSG.email),

  password: yup
    .string()
    .trim()
    .required(MSG.required)
    .min(LIMITS.PASSWORD.min, MSG.min)
    .max(LIMITS.PASSWORD.max, MSG.max)
    .matches(REGEX.STRONG_PASSWORD, MSG.strongPassword),
});
```

**Usage with React Hook Form:**

```tsx
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/validation/schema/auth.schema';
import { InferType } from 'yup';

type LoginFormType = InferType<typeof loginSchema>;

const LoginScreen = () => {
  const { control, formState: { errors }, handleSubmit } = useForm<LoginFormType>({
    resolver: yupResolver(loginSchema),  // Schema-based validation
  });

  return (/* ... */);
};
```

---

### i18n Validation Messages

> ⚠️ **IMPORTANT:** `messages.ts` should contain ONLY translation keys, NOT actual messages. All real messages must be in `en.json` (or other locale files).

**messages.ts - Contains only keys:**

```typescript
// filepath: src/validation/messages.ts
export const MSG = {
  required: 'validation.required', // Key, not message
  min: 'validation.minLength',
  max: 'validation.maxLength',
  email: 'validation.invalidEmail',
  strongPassword: 'validation.strongPassword',
  // ...
};
```

**en.json - Contains actual messages:**

```json
{
  "validation": {
    "required": "{{field}} is required",
    "minLength": "{{field}} must be at least {{min}} characters",
    "maxLength": "{{field}} must be at most {{max}} characters",
    "invalidEmail": "Please enter a valid email address",
    "strongPassword": "Password must include upper, lower, number & symbol"
  }
}
```

This approach enables full i18n support - simply add translation files for other languages.

---

### tValError - Validation Error Translation Helper

Use `tValError` to translate validation errors with dynamic parameters.

**Location:** `src/validation/tValError.ts`

```typescript
import { TFunction } from 'i18next';
import { FieldError } from 'react-hook-form';

type Params = {
  min?: number;
  max?: number;
  field?: string;
};

export const tValError = (t: TFunction, err?: FieldError, params?: Params) => {
  if (!err?.message) return undefined;
  return t(err.message as any, { ...params });
};
```

**Usage in FormInput:**

```tsx
import { useTranslation } from 'react-i18next';
import { tValError } from '@/validation/tValError';
import { LIMITS } from '@/constants/limits';

const { t } = useTranslation();
const {
  control,
  formState: { errors },
} = useForm();

<FormInput
  control={control}
  name="password"
  variant="text"
  label={t('auth.password')}
  error={tValError(t, errors.password, {
    field: t('auth.password'), // Maps to {{field}} in en.json
    min: LIMITS.PASSWORD.min, // Maps to {{min}} in en.json
    max: LIMITS.PASSWORD.max, // Maps to {{max}} in en.json
  })}
/>;
```

**Result:** If password is too short, shows: "Password must be at least 8 characters"

---

## 🧩 FormInput Component

A comprehensive form input component that handles all input types and edge cases.

**Location:** `src/components/shared/form-input/`

### Available Variants

| Variant    | File                      | Description                      |
| ---------- | ------------------------- | -------------------------------- |
| `text`     | `TextInputVariant.tsx`    | Standard text input              |
| `dropdown` | `DropdownVariant.tsx`     | Dropdown selector                |
| `datetime` | `DateTimeVariant.tsx`     | Date and time picker             |
| `country`  | `CountryPhoneVariant.tsx` | Country code selector with phone |
| `toggle`   | `ToggleVariant.tsx`       | Toggle switch                    |

### Using FormInput with React Hook Form

```tsx
import FormInput from '@/components/shared/form-input/FormInput';
import { useForm } from 'react-hook-form';

const MyForm = () => {
  const {
    control,
    formState: { errors },
  } = useForm();

  return (
    <>
      {/* Text Input */}
      <FormInput
        control={control}
        name="email"
        variant="text"
        label="Email"
        placeholder="Enter email"
        error={tValError(t, errors.email, { field: 'Email' })}
      />

      {/* Password Input */}
      <FormInput
        control={control}
        name="password"
        variant="text"
        isPassword
        label="Password"
        placeholder="Enter password"
      />

      {/* Dropdown */}
      <FormInput
        control={control}
        name="country"
        variant="dropdown"
        label="Country"
        placeholder="Select Country"
        data={[
          { label: 'USA', value: 'us' },
          { label: 'Canada', value: 'ca' },
        ]}
      />

      {/* Date Picker */}
      <FormInput
        control={control}
        name="birthdate"
        variant="datetime"
        mode="date"
        label="Date of Birth"
      />

      {/* Country Phone */}
      <FormInput
        control={control}
        name="phone"
        variant="country"
        label="Phone Number"
      />

      {/* Toggle */}
      <FormInput
        control={control}
        name="notifications"
        variant="toggle"
        label="Enable Notifications"
      />
    </>
  );
};
```

### Using Variants in Standalone Mode

> ⚠️ **IMPORTANT:** When using a variant component directly (without FormInput wrapper), you **MUST** use `mode="standalone"`.

```tsx
import { TextInputVariant } from '@/components/shared/form-input/variants/TextInputVariant';

// Standalone mode - without React Hook Form
<TextInputVariant
  mode="standalone"
  value={myValue}
  onChangeText={setMyValue}
  placeholder="Enter text"
/>;
```

---

## 🎨 Theme System

The app includes a complete theming system with Dark, Light, and System modes.

**Location:** `src/context/ThemeContext.tsx`

### Theme Files

| File                      | Description                |
| ------------------------- | -------------------------- |
| `src/theme/light.ts`      | Light theme colors & icons |
| `src/theme/dark.ts`       | Dark theme colors & icons  |
| `src/theme/palette.ts`    | Color palette              |
| `src/theme/fonts.ts`      | Font family definitions    |
| `src/theme/typography.ts` | Typography styles          |
| `src/theme/spacing.ts`    | Spacing constants          |
| `src/theme/layout.ts`     | Layout utilities           |

### Theme Modes

- `'light'` - Force light theme
- `'dark'` - Force dark theme
- `'system'` - Follow device theme (default)

### Using Theme in Components

```tsx
import { useAppTheme } from '@/context/ThemeContext';

const MyComponent = () => {
  const { color, icon, mode, setMode } = useAppTheme();

  return (
    <View style={{ backgroundColor: color.background_primary }}>
      <Text style={{ color: color.text_primary }}>Hello World</Text>

      {/* Theme-aware icon */}
      <Icon name={icon.tooltip} size={24} />

      {/* Change theme */}
      <Button title="Dark Mode" onPress={() => setMode('dark')} />
      <Button title="Light Mode" onPress={() => setMode('light')} />
      <Button title="System" onPress={() => setMode('system')} />
    </View>
  );
};
```

### Adding Theme-Specific Icons

1. Add light/dark variants in `src/theme/light.ts` and `src/theme/dark.ts`:

```typescript
// light.ts
export const light = {
  color: {
    /* ... */
  },
  icon: {
    tooltip: 'tooltip_light' as IconName,
    myIcon: 'myIcon_light' as IconName, // Add here
  },
};

// dark.ts
export const dark = {
  color: {
    /* ... */
  },
  icon: {
    tooltip: 'tooltip_dark',
    myIcon: 'myIcon_dark', // Add here
  },
};
```

2. Use in components:

```tsx
const { icon } = useAppTheme();
<Icon name={icon.myIcon} />;
```

---

## 🖼️ Icon System

### General Icons (Non-Tab)

**Location:** `src/assets/icons/`

**Adding new icons:**

1. Place your `.svg` file in `src/assets/icons/`
2. Run the generation script:
   ```bash
   yarn generate:icons
   # or
   npm run generate:icons
   ```
3. The script auto-generates `index.ts` with type-safe exports

**Usage:**

```tsx
import Icon from '@/components/shared/Icon';

<Icon name="home" size={24} color="#000" />;
```

### Light & Dark Theme Icons

For icons with light/dark variants:

1. Name them with a suffix convention (e.g., `myIcon_light.svg`, `myIcon_dark.svg`)
2. Run `yarn generate:icons`
3. Import icons into `light.ts` and `dark.ts` theme files
4. Use with `useAppTheme`:

```tsx
const { icon } = useAppTheme();
<Icon name={icon.myIcon} />;
```

---

## 📑 Tab Bar Icon System

> ⚠️ **IMPORTANT:** Do NOT use tab icons directly. Always use the render function approach.

**Location:** `src/assets/icons/tabs/`

### Tab Icon Folder Structure

```
src/assets/icons/tabs/
├── home/
│   ├── filled_light.svg
│   ├── filled_dark.svg
│   └── outline.svg
├── profile/
│   ├── filled_light.svg
│   ├── filled_dark.svg
│   └── outline.svg
└── index.ts              # Tab icon mappings
```

### Adding a New Tab Icon

1. Create a folder under `src/assets/icons/tabs/` with your tab name (e.g., `settings/`)

2. Add the required SVG files following the naming pattern:

   - `filled_light.svg` - Active state for light theme
   - `filled_dark.svg` - Active state for dark theme
   - `outline.svg` - Inactive state (both themes)

3. Update `src/assets/icons/tabs/index.ts`:

```typescript
import SettingsFilledLight from './settings/filled_light.svg';
import SettingsFilledDark from './settings/filled_dark.svg';
import SettingsOutline from './settings/outline.svg';

export const TabIcons = {
  // ...existing icons
  settings: {
    active: {
      light: SettingsFilledLight,
      dark: SettingsFilledDark,
    },
    inactive: {
      light: SettingsOutline,
      dark: SettingsOutline,
    },
  },
} as const;

export type TabIconName = keyof typeof TabIcons;
```

4. Create a render function in `src/components/shared/navigation/tabIconRender.tsx`:

```typescript
import AnimatedTabIcon from './AnimatedTabIcon';

interface RenderTabIconProps {
  focused: boolean;
  size: number;
}

export const renderHomeIcon = (props: RenderTabIconProps) => (
  <AnimatedTabIcon {...props} name="home" />
);

export const renderProfileIcon = (props: RenderTabIconProps) => (
  <AnimatedTabIcon {...props} name="profile" />
);

// Add your new tab icon render function
export const renderSettingsIcon = (props: RenderTabIconProps) => (
  <AnimatedTabIcon {...props} name="settings" />
);
```

5. Use in your tab navigator (`app.tab.tsx`):

```tsx
import { renderSettingsIcon } from '@/components/shared/navigation/tabIconRender';

<Tabs.Screen
  name="Settings"
  component={Settings}
  options={{
    tabBarIcon: renderSettingsIcon, // Use the render function
  }}
/>;
```

---

## 🧭 Navigation Components

All navigation-related shared components are in `src/components/shared/navigation/`:

| Component                | Description                              |
| ------------------------ | ---------------------------------------- |
| `AnimatedTabIcon.tsx`    | Animated tab bar icon with theme support |
| `HeaderBackButton.tsx`   | Custom back button for headers           |
| `HeaderActionButton.tsx` | Action button for headers                |
| `tabIconRender.tsx`      | Tab icon render functions                |

### Screen Background Styling

Background colors are automatically applied via `contentStyle` in:

- `src/app/navigation/stacks/app.stack.tsx`
- `src/app/navigation/stacks/auth.stack.tsx`

```tsx
contentStyle: [
  { backgroundColor: color.background_primary },
  layout.flex,
],
```

**Alternative approaches:**

1. Remove this logic and apply background per screen
2. Use `sceneStyle` (as done in `app.tab.tsx`) for bottom tabs

---

## 📝 Global Types

All global/shared TypeScript types are in `src/types/`:

| File                  | Description                           |
| --------------------- | ------------------------------------- |
| `api.types.ts`        | API request/response types            |
| `navigation.types.ts` | Navigation param lists & screen props |
| `index.ts`            | Re-exports all types                  |

**Usage:**

```tsx
import {
  AuthStackScreenProps,
  AppStackParamList,
} from '@/types/navigation.types';
import { ApiResponse } from '@/types/api.types';
```

---

## 🎨 Components

### CustomButton

A versatile button component with multiple variants, loading states, haptic feedback, and icon support.

**Location:** `src/components/shared/CustomButton.tsx`

**Usage:**

```tsx
import CustomButton from '@/components/shared/CustomButton';

// Basic
<CustomButton title="Click Me" onPress={() => {}} />

// Variants
<CustomButton title="Primary" variant="primary" />
<CustomButton title="Outline" variant="outline" />
<CustomButton title="Danger" variant="danger" />
<CustomButton title="Ghost" variant="ghost" />

// With loading state
<CustomButton title="Submit" loading={isLoading} onPress={handleSubmit} />

// Full width with haptic feedback
<CustomButton title="Continue" fullWidth haptic="heavy" />
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

### CustomText

Text component respecting the app's typography system and theme.

**Location:** `src/components/shared/CustomText.tsx`

```tsx
import CustomText from '@/components/shared/CustomText';

<CustomText variant="h1" weight="bold">Heading</CustomText>
<CustomText variant="body" weight="400">Body text</CustomText>
```

### AppImage

Optimized image component using `react-native-fast-image`.

**Location:** `src/components/shared/AppImage.tsx`

```tsx
import AppImage from '@/components/shared/AppImage';

<AppImage
  source={{ uri: 'https://example.com/image.jpg' }}
  style={{ width: 200, height: 200 }}
/>;
```

### Icon

SVG icon component with type-safe icon names.

**Location:** `src/components/shared/Icon.tsx`

```tsx
import Icon from '@/components/shared/Icon';

<Icon name="home" size={24} color="#000" />;
```

### Modal

Custom modal component for dialogs and overlays.

**Location:** `src/components/shared/modal/`

### BottomSheet

Bottom sheet component for slides-up content.

**Location:** `src/components/shared/bottom-sheet/`

### Loader

Loading indicator component.

**Location:** `src/components/shared/loader/`

### Network Components

Components for handling network connectivity:

- **NetworkProvider** - Context provider for network state
- **NetworkAwareView** - Component that responds to network changes
- **NoInternet** - No internet connection screen

**Locations:**

- `src/components/shared/network-provider/`
- `src/components/shared/network-aware-view/`
- `src/components/shared/no-internet/`

---

## 🌍 Internationalization (i18n)

Multi-language support using `react-i18next`.

**Location:** `src/i18n/`

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

**Add translations:** Add files in `src/i18n/locales/` (e.g., `es.json`, `fr.json`)

---

## 🛠️ Utility Functions

### normalize

Responsive size normalization for consistent UI across devices.

**Location:** `src/utils/normalize.ts`

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

| File                      | Description                     |
| ------------------------- | ------------------------------- |
| `src/constants/device.ts` | Device dimensions and utilities |
| `src/constants/limits.ts` | Input limits and constraints    |
| `src/constants/regex.ts`  | Common regex patterns           |

---

## 📱 Running the App

```bash
# Android
yarn android

# iOS
yarn ios

# Start Metro
yarn start

# Reset cache
npx react-native start --reset-cache
```

---

## 📦 Key Dependencies

| Package                        | Purpose                   |
| ------------------------------ | ------------------------- |
| `@reduxjs/toolkit`             | State management          |
| `redux-persist`                | State persistence         |
| `react-native-mmkv`            | Fast key-value storage    |
| `react-hook-form`              | Form handling             |
| `@hookform/resolvers`          | Form validation resolvers |
| `yup`                          | Schema validation         |
| `react-navigation`             | Navigation                |
| `i18next`                      | Internationalization      |
| `react-native-svg`             | SVG support               |
| `react-native-fast-image`      | Optimized image loading   |
| `@mhpdev/react-native-haptics` | Haptic feedback           |
| `react-native-reanimated`      | Animations                |

---

## 🎯 Development Tips

1. **Use path aliases** - Import with `@/` instead of relative paths

   ```tsx
   // ✅ Good
   import CustomButton from '@/components/shared/CustomButton';

   // ❌ Avoid
   import CustomButton from '../../../components/shared/CustomButton';
   ```

2. **Use type-safe Redux hooks** - Always use `useAppDispatch` and `useAppSelector`

3. **Follow validation patterns** - Use schema-based validation for complex forms

4. **Use tValError for errors** - Ensures proper i18n support

5. **Tab icons via render functions** - Never use tab icons directly

6. **Theme-aware components** - Always use `useAppTheme` for colors and icons

7. **Global types in src/types/** - Single source of truth for TypeScript types

---

## 📄 License

This project is a starter template and can be used freely for your projects.

---

**Happy Coding! 🚀**
