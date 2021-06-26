import {
  toggleUpdate,
  updateData,
  resetUpdateInfo,
} from "Redux/expense";
import Modal from 'Components/Modal'
import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Datepicker from 'react-datepicker'
import Dropdown from "react-dropdown";

const UpdateTransaction = () => {
  const [startDate, setStartDate] = useState(new Date());
  const { updateModal, updateInfo } = useSelector((state) => state);
  const dispatch = useDispatch();

  const name = useRef();
  const amount = useRef();

  const dropDownOptions = ["Income", "Expense", "Due"];
  const [dropDownOption, setdropDownOption] = useState(dropDownOptions[0]);

  const resetInputs = () => { };

  const submit = (event) => {
    event.preventDefault();
    const newObj = {
      name: name.current.value,
      amount: amount.current.value,
      status: dropDownOption,
      timestamp: startDate,
    };

    dispatch(updateData({ newObj }));
    dispatch(toggleUpdate());
    resetInputs();
  };

  useEffect(() => {
    name.current.value = updateInfo.name;
    amount.current.value = updateInfo.amount;
    setdropDownOption(updateInfo.status);
  }, [updateInfo.name, updateInfo.amount, updateInfo.status]);

  return (
    <Modal
      visible={updateModal}
      handleClose={() => {
        dispatch(toggleUpdate());
        dispatch(resetUpdateInfo());
      }}
    >
      <form className="modal" onSubmit={submit}>
        <h1>Update Transaction</h1>
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

export default UpdateTransaction
