import {useState} from "react";
import axios from "axios";

function Login() {
  const [data, setData] = useState({
    email: "",
    pwd: "",
  });
  const submitHandler = (e) => {
    e.preventDefault();
    axios.get("/");
  };
  return (
    <>
      <form onSubmit={submitHandler}>
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
        <button type='submit'>Login</button>
      </form>
    </>
  );
}

export default Login;
