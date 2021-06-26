import { updateSearchKey } from 'Redux/expense'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'

const DashboardHeader = () => {
  const dispatch = useDispatch()
  const search = useRef()

  const handleSearch = () => {
    if (search.current.value.length > 0) {
      dispatch(updateSearchKey(search.current.value))
    } else dispatch(updateSearchKey(undefined))
  }

  return (
    <div className="dashboard-header-container">
      <div>
        <h1 className="title">Dashboard</h1>
        <h3 className="sub-title">Check all your expenditure</h3>
      </div>
      <div className="dashboard-header-search">
        <i className="gg-search" />
        <input
          ref={search}
          onChange={handleSearch}
          className="search"
          type="text"
          placeholder="Search here..."
        />
      </div>
    </div>
  )
}

export default DashboardHeader
