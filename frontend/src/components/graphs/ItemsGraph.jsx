import {useEffect, useState} from "react";
import {
  BarChart,
  Legend,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import axios from "axios";

const ItemsGraph = () => {
  const [itemsCount, setItemsCount] = useState();
  useEffect(() => {
    const fetchItemsCount = async () => {
      await axios.get("/api/items/itemsCount").then((res) => {
        setItemsCount(res.data);
      });
    };

    fetchItemsCount();
  }, []);

  console.log(itemsCount);

  const data = [{label: "2024", items: itemsCount, users: 10}];

  return (
    <>
      <BarChart width={730} height={250} data={data}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='items' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='items' fill='#8884d8' />
        <Bar dataKey='users' fill='#82ca9d' />
      </BarChart>
    </>
  );
};

export default ItemsGraph;
