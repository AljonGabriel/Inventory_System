import {Button, Modal, Form} from "react-bootstrap";
import {useState} from "react";
import {toast} from "react-toastify";
import axios from "axios";

export default function AddItemModal({setUpdateTable}) {
  const [inputData, setInputData] = useState({
    iName: "",
    iDescription: "",
    stocks: "",
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/items/", inputData);
      setUpdateTable(true);
      toast.success("Added Successfully");
    } catch (err) {
      toast.error(err?.message?.error);
    }
  };
  return (
    <>
      <Button variant='primary my-2' onClick={handleShow}>
        Add Item
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id='form' onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className='mb-3' controlId='formGroupEmail'>
              <Form.Label>Item name</Form.Label>
              <Form.Control
                type='text'
                placeholder=''
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
                placeholder=''
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
                placeholder=''
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
            form='form'
            onClick={handleClose}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
