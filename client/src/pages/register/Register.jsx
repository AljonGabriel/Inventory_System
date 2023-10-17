import axios from "axios";
import {useState} from "react";
import {toast} from "react-hot-toast";
import {Link, useNavigate} from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    pwd: "",
    repwd: "",
  });

  const [errors, setErrors] = useState();
  console.log("errors:", errors);

  const submitHandler = async (e) => {
    e.preventDefault();

    const successMessage = "Successfully created an account, log-in anytime";

    try {
      const res = await axios.post("/register", inputData);

      // Handle the successful response
      if (res) {
        navigate("/Inventory_System/");
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
                <h2 className='text-center'>Register</h2>
                <div className='alert alert-secondary' role='alert'>
                  <small>
                    After creating an account, it is necessary for the admin to
                    grant approval before you can log in.
                  </small>
                </div>
              </header>
              <div className='form-floating mb-3'>
                <input
                  type='text'
                  placeholder='John'
                  className={`form-control ${
                    errors && errors.name
                      ? "is-invalid"
                      : !errors
                      ? ""
                      : "is-valid"
                  }`}
                  id='inpName'
                  value={inputData.name}
                  onChange={(e) =>
                    setInputData({...inputData, name: e.target.value})
                  }
                />
                <label htmlFor='inpName'>Name</label>
              </div>
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
              <small>
                <ul
                  role='alert'
                  className={`${
                    errors && errors.password
                      ? "text-danger-emphasis bg-danger-subtle border border-danger-subtle "
                      : "text-primary-emphasis bg-primary-subtle border border-primary-subtle "
                  } rounded-3`}
                >
                  <li>Minimum length: 6 characters</li>
                  <li>Maximum length: 12 characters</li>
                  <li>
                    Must include a combination of:
                    <ul>
                      <li>Letters (both uppercase and lowercase)</li>
                      <li>Numbers (0-9)</li>
                      <li>
                        At least one special character (e.g., !, @, #, $, %)
                      </li>
                    </ul>
                  </li>
                </ul>
              </small>
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
              <div className='form-floating mb-3'>
                <input
                  type='password'
                  placeholder='Re-type password'
                  className={`form-control ${
                    errors && errors.repassword
                      ? "is-invalid"
                      : !errors
                      ? ""
                      : "is-valid"
                  }`}
                  value={inputData.repwd}
                  onChange={(e) =>
                    setInputData({...inputData, repwd: e.target.value})
                  }
                />
                <label htmlFor=''>Confirm Password</label>
              </div>
              <div className='d-flex justify-content-between align-items-center'>
                <button className='btn btn-primary' type='submit'>
                  Create Account
                </button>
                <small>
                  Already have an acount?
                  <Link to='/Inventory_System/'>Login</Link>
                </small>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}

export default Register;
