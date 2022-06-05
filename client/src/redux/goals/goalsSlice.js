import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import goalsService from './goalsService';

const initialState = {
	goals: [],
	isLoading: false,
	isError: false,
	isSuccess: false,
	message: '',
};

// Create new goal
export const createGoal = createAsyncThunk(
	'goals/create',
	async (goalData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await goalsService.createGoal(goalData, token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Update goal
export const updateGoal = createAsyncThunk(
	'goals/update',
	async (goalData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await goalsService.updateGoal(goalData, token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Get goals
export const getGoals = createAsyncThunk(
	'goals/getAll',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await goalsService.getGoals(token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Delete goal
export const deleteGoal = createAsyncThunk(
	'goals/deleteOne',
	async (id, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await goalsService.deleteGoal(id, token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

const goalsSlice = createSlice({
	name: 'goals',
	initialState,
	reducers: {
		reset: (state) => initialState,
		clearErrors: (state) => {
			state.isError = false;
			state.message = '';
		},
	},
	extraReducers: (builder) => {
		builder // CREATE
			.addCase(createGoal.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createGoal.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.goals.push(action.payload);
			})
			.addCase(createGoal.rejected, (state, action) => {
				setErrorHandler(state, action);
			}) // GET
			.addCase(getGoals.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getGoals.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.goals = action.payload;
			})
			.addCase(getGoals.rejected, (state, action) => {
				setErrorHandler(state, action);
			}) // DELETE
			.addCase(deleteGoal.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteGoal.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.goals = state.goals.filter(
					(goal) => goal._id !== action.payload._id
				);
			})
			.addCase(deleteGoal.rejected, (state, action) => {
				setErrorHandler(state, action);
			}) // UPDATE GOAL
			.addCase(updateGoal.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateGoal.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.goals.find((goal) => goal._id === action.payload._id).text =
					action.payload.text;
			})
			.addCase(updateGoal.rejected, (state, action) => {
				setErrorHandler(state, action);
			});
	},
});

function setErrorHandler(state, action) {
	state.isLoading = false;
	state.isError = true;
	state.message = action.payload;
}
export const { reset, clearErrors } = goalsSlice.actions;
export default goalsSlice.reducer;
