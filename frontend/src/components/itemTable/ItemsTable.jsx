import {Table, Row, Col, Button} from "react-bootstrap";
import axios from "axios";
import {useEffect, useState} from "react";
import UpdateItemModal from "../updateItemModal/UpdateItemModal";
import {toast} from "react-toastify";
import AddItemModal from "../addItemModal/AddItemModal";
import {useSelector} from "react-redux";

export default function ItemsTable() {
  const [fetchedItems, setFetchedItems] = useState([]);
  const [updateTable, setUpdateTable] = useState(false);

  const {userInfo} = useSelector((state) => state.auth);

  console.log(userInfo.role);

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
        toast.success(err);
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
          toast.success(err);
        });
    }
  };

  return (
    <>
      <Row>
        <Col className='justify-content-center mt-5'>
          {(userInfo && userInfo.role === "inventory") ||
          userInfo.role === "admin" ? (
            <AddItemModal setUpdateTable={handleUpdate} />
          ) : (
            <Button type='button' variant='outline-primary'>
              Convert to Excel
            </Button>
          )}
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
                        {(userInfo && userInfo.role === "inventory") ||
                        userInfo.role === "admin" ? (
                          <>
                            <UpdateItemModal
                              items={item}
                              setUpdateTable={handleUpdate}
                            />
                            <Button
                              onClick={() => deleteItem(item._id)}
                              variant='outline-danger'
                            >
                              Delete
                            </Button>
                          </>
                        ) : (
                          <p>No Access</p>
                        )}
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <tr>
                  <td>
                    <p className='text-center'>No records found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
}
