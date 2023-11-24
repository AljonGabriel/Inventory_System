import { Button, Modal, Form } from 'react-bootstrap';
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function AddItemModal({ mountProps }) {
  const { userInfo } = useSelector((state) => state.auth);

  const [inputData, setInputData] = useState({
    addedBy: userInfo.fname + ' ' + userInfo.lname,
    feItemName: '',
    feItemDesc: '',
    feCategory: '',
    feQuantity: '',
  });

  const [error, setErrors] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/items/', inputData);
      mountProps(true);
      toast.success('Added Successfully');
      handleClose();
    } catch (err) {
      const errors = err?.response?.data;
      for (const field in errors) {
        toast.error(errors[field]);
        setErrors(errors);
      }
      /*   toast.error(errors.iName) || err.error;
      console.log(err.response.data.iName); */
    }
  };
  return (
    <>
      <Button
        variant='primary'
        onClick={handleShow}>
        Add Item
      </Button>

      <Modal
        show={show}
        onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User ID: {userInfo._id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            id='form'
            onSubmit={(e) => handleSubmit(e)}>
            <Form.Group
              className='mb-3'
              controlId='formGroupUser'>
              <Form.Label>Added by</Form.Label>
              <Form.Control
                type='text'
                placeholder=''
                value={inputData.addedBy}
                disabled
              />
            </Form.Group>

            <Form.Group
              className='mb-3'
              controlId='formGroupItemName'>
              <Form.Label>Item name</Form.Label>
              <Form.Control
                type='text'
                placeholder='ex.T-Shirt'
                className={
                  error && error.iName ? 'is-invalid' : !error ? '' : 'is-valid'
                }
                value={inputData.feItemName}
                onChange={(e) =>
                  setInputData({ ...inputData, feItemName: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group
              className='mb-3'
              controlId='formGroupItemDesc'>
              <Form.Label>Item description</Form.Label>
              <Form.Control
                type='text'
                placeholder='ex.Large T-Shirt'
                className={
                  error && error.iName ? 'is-invalid' : !error ? '' : 'is-valid'
                }
                value={inputData.feItemDesc}
                onChange={(e) =>
                  setInputData({ ...inputData, feItemDesc: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group
              className='mb-3'
              controlId='formGroupCategory'>
              <Form.Label>Category</Form.Label>
              <Form.Select
                aria-label='Default select example'
                className={
                  error && error.category
                    ? 'is-invalid'
                    : !error
                    ? ''
                    : 'is-valid'
                }
                onChange={(e) =>
                  setInputData({ ...inputData, feCategory: e.target.value })
                }>
                <option>Open this select menu</option>
                <option value='Tools'>Tools</option>
                <option value='Clothes'>Clothes</option>
                <option value='Others'>Others</option>
              </Form.Select>
            </Form.Group>

            <Form.Group
              className='mb-3'
              controlId='formGroupStocks'>
              <Form.Label>Stocks</Form.Label>
              <Form.Control
                type='number'
                placeholder='ex.0-99'
                className={
                  error && error.stocks
                    ? 'is-invalid'
                    : !error
                    ? ''
                    : 'is-valid'
                }
                value={inputData.feQuantity}
                onChange={(e) =>
                  setInputData({ ...inputData, feQuantity: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={handleClose}>
            Close
          </Button>
          <Button
            type='submit'
            variant='primary'
            form='form'>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
