import {
  toggleNew,
  pushData,
} from "Redux/expense";
import Modal from 'Components/Modal'
import { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Datepicker from 'react-datepicker'
import Dropdown from "react-dropdown";

const NewTransaction = () => {
  const [startDate, setStartDate] = useState(new Date());

  const newModal = useSelector((state) => state.newModal);
  const dispatch = useDispatch();

  const dropDownOptions = ["Income", "Expense", "Due"];
  const [dropDownOption, setdropDownOption] = useState(dropDownOptions[0]);

  const name = useRef();
  const amount = useRef();

  const resetInputs = () => {
    name.current.value = "";
    amount.current.value = "";
  };

  const submit = (event) => {
    event.preventDefault();
    const newObj = {
      name: name.current.value,
      amount: amount.current.value,
      status: dropDownOption,
      timestamp: startDate,
    };

    dispatch(pushData({ newObj }));
    dispatch(toggleNew());
    resetInputs();
  };

  return (
    <Modal
      visible={newModal}
      handleClose={() => {
        dispatch(toggleNew());
        resetInputs();
      }}
    >
      <form className="modal" onSubmit={submit}>
        <h1>Add new Transaction</h1>
        <div className="modal-input">
          <div className="container">
            <label>Name</label>
            <input className="input" ref={name} required type="text" />
          </div>
          <div className="container">
            <label>Amount</label>
            <input className="input" ref={amount} required type="number" />
          </div>
          <div className="container">
            <label>Date</label>
            <Datepicker
              className="input"
              selected={startDate}
              dateFormat="dd/MM/yyyy"
              onChange={(date) => setStartDate(date)}
            ></Datepicker>
          </div>

          <div className="container">
            <label>Status</label>
            <Dropdown
              options={dropDownOptions}
              value={dropDownOption}
              onChange={(e) => setdropDownOption(e.value)}
            />
          </div>
          <button className="submit">Submit</button>
        </div>
      </form>
    </Modal>
  );
};

export default NewTransaction
