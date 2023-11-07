import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
const ItemChart = () => {
  const data = [
    {name: "Page A", uv: 400, pv: 2400, amt: 2400},
    {name: "Page A", uv: 500, pv: 2600, amt: 3400},
    {name: "Page A", uv: 800, pv: 8400, amt: 2300},
  ];

  return (
    <>
      <h3>Item Chart</h3>
      <section className='hstack'>
        <LineChart width={500} height={300} data={data}>
          {" "}
          <XAxis dataKey='name' /> <YAxis />{" "}
          <CartesianGrid stroke='#eee' strokeDasharray='5 5' />{" "}
          <Line type='monotone' dataKey='uv' stroke='#8884d8' />{" "}
          <Line type='monotone' dataKey='pv' stroke='#82ca9d' />{" "}
        </LineChart>

        <BarChart width={600} height={400} data={data}>
          <XAxis dataKey='name' stroke='#8884d8' />
          <YAxis />
          <Tooltip wrapperStyle={{width: 100, backgroundColor: "#ccc"}} />
          <Legend
            width={100}
            wrapperStyle={{
              top: 40,
              right: 20,
              backgroundColor: "#f5f5f5",
              border: "1px solid #d5d5d5",
              borderRadius: 3,
              lineHeight: "40px",
            }}
          />
          <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
          <Bar dataKey='uv' fill='#8884d8' barSize={30} />
        </BarChart>
      </section>
    </>
  );
};

export default ItemChart;
