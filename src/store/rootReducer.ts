import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '@/redux/slice/auth.slice';

const appReducer = combineReducers({
  auth: authReducer,
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
