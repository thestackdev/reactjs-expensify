import { createSlice } from '@reduxjs/toolkit'
import balanceImg from 'Images/balance.png'
import expenseImg from 'Images/expense.png'
import incomeImg from 'Images/income.png'
import dueImg from 'Images/due.png'
import { LOCALSTORAGEKEY } from 'Redux/Constants'

let initialState = {
  overview: [
    {
      id: 1,
      title: 'Income',
      src: incomeImg,
      value: 0,
      color: '#4F61FF',
    },
    {
      id: 2,
      title: 'Expense',
      src: expenseImg,
      value: 0,
      color: '#C652FF',
    },
    {
      id: 3,
      title: 'Balance',
      src: balanceImg,
      value: 0,
      color: '#84B497',
    },
    {
      id: 4,
      title: 'Due',
      src: dueImg,
      value: 0,
      color: '#f16464',
    },
  ],
  updateInfo: {},
  history: [],
  newModal: false,
  updateModal: false,
  filter: 'All',
  sortType: 'Dec',
  sort: 'Date',
  searchKey: undefined,
  filterlist: [],
  darkTheme: false,
}

const loaclData = localStorage.getItem(LOCALSTORAGEKEY)
if (loaclData) initialState = JSON.parse(loaclData)

if (initialState.darkTheme) document.body.classList.toggle('dark')

const slice = createSlice({
  name: 'expense',
  initialState: initialState,
  reducers: {
    toggleNew: (state, payload) => {
      state.newModal = !state.newModal
    },
    toggleUpdate: (state, payload) => {
      state.updateModal = !state.updateModal
    },
    updateFiler: (state, payload) => {
      state.filter = payload.payload
      state.filterlist = updateFilters(state)
    },
    updateSort: (state, payload) => {
      state.sort = payload.payload
      state.filterlist = updateFilters(state)
    },
    updateSortType: (state, payload) => {
      state.sortType = payload.payload
      state.filterlist = updateFilters(state)
    },
    updateSearchKey: (state, payload) => {
      state.searchKey = payload.payload
      state.filterlist = updateFilters(state)
    },
    setUpdateInfo: (state, payload) => {
      state.updateInfo = payload.payload
    },
    resetUpdateInfo: (state, payload) => {
      state.updateInfo = {}
    },
    pushData: (state, payload) => {
      let { name, amount, status, timestamp } = payload.payload.newObj
      amount = parseFloat(amount)
      state.history.push({
        id: timestamp,
        name,
        amount,
        status,
        timestamp,
      })

      state.overview = updateAmount(state.overview, status, amount, 1)
      state.filterlist = updateFilters(state)
    },
    deleteData: (state, payload) => {
      const { id, status, amount } = payload.payload

      state.overview = updateAmount(
        state.overview,
        state.updateInfo.status,
        amount,
        1
      )
      state.overview = updateAmount(state.overview, status, amount, 2)
      state.history = state.history.filter((item) => item.id !== id)
      state.filterlist = updateFilters(state)
    },

    updateData: (state, payload) => {
      const transc = state.history.findIndex(
        (ele) => ele.id === state.updateInfo.id
      )
      let { name, amount, status, timestamp } = payload.payload.newObj
      amount = parseFloat(amount)

      state.history[transc].name = name
      state.history[transc].amount = amount
      state.history[transc].status = status
      state.history[transc].timestamp = timestamp

      state.overview = updateAmount(
        state.overview,
        state.updateInfo.status,
        state.updateInfo.amount,
        2
      )

      state.overview = updateAmount(state.overview, status, amount, 1)

      state.updateInfo = {}
      state.filterlist = updateFilters(state)
    },
  },
})

export const {
  toggleNew,
  toggleUpdate,
  pushData,
  deleteData,
  resetUpdateInfo,
  setUpdateInfo,
  updateData,
  updateFiler,
  updateSort,
  updateSortType,
  updateSearchKey,
  searchKeyList,
} = slice.actions
export default slice.reducer

const updateAmount = (overview, status, amount, type) => {
  let updatedOverview = overview
  switch (type) {
    case 1:
      switch (status) {
        case 'Income':
          updatedOverview[0].value += amount
          updatedOverview[2].value += amount
          break
        case 'Expense':
          updatedOverview[1].value += amount
          updatedOverview[2].value -= amount
          break
        case 'Due':
          updatedOverview[3].value += amount
          break
        default:
          break
      }
      break

    case 2:
      switch (status) {
        case 'Income':
          updatedOverview[0].value -= amount
          updatedOverview[2].value -= amount
          break
        case 'Expense':
          updatedOverview[1].value -= amount
          updatedOverview[2].value += amount
          break
        case 'Due':
          updatedOverview[3].value -= amount
          break
        default:
          break
      }
      break
    default:
      break
  }

  return updatedOverview
}

const updateFilters = (state) => {
  let templist = state.history

  if (state.searchKey) {
    templist = [...templist].filter((e) =>
      e.name.toLowerCase().includes(state.searchKey.toLowerCase())
    )
  }

  if (state.filter !== 'All') {
    templist = [...templist].filter((e) => e.status === state.filter)
  }

  switch (state.sortType) {
    case 'Asc':
      if (state.sort === 'Amount')
        return [...templist].sort((a, b) => a.amount - b.amount)
      return [...templist].sort((a, b) => a.timestamp - b.timestamp)
    case 'Dec':
      if (state.sort === 'Amount')
        return [...templist].sort((a, b) => b.amount - a.amount)
      return [...templist].sort((a, b) => b.timestamp - a.timestamp)

    default:
      break
  }
  return templist
}
