import {
  toggleNew,
  updateFiler,
  updateSort,
  updateSortType,
} from "Redux/expense";
import { useSelector, useDispatch } from 'react-redux'
import { CSVLink } from "react-csv";
import Dropdown from "react-dropdown";

import addImg from "Images/add.png";
import downloadImg from "Images/download.png";

const TransactionsHeader = () => {
  const { history, sort, sortType, filter } = useSelector((state) => state);
  const dispatch = useDispatch();

  const filterOptions = ["All", "Income", "Expense", "Due"];
  const sortTypeOptions = ["Asc", "Dec"];
  const sortOptions = ["Amount", "Date"];

  const __updateFilter = (value) => {
    dispatch(updateFiler(value.value));
  };

  const __updateSort = (value) => {
    dispatch(updateSort(value.value));
  };

  const __updateSortType = (value) => {
    dispatch(updateSortType(value.value));
  };

  const __toggleNew = () => {
    dispatch(toggleNew());
  };

  return (
    <div className="transaction-header">
      <h2 className="transaction-title">Recent Transactions</h2>
      <div className="transaction-buttons">
        <div className="transaction-button">
          Sort
          <Dropdown
            className="transaction-filter-container-1"
            controlClassName="transaction-filter-dropdown"
            value={sort}
            options={sortOptions}
            onChange={__updateSort}
          />
        </div>

        <div className="transaction-button">
          Filter
          <Dropdown
            className="transaction-filter-container-2"
            controlClassName="transaction-filter-dropdown"
            value={sortType}
            options={sortTypeOptions}
            onChange={__updateSortType}
          />
        </div>

        <div className="transaction-button">
          Status
          <Dropdown
            className="transaction-filter-container-3"
            controlClassName="transaction-filter-dropdown"
            value={filter}
            options={filterOptions}
            onChange={__updateFilter}
          />
        </div>
        <div className="transaction-button">
          <img src={downloadImg} alt="Download" />
          <CSVLink
            className="csv-downlaod"
            filename="transactions.csv"
            data={history}
          >
            Download
          </CSVLink>
        </div>
        <div className="transaction-button" onClick={__toggleNew}>
          <img src={addImg} alt="Add Item" />
          Add
        </div>
      </div>
    </div>
  );
};

export default TransactionsHeader
