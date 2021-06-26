import { configureStore } from '@reduxjs/toolkit'
import expense from 'Redux/expense'
import { LOCALSTORAGEKEY } from 'Redux/Constants'

const store = configureStore({ reducer: expense })
store.subscribe(() => {
    localStorage.setItem(LOCALSTORAGEKEY, JSON.stringify(store.getState()));
})

export default store