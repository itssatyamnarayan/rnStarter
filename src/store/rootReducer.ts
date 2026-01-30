import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '@/redux/slice/auth.slice';
import userReducer from '@/redux/slice/user.slice';

const appReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

export const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: any,
) => {
  if (action.type === 'auth/logout') {
    state = undefined;
  }
  return appReducer(state, action);
};

export type RootStoreState = ReturnType<typeof rootReducer>;
