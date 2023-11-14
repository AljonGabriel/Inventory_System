import {Button} from "react-bootstrap";
import axios from "axios";
import {toast} from "react-toastify";
const ButtonDeleteAllItemLogs = ({mountProps}) => {
  const deleteAllItemLogsHandler = async () => {
    try {
      const shouldClose = window.confirm(`Proceed to delete this item? `);
      if (shouldClose) {
        await axios.delete("/api/itemLogs/deleteAll");
        mountProps();
        toast.success(`Successfully deleted all Logs`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Button variant='outline-danger ms-1' onClick={deleteAllItemLogsHandler}>
      Delete all logs
    </Button>
  );
};
export default ButtonDeleteAllItemLogs;
