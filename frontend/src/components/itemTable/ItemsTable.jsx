import {Table, Row, Col, Button, Form} from "react-bootstrap";
import axios from "axios";
import {useEffect, useState} from "react";
import UpdateItemModal from "../updateItemModal/UpdateItemModal";
import {toast} from "react-toastify";
import AddItemModal from "../addItemModal/AddItemModal";
import {useSelector} from "react-redux";
import ButtonJsonToExcel from "../btnJSONToExcel/ButtonJsonToExcel";

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
          {userInfo && userInfo.role === "inventory" && (
            <AddItemModal setUpdateTable={handleUpdate} />
          )}

          {userInfo.role === "view" && <ButtonJsonToExcel />}

          {userInfo.role === "admin" && (
            <>
              <ButtonJsonToExcel />
              <AddItemModal setUpdateTable={handleUpdate} />
            </>
          )}

          {userInfo.role === "none" && "No Access"}

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>✔️</th>
                <th>#</th>
                <th>Item name</th>
                <th>Item description</th>
                <th>Category</th>
                <th>quantity</th>
                <th>Appended by </th>
                <th>Added date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {fetchedItems.length > 0 ? (
                <>
                  {fetchedItems.map((item, index) => (
                    <tr key={item._id}>
                      <td>
                        <Form>
                          <div key={`default`} className='mb-3'>
                            <Form.Check // prettier-ignore
                              id={`default`}
                            />
                          </div>
                        </Form>
                      </td>
                      <td>{index + 1}</td>
                      <td>{item.itemName}</td>
                      <td>{item.itemDescription}</td>
                      <td>{item.category}</td>
                      <td>{item.quantity}</td>
                      <td>
                        <b>{item.addedBy}</b>
                      </td>
                      <td>
                        <p>{new Date(item.createdAt).toLocaleString()}</p>
                      </td>

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
                          <p className='text-danger'>No Access</p>
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
