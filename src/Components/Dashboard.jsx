import DashboardBody from "Components/DashboardBody";
import DashboardHeader from "Components/DashboardHeader";
import TransactionsHeader from "Components/TransactionsHeader";
import Transactions from "Components/Transactions";
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const searchKey = useSelector((state) => state.searchKey);

  return (
    <div className={`dashboard ${searchKey && "dashboard-search"}`}>
      <DashboardHeader />
      <DashboardBody />
      <TransactionsHeader />
      <Transactions />
    </div>
  );
};

export default Dashboard