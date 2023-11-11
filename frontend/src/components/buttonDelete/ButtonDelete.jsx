import {Button} from "react-bootstrap";
import {toast} from "react-toastify";
import axios from "axios";

const ButtonDelete = ({id, mountProps, action}) => {
  const itemDeleteHandle = async () => {
    const shouldClose = window.confirm("Proceed to delete this item?");
    if (shouldClose) {
      await axios
        .delete(`api/items/data/${id}`)
        .then((res) => {
          toast.success("Deleted successfully" + res.data);
          mountProps();
        })
        .catch((err) => {
          toast.error(err);
        });
    }
  };

  const userDeleteHandle = async () => {
    const shouldClose = window.confirm(
      `Action: ${action} Proceed to delete this item? `,
    );
    if (shouldClose) {
      await axios
        .delete(`api/users/delete/${id}`)
        .then((res) => {
          toast.success("Deleted successfully" + res.data);
          mountProps();
        })
        .catch((err) => {
          toast.error(err);
        });
    }
  };
  return (
    <>
      <Button
        variant='outline-danger'
        onClick={() => {
          action === "items"
            ? itemDeleteHandle()
            : action === "users"
            ? userDeleteHandle()
            : "";
        }}
      >
        Delete
      </Button>
    </>
  );
};

export default ButtonDelete;
