import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../auth/authSlice';
import goalsReducer from '../goals/goalsSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		goals: goalsReducer,
	},
});
