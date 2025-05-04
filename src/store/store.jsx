import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth/authSlice';
import ticketReducer from './slices/tickets/ticketSlice';
import noteReducer from './slices/notes/noteSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    ticket: ticketReducer,
    notes: noteReducer,
  },
});
