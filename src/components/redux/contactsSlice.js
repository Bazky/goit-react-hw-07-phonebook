import { createSlice, createAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

export const loadContacts = createAction('contacts/load');
export const addContact = createAction('contacts/add');
export const deleteContact = createAction('contacts/delete');
export const setFilter = createAction('filter/set');

const contactsSlice = createSlice({
  name: 'phonebook',
  initialState: { contacts: [], filter: '' },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadContacts, state => {
        const storedContacts = localStorage.getItem('contacts');
        if (storedContacts) {
          state.contacts = JSON.parse(storedContacts);
        }
      })
      .addCase(addContact, (state, action) => {
        const contactWithId = { ...action.payload, id: nanoid() };
        state.contacts.push(contactWithId);
        localStorage.setItem('contacts', JSON.stringify(state.contacts));
      })
      .addCase(deleteContact, (state, action) => {
        state.contacts = state.contacts.filter(
          contact => contact.id !== action.payload
        );
        localStorage.setItem('contacts', JSON.stringify(state.contacts));
      })
      .addCase(setFilter, (state, action) => {
        state.filter = action.payload;
      });
  },
});

export default contactsSlice.reducer;
