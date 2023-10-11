import axios from "axios";
import {useState} from "react";
import {toast} from "react-hot-toast";
import {useNavigate} from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    pwd: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    const {name, email, pwd} = data;

    try {
      const {data} = await axios.post("/register", {
        name,
        email,
        pwd,
      });

      if (data.error) {
        toast.error(data.error);
        console.log(data);
      } else {
        setData({});
        toast.success("Login Successful. Welcome!");
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
          value={data.name}
          onChange={(e) => setData({...data, name: e.target.value})}
        />

        <label htmlFor=''>E-mail</label>
        <input
          type='email'
          placeholder='enter email'
          value={data.email}
          onChange={(e) => setData({...data, email: e.target.value})}
        />

        <label htmlFor=''>Password</label>
        <input
          type='password'
          placeholder='enter password'
          value={data.pwd}
          onChange={(e) => setData({...data, pwd: e.target.value})}
        />
        <button type='submit'>Create Account</button>
      </form>
    </>
  );
}

export default Register;
