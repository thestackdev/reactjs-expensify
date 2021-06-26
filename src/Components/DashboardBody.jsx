import { useSelector } from 'react-redux'

const DashboardBody = () => {
  const { overview, searchKey } = useSelector((state) => state);
  return (
    <div
      className={
        searchKey ? 'dashboard-body-header-none' : 'dashboard-body-header'
      }
    >
      <div className="dashboard-card-container">
        {overview.map((card) => (
          <div key={card.id} className="dashboard-card">
            <img src={card.src} alt="" />
            <h3>{card.title}</h3>
            <h1 className="title">₹{card.value}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardBody
