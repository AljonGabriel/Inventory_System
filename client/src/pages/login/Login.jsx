import {useState} from "react";
import axios from "axios";
import {toast} from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import Auth from "../../auth/Auth";
import {Link} from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    pwd: "",
  });
  const submitHandler = async (e) => {
    e.preventDefault();

    const {email, pwd} = data;

    try {
      const {data} = await axios.post("/login", {
        email,
        pwd,
      });

      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={submitHandler}>
        <Auth />
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
      <Link to='/register'>Register</Link>
    </>
  );
}

export default Login;
