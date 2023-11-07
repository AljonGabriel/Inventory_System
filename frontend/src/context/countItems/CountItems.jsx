import axios from "axios";
import {useState, useEffect} from "react";

const CountItems = ({mountProps}) => {
  const [itemsCount, setItemsCount] = useState(0);

  useEffect(() => {
    console.log("mountProps value:", mountProps); // Log the value

    getItemsCount();
  }, [mountProps]);

  const getItemsCount = async () => {
    await axios
      .get("/api/items/itemsCount")
      .then((res) => {
        setItemsCount(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <p>
        No. of Items:{" "}
        {itemsCount && itemsCount
          ? itemsCount
          : itemsCount <= 0
          ? "0"
          : "No record found"}
      </p>
    </>
  );
};

export default CountItems;
