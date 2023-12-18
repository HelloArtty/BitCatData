import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signoutUserStart: (state) => {
      state.loading = true;
    },
    signoutUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    signoutUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    addContactStart: (state) => {
      state.loading = true;
    },
    addContactSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    addContactFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    addLocationStart: (state) => {
      state.loading = true;
    },
    addLocationSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    addLocationFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },


  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutUserStart,
  signoutUserSuccess,
  signoutUserFailure,
  addContactStart,
  addContactSuccess,
  addContactFailure,
  addLocationStart,
  addLocationSuccess,
  addLocationFailure,
} = userSlice.actions;

export default userSlice.reducer;
