import {useEffect} from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  Rectangle,
} from "recharts";
import {useState} from "react";
import axios from "axios";
import {Col, Row} from "react-bootstrap";
const ItemChart = ({handleMountFromParent}) => {
  const [data, setData] = useState([]);
  const [cCount, setCcount] = useState([]);

  useEffect(() => {
    getItemsChartData();
    categoriesCount();
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

  const categoriesCount = async () => {
    try {
      const categoriesCount = await axios.get("/api/items/category");

      const groupCategoriesCount = categoriesCount.data;

      setCcount(groupCategoriesCount);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <section className='my-3'>
        <Row>
          <Col>
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
          </Col>

          <Col>
            <BarChart
              width={500}
              height={300}
              data={cCount}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='_id' />
              <YAxis />
              <Tooltip />

              <Bar
                dataKey='count'
                fill='#28a745'
                activeBar={<Rectangle fill='pink' stroke='blue' />}
                barSize={50}
                label={data}
              />
            </BarChart>
          </Col>
        </Row>
      </section>
    </>
  );
};

export default ItemChart;
