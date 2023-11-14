import {Button} from "react-bootstrap";
import axios from "axios";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";

const ButtonMultipleDelete = ({
  selectedItems,
  setSelectedItems,
  mountProps,
}) => {
  const {userInfo} = useSelector((state) => state.auth);

  const handleDeleteSelected = async () => {
    const shouldClose = window.confirm(
      `Proceed to delete selected items: ${selectedItems.map(
        (items) => items.name,
      )}`,
    );

    if (shouldClose) {
      // Send a request to the backend to delete selected items.
      await axios
        .delete("/api/items/deleteMultipleData", {
          data: {itemsData: selectedItems, user: userInfo},
        })
        .then((res) => {
          console.log(res);
          setSelectedItems([]);
          mountProps();
          toast.success(
            `Deleted items successfully ${selectedItems.map(
              (items) => items.name,
            )}`,
          );
        });
    }
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
