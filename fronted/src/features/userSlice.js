import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'http://localhost:8000/api/v1/users/';

const initialState = {
	users: [],
	addUserStatus: '',
	addUserError: '',
	getUsersStatus: '',
	getUsersError: '',
	deleteUserStatus: '',
	deleteUserError: '',
	updateUserStatus: '',
	updateUserError: '',
};

export const addUser = createAsyncThunk('user/usersAdd', async (user, { rejectWithValue }) => {
	try {
		const response = await axios.post(url, user);
		return response.data;
	} catch (error) {
		return rejectWithValue(error.response?.data);
	}
});

export const getUsers = createAsyncThunk('users/getUsers', async (id = null, { rejectWithValue }) => {
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		console.log(error);
		return rejectWithValue(error.response?.data);
	}
});

export const deleteUser = createAsyncThunk('user/deleteUser', async (id, { rejectWithValue }) => {
	try {
		const response = await axios.delete(url + id);
		return response.data;
	} catch (error) {
		return rejectWithValue(error.response?.data);
	}
});

export const updateUser = createAsyncThunk('user/updateUser', async (user, { rejectWithValue }) => {
	try {
		const { _id, name, email, phoneNumber } = user;
		const response = await axios.put(url + _id, {
			name,
			email,
			phoneNumber,
		});
		return response.data;
	} catch (error) {
		return rejectWithValue(error.response?.data);
	}
});

const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: {
		[addUser.pending]: (state, action) => {
			return {
				...state,
				addUserStatus: 'pending',
				addUserError: '',
				getUsersStatus: '',
				getUsersError: '',
				deleteUserStatus: '',
				deleteUserError: '',
				updateUserStatus: '',
				updateUserError: '',
			};
		},
		[addUser.fulfilled]: (state, action) => {
			return {
				...state,
				users: [action.payload, ...state.users],
				addUserStatus: 'success',
				addUserError: '',
				getUsersStatus: '',
				getUsersError: '',
				deleteUserStatus: '',
				deleteUserError: '',
				updateUserStatus: '',
				updateUserError: '',
			};
		},
		[addUser.rejected]: (state, action) => {
			return {
				...state,
				addUserStatus: 'rejected',
				addUserError: action.payload,
				getUsersStatus: '',
				getUsersError: '',
				deleteUserStatus: '',
				deleteUserError: '',
				updateUserStatus: '',
				updateUserError: '',
			};
		},

		[getUsers.pending]: (state, action) => {
			return {
				...state,
				addUserStatus: '',
				addUserError: '',
				getTodosStatus: 'pending',
				getTodosError: '',
				deleteTodoStatus: '',
				deleteTodoError: '',
				updateUserStatus: '',
				updateUserError: '',
			};
		},
		[getUsers.fulfilled]: (state, action) => {
			return {
				...state,
				users: action.payload,
				addUserStatus: '',
				addUserError: '',
				getTodosStatus: 'success',
				getTodosError: '',
				deleteTodoStatus: '',
				deleteTodoError: '',
				updateUserStatus: '',
				updateUserError: '',
			};
		},
		[getUsers.rejected]: (state, action) => {
			return {
				...state,
				addUserStatus: '',
				addUserError: '',
				getTodosStatus: 'rejected',
				getTodosError: action.payload,
				deleteTodoStatus: '',
				deleteTodoError: '',
				updateUserStatus: '',
				updateUserError: '',
			};
		},
		[deleteUser.pending]: (state, action) => {
			return {
				...state,
				addUserStatus: '',
				addUserError: '',
				getTodosStatus: '',
				getTodosError: '',
				deleteTodoStatus: 'pending',
				deleteTodoError: '',
				updateUserStatus: '',
				updateUserError: '',
			};
		},
		[deleteUser.fulfilled]: (state, action) => {
			const currentUsers = state.users.filter((user) => user._id !== action.payload._id);
			return {
				...state,
				users: currentUsers,
				addUserStatus: '',
				addUserError: '',
				getTodosStatus: '',
				getTodosError: '',
				deleteTodoStatus: 'success',
				deleteTodoError: '',
				updateUserStatus: '',
				updateUserError: '',
			};
		},
		[deleteUser.rejected]: (state, action) => {
			state = {
				...state,
				addUserStatus: '',
				addUserError: '',
				getTodosStatus: '',
				getTodosError: '',
				deleteTodoStatus: 'rejected',
				deleteTodoError: action.payload,
				updateUserStatus: '',
				updateUserError: '',
			};
		},
		[updateUser.pending]: (state, action) => {
			return {
				...state,
				addUserStatus: '',
				addUserError: '',
				getTodosStatus: '',
				getTodosError: '',
				deleteTodoStatus: '',
				deleteTodoError: '',
				updateUserStatus: 'pending',
				updateUserError: '',
			};
		},
		[updateUser.fulfilled]: (state, action) => {
			const updatedUsers = state.users.map((user) => (user._id === action.payload._id ? action.paylaod : user));

			return {
				...state,
				users: updatedUsers,
				addUserStatus: '',
				addUserError: '',
				getTodosStatus: '',
				getTodosError: '',
				deleteTodoStatus: '',
				deleteTodoError: '',
				updateUserStatus: 'success',
				updateUserError: '',
			};
		},
		[updateUser.rejected]: (state, action) => {
			return {
				...state,
				addUserStatus: '',
				addUserError: '',
				getTodosStatus: '',
				getTodosError: '',
				deleteTodoStatus: '',
				deleteTodoError: '',
				updateUserStatus: 'rejected',
				updateUserError: action.payload,
			};
		},
	},
});

export default userSlice.reducer;
