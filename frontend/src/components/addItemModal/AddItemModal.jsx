import {Button, Modal, Form} from "react-bootstrap";
import {useState, useSe} from "react";
import {toast} from "react-toastify";
import axios from "axios";
import {useSelector} from "react-redux";

export default function AddItemModal({setUpdateTable}) {
  const {userInfo} = useSelector((state) => state.auth);

  const [inputData, setInputData] = useState({
    addedBy: userInfo.fname + " " + userInfo.lname,
    iName: "",
    iDescription: "",
    category: "",
    stocks: "",
  });

  console.log(inputData);

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
      <Button variant='primary m-1' onClick={handleShow}>
        Add Item
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User ID: {userInfo._id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id='form' onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className='mb-3' controlId='formGroupEmail'>
              <Form.Label>Added by</Form.Label>
              <Form.Control
                type='text'
                placeholder=''
                value={inputData.addedBy}
                disabled
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formGroupEmail'>
              <Form.Label>Item name</Form.Label>
              <Form.Control
                type='text'
                placeholder='ex.T-Shirt'
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
                placeholder='ex.Large T-Shirt'
                value={inputData.iDescription}
                onChange={(e) =>
                  setInputData({...inputData, iDescription: e.target.value})
                }
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formGroupEmail'>
              <Form.Label>Category</Form.Label>
              <Form.Select
                aria-label='Default select example'
                onChange={(e) =>
                  setInputData({...inputData, category: e.target.value})
                }
              >
                <option>Open this select menu</option>
                <option value='Tools'>Tools</option>
                <option value='Clothes'>Clothes</option>
                <option value='Others'>Others</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className='mb-3' controlId='formGroupEmail'>
              <Form.Label>Stocks</Form.Label>
              <Form.Control
                type='text'
                placeholder='ex.0-99'
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
