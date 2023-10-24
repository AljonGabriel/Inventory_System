import {useState} from "react";
import axios from "axios";
import {toast} from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import FormContainer from "../../components/formContainer/FormContainer";
import {Form, Button, Row, Col} from "react-bootstrap";

function Login() {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    email: "",
    pwd: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("submit");
  };
  return (
    <>
      <FormContainer>
        <header>
          <h3>Log-in</h3>
        </header>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label>Email</Form.Label>
          </Form.Group>
          <Button type='submit' variant='primary'>
            Submit
          </Button>
        </Form>
      </FormContainer>
    </>
  );
}

export default Login;
