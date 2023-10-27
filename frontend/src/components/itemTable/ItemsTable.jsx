import {Table, Row, Col, Button} from "react-bootstrap";
import axios from "axios";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import UpdateModal from "../updateModal/UpdateModal";
import {toast} from "react-toastify";

export default function ItemsTable() {
  const [fetchedItems, setFetchedItems] = useState([]);
  const [updateTable, setUpdateTable] = useState(false);

  // Callback function to handle updates
  const handleUpdate = () => {
    setUpdateTable(!updateTable);
  };

  useEffect(() => {
    fetchItems();
  }, [updateTable]);

  const fetchItems = async () => {
    await axios
      .get("/api/items/data")
      .then((res) => {
        setFetchedItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteItem = async (itemID) => {
    const shouldClose = window.confirm("Proceed to delete this item?");
    if (shouldClose) {
      await axios
        .delete(`api/items/data/${itemID}`)
        .then((res) => {
          console.log(res);
          handleUpdate();
          toast.success("Deleted successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  console.log(fetchedItems);

  console.log(updateTable);

  return (
    <>
      <Row>
        <Col className='justify-content-center mt-5'>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Item name</th>
                <th>Item description</th>
                <th>quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {fetchedItems.length > 0 ? (
                <>
                  {fetchedItems.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.itemName}</td>
                      <td>{item.itemDescription}</td>
                      <td>{item.quantity}</td>
                      <td>
                        <UpdateModal
                          items={item}
                          setUpdateTable={handleUpdate}
                        />
                        <Button
                          onClick={() => deleteItem(item._id)}
                          variant='outline-danger'
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <h2 className='text-center'>No records found</h2>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
}
