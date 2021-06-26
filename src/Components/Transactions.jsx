import { deleteData, setUpdateInfo, toggleUpdate } from 'Redux/expense'
import { useSelector, useDispatch } from 'react-redux'
import deleteImg from 'Images/delete.png'
import editImg from 'Images/edit.png'
import EmptyContainer from './EmptyContainer'
import dateFormat from 'dateformat'

const Transactions = () => {
  const { filterlist } = useSelector((state) => state)
  const dispatch = useDispatch()

  const handleUpdate = (transaction) => {
    dispatch(toggleUpdate())
    dispatch(setUpdateInfo(transaction))
  }
  return (
    <div className="transaction-body">
      <div className="transaction-body-title">
        <h3>#</h3>
        <h3>Name</h3>
        <h3>Date</h3>
        <h3>Amount</h3>
        <h3>Status</h3>
      </div>
      <div className="transaction-history-body">
        {filterlist.length <= 0 ? (
          <EmptyContainer />
        ) : (
          filterlist.map((transaction, index) => (
            <div key={transaction.id} className="transaction-history">
              <h2>{index}</h2>
              <h2>{transaction.name}</h2>
              <h2>{dateFormat(transaction.timestamp, 'dd/mm/yyyy')}</h2>
              <h2>{transaction.amount}</h2>
              <h2 className={transaction.status}>{transaction.status}</h2>
              <div className="dropdown">
                <i className="gg-menu-left" />
                <div className="dropdown-content">
                  <div
                    className="dropdown-item"
                    onClick={() => handleUpdate(transaction)}
                  >
                    <img src={editImg} alt="edit" />
                    <h3>Edit</h3>
                  </div>
                  <hr />
                  <div
                    className="dropdown-item"
                    onClick={() => dispatch(deleteData(transaction))}
                  >
                    <img src={deleteImg} alt="delete" />
                    <h3>Delete</h3>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Transactions
