import {Table, Row, Col, Button, Form} from "react-bootstrap";
import axios from "axios";
import {useEffect, useState} from "react";
import UpdateItemModal from "../updateItemModal/UpdateItemModal";
import {toast} from "react-toastify";
import AddItemModal from "../addItemModal/AddItemModal";
import {useSelector} from "react-redux";
import ButtonJsonToExcel from "../btnJSONToExcel/ButtonJsonToExcel";
import ButtonMultipleDelete from "../buttonMultipleDelete/ButtonMultipleDelete";
import CountItems from "../../context/countItems/CountItems";
import ButtonDelete from "../buttonDelete/ButtonDelete";

export default function ItemsTable({sendHandleMountToParent}) {
  const [fetchedItems, setFetchedItems] = useState([]);
  /*   const [itemsCount, setItemsCount] = useState(); */
  const [mount, setMount] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const {userInfo} = useSelector((state) => state.auth);

  // Callback function to handle updates
  const handleMount = () => {
    setMount(!mount);
    sendHandleMountToParent();
  };

  useEffect(() => {
    fetchItems();
    /*  getItemsCount(); */
  }, [mount]);

  const fetchItems = async () => {
    await axios
      .get("/api/items/data")
      .then((res) => {
        setFetchedItems(res.data);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const handleCheckboxChange = (itemId, itemName) => {
    if (selectedItems.some((item) => item.id === itemId)) {
      // If the item with the same ID is already in the selectedItems array, remove it
      setSelectedItems(selectedItems.filter((item) => item.id !== itemId));
    } else {
      // Add the selected item's ID and name to the selectedItems array
      setSelectedItems([...selectedItems, {id: itemId, name: itemName}]);
    }
  };

  // You can use selectedItems.length to check how many checkboxes are selected
  const isButtonVisible = selectedItems.length > 1;

  console.log(selectedItems);

  return (
    <>
      <Row>
        <Col className='justify-content-center my-1'>
          {isButtonVisible ? (
            <ButtonMultipleDelete
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              mountProps={handleMount}
            />
          ) : isButtonVisible <= 0 ? null : null}

          {userInfo && userInfo.role === "inventory" && (
            <AddItemModal mountProps={handleMount} />
          )}

          {userInfo.role === "view" && <ButtonJsonToExcel />}

          {userInfo.role === "admin" && (
            <>
              <ButtonJsonToExcel />
              <AddItemModal mountProps={handleMount} />
            </>
          )}

          {userInfo.role === "none" && "No Access"}

          <CountItems mountProps={handleMount} />

          <section style={{height: 400, overflow: "auto"}}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>✔️</th>
                  <th>#</th>
                  <th>ID</th>
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
                          <Form.Check
                            onChange={() =>
                              handleCheckboxChange(item._id, item.itemName)
                            }
                            checked={selectedItems.some(
                              (selectedItem) => selectedItem.id === item._id,
                            )}
                          />
                        </td>

                        <td>{index + 1}</td>
                        <td>{item._id}</td>
                        <td>{item.itemName}</td>
                        <td>{item.itemDescription}</td>
                        <td>{item.category}</td>
                        <td>{item.quantity}</td>
                        <td>
                          <b>{item.addedBy}</b>
                        </td>
                        <td>{new Date(item.createdAt).toLocaleString()}</td>

                        <td>
                          {(userInfo && userInfo.role === "inventory") ||
                          userInfo.role === "admin" ? (
                            <>
                              <UpdateItemModal
                                items={item}
                                mountProps={handleMount}
                              />
                              <ButtonDelete
                                id={item._id}
                                mountProps={handleMount}
                                action={"items"}
                              />
                            </>
                          ) : (
                            <small className='text-danger'>No Access</small>
                          )}
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <tr>
                    <td>
                      <small className='text-center'>No records found</small>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </section>
        </Col>
      </Row>
    </>
  );
}
