import {Button, Modal, Form} from "react-bootstrap";
import {useState} from "react";
import axios from "axios";

const UpdateUserModal = ({user}) => {
  const {_id, fname, lname, email, role, approve} = user;
  const [inputData, setInputData] = useState({
    feFname: "",
    feLname: "",
    feEmail: "",
    feRole: "",
    feApprove: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/users/getIDandUpdate/${_id}`, inputData);
    } catch (err) {
      console.log(err);
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant='primary' onClick={handleShow}>
        Update
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title> User ID: {_id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id='updateUserForm' onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className='mb-3' controlId='formGroupfname'>
              <Form.Label>First name</Form.Label>
              <Form.Control
                type='text'
                value={inputData.feFname}
                placeholder={fname}
                onChange={(e) =>
                  setInputData({...inputData, feFname: e.target.value})
                }
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formGrouplname'>
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type='text'
                value={inputData.feLname}
                placeholder={lname}
                onChange={(e) =>
                  setInputData({...inputData, feLname: e.target.value})
                }
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formGroupEmail'>
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type='email'
                value={inputData.feEmail}
                placeholder={email}
                onChange={(e) =>
                  setInputData({...inputData, feEmail: e.target.value})
                }
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formGroupRole'>
              <Form.Label>Role</Form.Label>
              <Form.Select
                aria-label='Default select example'
                value={inputData.feRole}
                onChange={(e) =>
                  setInputData({...inputData, feRole: e.target.value})
                }
              >
                <option disabled value=''>
                  {role === "admin"
                    ? "Admin"
                    : role === "view"
                    ? "View"
                    : role === "inventory" && "Inventory"}
                </option>
                <option value='view'>View</option>
                <option value='inventory'>Inventory</option>
                <option value='admin'>Admin</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className='mb-3' controlId='formGroupBoolean'>
              <Form.Label>Approve</Form.Label>
              <Form.Select
                aria-label='Default select example'
                value={String(inputData.feApprove)}
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    feApprove: e.target.value === "true" ? "true" : "false",
                  })
                }
              >
                <option value='' disabled>
                  {approve ? "Yes" : "No"}
                </option>
                <option value='true'>Yes</option>
                <option value='false'>No</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button
            type='submit'
            form='updateUserForm'
            variant='primary'
            onClick={handleClose}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateUserModal;
