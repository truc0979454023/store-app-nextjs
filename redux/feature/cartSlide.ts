import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
  items: CartItem[];
  notify: { id: number; message: string };
  total: number;
}

const initialState: CartState = {
  items: [],
  notify: { id: 0, message: "" },
  total: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
    addToCart: (state: CartState, action: PayloadAction<Product>) => {
      state.notify.id += 1;
      if (!state.items.find((item) => item._id === action.payload._id)) {
        state.items = [...state.items, { ...action.payload, quantity: 1 }];
        state.notify.message = `${action.payload.title} added to cart.`;
        localStorage.setItem("cart", JSON.stringify(state.items));
      } else {
        state.notify.message = `${action.payload.title} existed in cart.`;
      }
    },
    removeToCart: (state: CartState, action: PayloadAction<Product>) => {
      (state.items = state.items.filter(
        (item) => item._id !== action.payload._id
      )),
        localStorage.setItem("cart", JSON.stringify(state.items));
    },
    getTotal: (state: CartState) => {
      state.total = state.items.reduce(
        (total, item) => (total += item.price * item.quantity),
        0
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { getCart, addToCart, removeToCart, getTotal } = cartSlice.actions;

export default cartSlice.reducer;
