import { ICourier } from '@/types/courier';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { courierService } from '@services/courier.service';

const initialState: ICourier = {
  id: 0,
  lastName: '',
  firstName: '',
  middleName: '',
  city: {
    id: 0,
    name: '',
  },
  cityId: 0,
  numberOrders: 0,
  startWork: '',
  endWork: '',
  numberAuto: '',
  phone: '',
  orders: [],
};

export const fetchCourier = createAsyncThunk(
  'courier/fetchCouriers',
  async (id: number) => {
    return courierService.findById(id);
  },
);

export const courierSlice = createSlice({
  name: 'courier',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCourier.fulfilled, (state, action) => {
      if (!action.payload) return;

      state.id = action.payload.id;
      state.lastName = action.payload.lastName;
      state.firstName = action.payload.firstName;
      state.middleName = action.payload.middleName;
      state.city = action.payload.city;
      state.cityId = action.payload.cityId;
      state.numberOrders = action.payload.numberOrders;
      state.startWork = action.payload.startWork;
      state.endWork = action.payload.endWork;
      state.numberAuto = action.payload.numberAuto;
      state.phone = action.payload.phone;
      state.orders = action.payload.orders;
    });
  },
});

export const {} = courierSlice.actions;
export default courierSlice.reducer;
