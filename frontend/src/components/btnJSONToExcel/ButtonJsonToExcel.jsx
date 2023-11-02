import {Button} from "react-bootstrap";
import axios from "axios";

const ButtonJsonToExcel = () => {
  const handleDownload = () => {
    // Make a GET request to your server endpoint that generates the Excel file
    axios
      .get("/api/items/exportItemsToExcel", {responseType: "blob"})
      .then((response) => {
        if (response.data instanceof Blob) {
          const currentDate = new Date();
          const year = currentDate.getFullYear();
          const month = (currentDate.getMonth() + 1)
            .toString()
            .padStart(2, "0");
          const day = currentDate.getDate().toString().padStart(2, "0");

          const formattedDate = `${year}-${day}-${month}`;

          const url = window.URL.createObjectURL(response.data);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `Items-Table-${formattedDate}.xlsx`);
          document.body.appendChild(link);
          link.click();
        } else {
          console.error("Invalid response data. Expected a Blob.");
        }
      })
      .catch((error) => {
        console.error("Error during download:", error);
      });
  };

  return (
    <Button variant='outline-primary m-1' onClick={handleDownload}>
      Convert to Excel
    </Button>
  );
};

export default ButtonJsonToExcel;
