import {useState} from "react";
import axios from "axios";
import {toast} from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import FormContainer from "../../components/formContainer/FormContainer";
import {Form, Button, Row, Col, FloatingLabel, Stack} from "react-bootstrap";

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
          <h1 className='text-center'>Log-in</h1>
        </header>
        <Form onSubmit={submitHandler}>
          <FloatingLabel
            controlId='emailInp'
            label='Email address'
            className='my-3'
          >
            <Form.Control
              type='email'
              placeholder='name@example.com'
              value={inputData.name}
              onChange={(e) =>
                setInputData({...inputData, name: e.target.value})
              }
            />
          </FloatingLabel>
          <FloatingLabel controlId='pwdInp' label='Password'>
            <Form.Control
              type='password'
              placeholder='Password'
              className='my-3'
            />
          </FloatingLabel>

          <Stack direction='horizontal'>
            <small>
              Request an account? <Link to='/register'>Request</Link>
            </small>
            <Button
              type='submit'
              variant='primary'
              className='ms-auto d-md-block'
            >
              Submit
            </Button>
          </Stack>
        </Form>
      </FormContainer>
    </>
  );
}

export default Login;
