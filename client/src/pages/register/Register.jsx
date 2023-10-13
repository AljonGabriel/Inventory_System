import axios from "axios";
import {useState} from "react";
import {toast} from "react-hot-toast";
import {useNavigate} from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    pwd: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    /* const {name, email, pwd} = data; */

    try {
      const {data} = await axios.post("/register", inputData);

      if (data.error) {
        toast.error(data.error);
        console.log(data);
      } else {
        setInputData({});
        toast.success("Account Created Successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <label htmlFor=''>Name</label>
        <input
          type='text'
          placeholder='enter name'
          value={inputData.name}
          onChange={(e) => setInputData({...inputData, name: e.target.value})}
        />

        <label htmlFor=''>E-mail</label>
        <input
          type='email'
          placeholder='enter email'
          value={inputData.email}
          onChange={(e) => setInputData({...inputData, email: e.target.value})}
        />

        <label htmlFor=''>Password</label>
        <input
          type='password'
          placeholder='enter password'
          value={inputData.pwd}
          onChange={(e) => setInputData({...inputData, pwd: e.target.value})}
        />
        <button type='submit'>Create Account</button>
      </form>
    </>
  );
}

export default Register;
