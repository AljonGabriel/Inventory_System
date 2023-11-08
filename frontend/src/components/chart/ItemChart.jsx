import {LineChart, Line, XAxis, YAxis, CartesianGrid} from "recharts";
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
      </section>
    </>
  );
};

export default ItemChart;
