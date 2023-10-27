import {Table, Row, Col, Button} from "react-bootstrap";
import axios from "axios";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function ItemsTable() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("api/items/data")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        // Handle any errors here
        console.error(error);
      });
  }, [items]);

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
              {items.map((item, index) => {
                return (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.itemName}</td>
                    <td>{item.itemDescription}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <Link
                        to={`/update/${item._id}`}
                        className='btn btn-outline-success'
                      >
                        Update
                      </Link>

                      <Button variant='outline-danger'>Delete</Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
}
