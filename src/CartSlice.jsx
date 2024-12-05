import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    totalItems: 0
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
        state.totalItems++; // Increment total items count
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
        state.totalItems++; // Increment total items count
      }
    },
    removeItem: (state, action) => {
      const { name } = action.payload;
      const index = state.items.findIndex(item => item.name === name);
      if (index > -1) {
        state.totalItems -= state.items[index].quantity; // Subtract the quantity of the removed item
        state.items.splice(index, 1); // Remove the item from the list
      }
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const index = state.items.find(item => item.name === name);
      if (index > -1) {
        const oldQuantity = state.items[index].quantity;
        state.items[index].quantity = quantity;
        state.totalItems += quantity - oldQuantity; // Adjust totalItems based on the difference
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
