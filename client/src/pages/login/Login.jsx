import {useState} from "react";
import axios from "axios";
import {toast} from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    email: "",
    pwd: "",
  });

  const [errors, setErrors] = useState();
  console.log("errors:", errors);

  const submitHandler = async (e) => {
    e.preventDefault();

    const successMessage = "Logged-in Successfully";

    try {
      const res = await axios.post("/login", inputData);

      // Handle the successful response
      if (res) {
        navigate("/Inventory_System/dashboard");
        toast.success(successMessage);
      }
    } catch (err) {
      if (
        err.response &&
        err.response.status === 400 &&
        err.response.data.errors
      ) {
        const errorMessage = err.response.data.errors;

        // Create an array to collect error messages
        const errorMessages = [];

        // Iterate through the error messages and add them to the array
        Object.keys(errorMessage).forEach((key) => {
          const errorText = errorMessage[key];
          errorMessages.push(errorText);
        });

        // Set the errors state with the array of error messages
        setErrors(errorMessage);

        // Toast the error messages
        errorMessages.forEach((errorText) => {
          toast.error(errorText);
        });
      }
    }
  };
  return (
    <>
      <main className='container-fluid-lg'>
        <section className='container-lg'>
          <div className='d-flex align-items-center justify-content-center vh-100 '>
            <form className='form p-3 border rounded' onSubmit={submitHandler}>
              <header className='my-5'>
                <h2 className='text-center'>Login</h2>
                <p className='text-center'>Input your credentials below</p>
              </header>

              <div className='form-floating mb-3'>
                <input
                  type='email'
                  placeholder='email'
                  className={`form-control ${
                    errors && errors.email
                      ? "is-invalid"
                      : !errors
                      ? ""
                      : "is-valid"
                  }`}
                  id='inpEmail'
                  value={inputData.email}
                  onChange={(e) =>
                    setInputData({...inputData, email: e.target.value})
                  }
                />
                <label htmlFor='inpEmail'>E-mail</label>
              </div>

              <div className='form-floating mb-3'>
                <input
                  type='password'
                  placeholder='enter password'
                  className={`form-control ${
                    errors && errors.password
                      ? "is-invalid"
                      : !errors
                      ? ""
                      : "is-valid"
                  }`}
                  value={inputData.pwd}
                  onChange={(e) =>
                    setInputData({...inputData, pwd: e.target.value})
                  }
                />
                <label htmlFor=''>Password</label>
              </div>
              <div className='d-flex justify-content-between align-items-center'>
                <button className='btn btn-primary' type='submit'>
                  Enter
                </button>
                <small>
                  Dont have account ?
                  <Link to='/Inventory_System/register'>Register</Link>
                </small>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}

export default Login;
