import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { ticketService } from './ticketService';

const initialState = {
  tickets: [],
  ticket: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

//Create new ticket
export const createTickets = createAsyncThunk(
  'ticket/create',
  async (ticketData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.createTicket(ticketData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message;
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getTickets = createAsyncThunk(
  'tickets/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.getAllTickets(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message;
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSingleTicket = createAsyncThunk(
  'ticket/get',
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.getTicket(ticketId, token);
    } catch (error) {
      const message =
        (error.response && error.response.data) ||
        error.response.data.message ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const closeTicket = createAsyncThunk(
  'ticket/close',
  async (ticketId, thunkAPI) => {
    try {
      const token = await thunkAPI.getState().auth.user.token;
      return await ticketService.closedTicket(ticketId, token);
    } catch (error) {
      const message =
        (error.response && error.response.data) ||
        error.response.data.message ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTickets.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createTickets.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tickets = action.payload;
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSingleTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ticket = action.payload;
      })
      .addCase(getSingleTicket.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(closeTicket.fulfilled, (state, action) => {
        state.tickets.map((ticket) =>
          ticket._id === action.payload._id
            ? (ticket.status = 'closed')
            : ticket
        );
      });
  },
});

export const { reset } = ticketSlice.actions;

export default ticketSlice.reducer;
