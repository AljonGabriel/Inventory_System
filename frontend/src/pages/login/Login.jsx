import {useState, useEffect} from "react";

import {Link, useNavigate} from "react-router-dom";
import FormContainer from "../../components/formContainer/FormContainer";
import {
  Form,
  Button,
  FloatingLabel,
  Stack,
  Spinner,
  Container,
  Image,
} from "react-bootstrap";

import {useDispatch, useSelector} from "react-redux";
import {useLoginMutation} from "../../slices/usersApiSlice";
import {setCredentials} from "../../slices/authSlices";

import {toast} from "react-toastify";

function Login() {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, {isLoading}] = useLoginMutation();

  const {userInfo} = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [navigate, userInfo]);

  console.log({inputData});

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login(inputData).unwrap();

      dispatch(setCredentials({...res}));
      navigate("/dashboard");
      toast.success("Logged-in Success");
    } catch (err) {
      toast.error(err?.data?.message) || err.error;
    }
  };
  return (
    <>
      <main>
        <Container>
          <FormContainer>
            <header className='text-center'>
              <Image
                src='https://cdn-icons-png.flaticon.com/512/1539/1539833.png'
                rounded
                width={200}
                className='mx-auto'
              />
              <h1>Log-in</h1>
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
                  value={inputData.email}
                  onChange={(e) =>
                    setInputData({...inputData, email: e.target.value})
                  }
                />
              </FloatingLabel>
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

              <Stack direction='horizontal'>
                <small>
                  Request an account? <Link to='/register'>Request</Link>
                </small>
                {isLoading ? (
                  <Button
                    variant='primary'
                    className='ms-auto d-md-block'
                    disabled
                  >
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
        </Container>
      </main>
    </>
  );
}

export default Login;
