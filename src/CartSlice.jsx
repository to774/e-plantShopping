import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    totalItems: 0
  },
  reducers: {
    addItem: (state, action) => {
        addItem: (state, action) => {
            const { name, image, cost } = action.payload;
            const exsistingItem = state.items.find(item => item.name === name);
            if (exsistingItem) {
                exsistingItem.quantity++;
            } else {
                state.items.push({ name, image, cost, quantity: 1});
                state.totalItems = state.totalItems + 1;
            }
        }
    },
    removeItem: (state, action) => {
        const {name} = action.payload;
        const itemRemoved = state.items.findIndex(item => item.name === name);
        if (itemRemoved) {
            state.totalItems = state.totalItems - (state.items[index].quantity);
            state.items = state.items.filter(item => item.name !== name);
        }
    },
    updateQuantity: (state, action) => {
        const {name, quantity} = action.payload;
        const itemToUpdate = state.items.find(item => item.name === name);
        if (itemToUpdate) {
            state.totalItems += (quantity - itemToUpdate.quantity);
            itemToUpdate.quantity = quantity;
        }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
