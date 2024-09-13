import {
  Action,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import accountReducer from './slice/accountSlide';
import providerReducer from './slice/provider.Slide';
import userReducer from './slice/userSlide';
import scholarshipReducer from './slice/scholarshipSlide';
import resumeReducer from './slice/resumeSlide';
import permissionReducer from './slice/permissionSlide';
import roleReducer from './slice/roleSlide';

export const store = configureStore({
  reducer: {
    account: accountReducer,
    provider: providerReducer,
    user: userReducer,
    scholarship: scholarshipReducer,
    resume: resumeReducer,
    permission: permissionReducer,
    role: roleReducer
  },
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;