import {useState} from "react";
import axios from "axios";
import {toast} from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import FormContainer from "../../components/formContainer/FormContainer";
import {Form, Button, FloatingLabel, Stack} from "react-bootstrap";

function Login() {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    rePassword: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("submit");
  };
  return (
    <>
      <FormContainer>
        <header>
          <h1 className='text-center'>Register</h1>
        </header>
        <Form onSubmit={submitHandler}>
          <FloatingLabel
            controlId='fnameInp'
            label='First name'
            className='my-3'
          >
            <Form.Control
              type='text'
              placeholder='John Doe'
              value={inputData.fname}
              onChange={(e) =>
                setInputData({...inputData, fname: e.target.value})
              }
            />
          </FloatingLabel>

          <FloatingLabel
            controlId='lnameInp'
            label='Last name'
            className='my-3'
          >
            <Form.Control
              type='text'
              placeholder='Last name'
              value={inputData.lname}
              onChange={(e) =>
                setInputData({...inputData, lname: e.target.value})
              }
            />
          </FloatingLabel>

          <FloatingLabel
            controlId='emailInp'
            label='Email address'
            className='my-3'
          >
            <Form.Control
              type='email'
              placeholder='name@example.com'
              value={inputData.email}
              onChange={(e) =>
                setInputData({...inputData, email: e.target.value})
              }
            />
          </FloatingLabel>
          <small>
            <ul
              role='alert'
              className='text-primary-emphasis bg-primary-subtle border border-primary-subtle 
                 rounded-3'
            >
              <li>Minimum length: 6 characters</li>
              <li>Maximum length: 12 characters</li>
              <li>
                Must include a combination of:
                <ul>
                  <li>Letters (both uppercase and lowercase)</li>
                  <li>Numbers (0-9)</li>
                  <li>At least one special character (e.g., !, @, #, $, %)</li>
                </ul>
              </li>
            </ul>
          </small>
          <FloatingLabel controlId='pwdInp' label='Password'>
            <Form.Control
              type='password'
              placeholder='Password'
              className='my-3'
              value={inputData.password}
              onChange={(e) =>
                setInputData({...inputData, password: e.target.value})
              }
            />
          </FloatingLabel>

          <FloatingLabel controlId='rePwdInp' label='Confirm Password'>
            <Form.Control
              type='password'
              placeholder='Re-Password'
              className='my-3'
              value={inputData.rePassword}
              onChange={(e) =>
                setInputData({...inputData, rePassword: e.target.value})
              }
            />
          </FloatingLabel>

          <Stack direction='horizontal'>
            <small>
              Already have an account? <Link to='/'>Log-in</Link>
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
