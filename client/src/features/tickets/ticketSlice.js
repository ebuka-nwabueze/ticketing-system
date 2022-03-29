import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { newTicket, fetchTickets } from "./ticketService";


const initialState = {
  tickets: [],
  ticket: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new Ticket
export const createTicket = createAsyncThunk(
  "tickets/create",
  async (ticketData, thunkAPI) => {
    try {
      // Get token from the user in auth state
      const token = thunkAPI.getState().auth.user.token
      return await newTicket(ticketData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

        return thunkAPI.rejectWithValue(message)
    }
  }
);

// Get all Tickets
export const getTickets = createAsyncThunk(
  "tickets/getTickets",
  async (_, thunkAPI) => {
    try {
      // Get token from the user in auth state
      const token = thunkAPI.getState().auth.user.token
      return await fetchTickets(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

        return thunkAPI.rejectWithValue(message)
    }
  }
);

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers(builder) {
    builder
      .addCase(createTicket.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.isSuccess = true
        state.isLoading = false
        // Add any fetched data to the array
        state.ticket = action.payload
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.isError = true
        state.isLoading = false
        state.message = action.payload
      })
      .addCase(getTickets.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.isSuccess = true
        state.isLoading = false
        // Add any fetched data to the array
        state.tickets = action.payload
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.isError = true
        state.isLoading = false
        state.message = action.payload
      })
  }
})

export const {reset} = ticketSlice.actions

export default ticketSlice.reducer;
