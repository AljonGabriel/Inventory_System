import {Link} from "react-router-dom";

function Navbar() {
  return (
    <>
      <Link to='/'>Home</Link>
      <Link to='/register'>Register</Link>
      <Link to='/login'>Login</Link>
    </>
  );
}

export default Navbar;
