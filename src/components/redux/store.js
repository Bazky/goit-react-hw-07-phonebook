import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './contactsSlice';

const store = configureStore({
  reducer: {
    phonebook: contactsReducer,
  },
});

export default store;
