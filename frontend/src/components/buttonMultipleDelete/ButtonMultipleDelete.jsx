import {Button} from "react-bootstrap";
import axios from "axios";

const ButtonMultipleDelete = ({selectedIDProp, mountProps}) => {
  const handleDeleteSelected = async () => {
    // Send a request to the backend to delete selected items.
    await axios
      .delete("/api/items/deleteMultipleData", {
        data: {itemIds: selectedIDProp},
      })
      .then((res) => {
        console.log(res);
        mountProps();
      });
  };
  return (
    <>
      <Button onClick={handleDeleteSelected} className='btn btn-danger'>
        Delete Selected
      </Button>
    </>
  );
};

export default ButtonMultipleDelete;
