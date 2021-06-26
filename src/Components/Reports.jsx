import { useSelector } from 'react-redux'
import { PieChart } from "react-minimal-pie-chart";


const Reports = () => {
  const overview = useSelector((state) => state.overview);

  return (
    <div className="reports">
      <h1 className="title">Reports</h1>
      <PieChart
        className="pie-chart"
        lineWidth={25}
        rounded={true}
        radius={30}
        animate={true}
        background="#EBEBF0"
        data={overview}
      />
      {overview.map((item) => (
        <div key={item.id} className="list">
          <div className={`block ${item.title}`}></div>
          <h2>{item.title}</h2>
          <h2 className="title">₹{item.value}</h2>
        </div>
      ))}
    </div>
  );
};

export default Reports
