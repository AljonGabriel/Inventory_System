import {Table} from "react-bootstrap";
import axios from "axios";
import {useEffect, useState} from "react";
import ButtonMultipleDelete from "../buttonMultipleDelete/ButtonMultipleDelete";
import {Form} from "react-bootstrap";
import ButtonDelete from "../buttonDelete/ButtonDelete";
import UpdateUserModal from "../updateUserModal/UpdateUserModal";

const UsersTable = () => {
  const [fetchedUsers, setFetchedUsers] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  const [mount, setMount] = useState(false);

  const handleMount = () => {
    setMount(!mount);
  };

  useEffect(() => {
    getAllUsers();
  }, []); // <-- Corrected dependency array

  const getAllUsers = async () => {
    try {
      const res = await axios.get("/api/users/getAll");

      console.log(res.data);
      setFetchedUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheckboxChange = (itemId, fname) => {
    if (selectedItems.some((item) => item.id === itemId)) {
      // If the item with the same ID is already in the selectedItems array, remove it
      setSelectedItems(selectedItems.filter((item) => item.id !== itemId));
    } else {
      // Add the selected item's ID and name to the selectedItems array
      setSelectedItems([...selectedItems, {id: itemId, name: fname}]);
    }
  };

  console.log(selectedItems);

  // You can use selectedItems.length to check how many checkboxes are selected
  const isButtonVisible = selectedItems.length > 1;

  return (
    <>
      <section style={{height: 400, overflow: "auto"}} className='my-3'>
        <section className='hstack'>
          {isButtonVisible ? (
            <ButtonMultipleDelete
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              mountProps={handleMount}
            />
          ) : isButtonVisible <= 0 ? null : null}
        </section>

        <section style={{height: 400, overflow: "auto"}}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>✔️</th>
                <th>#</th>
                <th>ID</th>
                <th>Users name</th>
                <th>E-mail</th>
                <th>Role</th>
                <th>Requested Date</th>
                <th>Approve</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {fetchedUsers &&
                fetchedUsers.map((users, index) => (
                  <tr key={users && users._id}>
                    <td>
                      <Form.Check
                        onChange={() =>
                          handleCheckboxChange(users._id, users.fname)
                        }
                        checked={selectedItems.some(
                          (selectedItem) => selectedItem.id === users._id,
                        )}
                      />
                    </td>
                    <td>{index + 1}</td>

                    <td>{users._id}</td>
                    <td>
                      {users.fname} {users.lname}
                    </td>
                    <td>{users.email}</td>

                    <td>{users.role}</td>
                    <td>{new Date(users.createdAt).toLocaleString()}</td>
                    <td>{users.approve ? "Yes" : "No"}</td>
                    <td>
                      <ButtonDelete id={users._id} action={"users"} /> ,{" "}
                      <UpdateUserModal />
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </section>
      </section>
    </>
  );
};

export default UsersTable;
