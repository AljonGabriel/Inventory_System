import {useEffect} from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {useState} from "react";
import axios from "axios";
const ItemChart = ({handleMountFromParent}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getItemsChartData();
  }, [handleMountFromParent]);

  const getItemsChartData = async () => {
    try {
      const response = await axios.get("/api/items/audit/chart/");
      // Assuming the API response is an array of objects
      const itemsChartData = response.data;
      setData(itemsChartData);
    } catch (err) {
      console.error("Error fetching items chart data:", err);
    }
  };

  return (
    <>
      <h3>Item Chart</h3>
      <section className='hstack'>
        <LineChart width={500} height={300} data={data}>
          <XAxis dataKey='month' />
          <YAxis />
          <CartesianGrid stroke='#eee' strokeDasharray='5 5' />

          {/* Render Line for 'add' */}
          <Line type='monotone' dataKey='addCount' stroke='#007bff' />

          {/* Render Line for 'update' */}
          <Line type='monotone' dataKey='updateCount' stroke='#28a745' />

          {/* Render Line for 'delete' */}
          <Line type='monotone' dataKey='deleteCount' stroke='#dc3545' />
          <Tooltip />
          <Legend />
        </LineChart>
      </section>
    </>
  );
};

export default ItemChart;
