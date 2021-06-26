import { configureStore } from '@reduxjs/toolkit'
import expense from 'Redux/expense'

const store = configureStore({ reducer: expense })
store.subscribe(() => {
    localStorage.setItem('LOCALSTORAGEKEY', JSON.stringify(store.getState()));
})

export default store