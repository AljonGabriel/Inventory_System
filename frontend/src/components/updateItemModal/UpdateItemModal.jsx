import {Button, Modal, Form} from "react-bootstrap";
import {useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";

export default function UpdateModal({items, mountProps}) {
  const {_id, itemName, itemDescription, quantity} = items;

  const [inputData, setInputData] = useState({
    iName: "",
    iDescription: "",
    stocks: "",
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const handleSubmit = async (itemID, e) => {
    e.preventDefault();

    const shouldClose = window.confirm("Proceed to update details?");

    if (shouldClose) {
      try {
        await axios.put(`api/items/data/${itemID}`, inputData);
        mountProps();
        toast.success("Updated successfully");
      } catch (err) {
        toast.error(err?.message?.error);
      }
    }
  };

  return (
    <>
      <Button variant='outline-primary me-2' onClick={handleShow}>
        Update
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Update this ID: <small>{_id}</small>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id='itemsUpdateForm' onSubmit={(e) => handleSubmit(_id, e)}>
            <Form.Group className='mb-3' controlId='formGroupEmail'>
              <Form.Label>Item name</Form.Label>
              <Form.Control
                type='text'
                placeholder={itemName}
                value={inputData.iName}
                onChange={(e) =>
                  setInputData({...inputData, iName: e.target.value})
                }
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formGroupEmail'>
              <Form.Label>Item description</Form.Label>
              <Form.Control
                type='text'
                placeholder={itemDescription}
                value={inputData.iDescription}
                onChange={(e) =>
                  setInputData({...inputData, iDescription: e.target.value})
                }
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formGroupEmail'>
              <Form.Label>Stocks</Form.Label>
              <Form.Control
                type='text'
                placeholder={quantity}
                value={inputData.stocks}
                onChange={(e) =>
                  setInputData({...inputData, stocks: e.target.value})
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button
            type='submit'
            variant='primary'
            form='itemsUpdateForm'
            onClick={handleClose}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
