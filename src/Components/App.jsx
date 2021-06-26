import NewTransaction from "Components/NewTransaction";
import UpdateTransaction from "Components/UpdateTransaction";
import Dashboard from "Components/Dashboard";
import Reports from "Components/Reports";

const App = () => {
  return (
    <div className="app">
      <Dashboard />
      <Reports />
      <NewTransaction />
      <UpdateTransaction />
    </div>
  );
};

export default App
