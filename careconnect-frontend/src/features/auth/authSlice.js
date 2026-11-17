
import { createSlice } from '@reduxjs/toolkit';

const savedUser = localStorage.getItem('user');
const savedToken = localStorage.getItem('token');

const savedAdmin = localStorage.getItem('adminUser');
const savedAdminToken = localStorage.getItem('adminToken');

const authSlice = createSlice({
  name: 'auth',

  initialState: {
    user: savedUser ? JSON.parse(savedUser) : null,
    token: savedToken || null,

    adminUser: savedAdmin ? JSON.parse(savedAdmin) : null,
    adminToken: savedAdminToken || null
  },

  reducers: {
    // Patient login
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
    },

    // Patient logout
    logout: (state) => {
      state.user = null;
      state.token = null;

      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },

    // Admin login
    adminLoginSuccess: (state, action) => {
      state.adminUser = action.payload.user;
      state.adminToken = action.payload.token;

      localStorage.setItem('adminUser', JSON.stringify(action.payload.user));
      localStorage.setItem('adminToken', action.payload.token);
    },

    // Admin logout
    adminLogout: (state) => {
      state.adminUser = null;
      state.adminToken = null;

      localStorage.removeItem('adminUser');
      localStorage.removeItem('adminToken');
    }
  }
});

export const {
  loginSuccess,
  logout,
  adminLoginSuccess,
  adminLogout
} = authSlice.actions;

export default authSlice.reducer;
