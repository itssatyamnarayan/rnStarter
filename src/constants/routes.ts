export const AuthRoutes = {
  LOGIN: 'Login',
  SIGNUP: 'Signup',
  FORGOT_PASSWORD: 'ForgotPassword',
  VERIFY_EMAIL: 'VerifyEmail',
  RESET_PASSWORD: 'ResetPassword',
} as const;

export const TabRoutes = {
  HOME: 'Home',
  GROUP: 'Group',
  NOTIFICATIONS: 'Notifications',
  PROFILE: 'Profile',
} as const;

export const AppRoutes = {
  MAIN_TABS: 'MainTabs',
  SETTINGS: 'Settings',
  EDIT_PROFILE: 'EditProfile',
  CHANGE_PASSWORD: 'ChangePassword',
  NOTIFICATION_SETTINGS: 'NotificationSettings',
  PRIVACY_SETTINGS: 'PrivacySettings',
  HELP: 'Help',
  ABOUT: 'About',
} as const;
