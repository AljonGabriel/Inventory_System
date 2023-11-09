import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import FormContainer from "../../components/formContainer/FormContainer";
import {
  Form,
  Button,
  FloatingLabel,
  Stack,
  Badge,
  Spinner,
} from "react-bootstrap";

import {useRegisterMutation} from "../../slices/usersApiSlice";
import {toast} from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const [inputData, setInputData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    rePassword: "",
  });

  const [error, setErrors] = useState(null);

  const [register, {isLoading}] = useRegisterMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await register(inputData).unwrap();
      navigate("/Inventory_System/");
      toast.success("Wait for your supervisor to approve your account");
    } catch (err) {
      const errors = err.data;
      if (errors) {
        for (const field in errors) {
          toast.error(errors[field]);
          setErrors(errors);
        }
      }
    }
  };
  console.log(error);

  return (
    <>
      <FormContainer>
        <header>
          <h1 className='text-center'>Register</h1>
        </header>

        <Form onSubmit={submitHandler}>
          <Badge
            pill
            bg={error && error.fname ? `danger` : `white`}
            text={error && error.fname ? `white` : `danger`}
            className='mb-1'
          >
            * {error && error.fname ? `Required` : ``}
          </Badge>
          <FloatingLabel
            controlId='fnameInp'
            label='First name'
            className='mb-2'
          >
            <Form.Control
              type='text'
              placeholder='John Doe'
              className={`mb-2 ${
                error && error.fname ? `is-invalid` : !error ? "" : "is-valid"
              }`}
              value={inputData.fname}
              onChange={(e) =>
                setInputData({...inputData, fname: e.target.value})
              }
            />
          </FloatingLabel>
          <Badge
            pill
            bg={error && error.lname ? `danger` : `white`}
            text={error && error.lname ? `white` : `danger`}
            className='mb-1'
          >
            * {error && error.lname ? `Required` : ``}
          </Badge>
          <FloatingLabel
            controlId='lnameInp'
            label='Last name'
            className='mb-2'
          >
            <Form.Control
              type='text'
              placeholder='Last name'
              className={`mb-2 ${
                error && error.lname ? `is-invalid` : !error ? "" : "is-valid"
              }`}
              value={inputData.lname}
              onChange={(e) =>
                setInputData({...inputData, lname: e.target.value})
              }
            />
          </FloatingLabel>
          <Badge
            pill
            bg={error && error.email ? `danger` : `white`}
            text={error && error.email ? `white` : `danger`}
            className='mb-1'
          >
            * {error && error.email ? `Required` : ``}
          </Badge>
          <FloatingLabel
            controlId='emailInp'
            label='Email address'
            className='mb-2'
          >
            <Form.Control
              type='email'
              placeholder='name@example.com'
              className={`mb-2 ${
                error && error.email ? `is-invalid` : !error ? "" : "is-valid"
              }`}
              value={inputData.email}
              onChange={(e) =>
                setInputData({...inputData, email: e.target.value})
              }
            />
          </FloatingLabel>
          <Badge
            pill
            bg={error && error.password ? `danger` : `white`}
            text={error && error.password ? `white` : `danger`}
            className='mb-1'
          >
            * {error && error.password ? `Required` : ``}
          </Badge>
          <small>
            <ul
              role='alert'
              className={`${
                error && error.password
                  ? `text-danger-emphasis bg-danger-subtle border border-danger-subtle 
                  rounded-3`
                  : `text-primary-emphasis bg-primary-subtle border border-primary-subtle 
                  rounded-3`
              }`}
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
              className={`mb-2 ${
                error && error.password
                  ? `is-invalid`
                  : !error
                  ? ""
                  : "is-valid"
              }`}
              value={inputData.password}
              onChange={(e) =>
                setInputData({...inputData, password: e.target.value})
              }
            />
          </FloatingLabel>
          <Badge
            pill
            bg={error && error.rePassword ? `danger` : `white`}
            text={error && error.rePassword ? `white` : `danger`}
            className='mb-1'
          >
            * {error && error.rePassword ? `Required` : ``}
          </Badge>
          <FloatingLabel controlId='rePwdInp' label='Confirm Password'>
            <Form.Control
              type='password'
              placeholder='Re-Password'
              className={`mb-2 ${
                error && error.rePassword
                  ? `is-invalid`
                  : !error
                  ? ""
                  : "is-valid"
              }`}
              value={inputData.rePassword}
              onChange={(e) =>
                setInputData({...inputData, rePassword: e.target.value})
              }
            />
          </FloatingLabel>

          <Stack direction='horizontal'>
            <small>
              Already have an account?{" "}
              <Link to='/Inventory_System/'>Log-in</Link>
            </small>
            {isLoading ? (
              <Button variant='primary' className='ms-auto d-md-block' disabled>
                <Spinner
                  as='span'
                  animation='grow'
                  size='sm'
                  role='status'
                  aria-hidden='true'
                />
                Loading...
              </Button>
            ) : (
              <>
                <Button
                  type='submit'
                  variant='primary'
                  className='ms-auto d-md-block'
                >
                  Submit
                </Button>
              </>
            )}
          </Stack>
        </Form>
      </FormContainer>
    </>
  );
}

export default Login;
