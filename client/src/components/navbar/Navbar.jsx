import {Link} from "react-router-dom";

function Navbar() {
  return (
    <>
      <Link to='/'>Home</Link>
      <Link to='/dashboard'>Dashboard</Link>
      <Link to='/admin'>Admin</Link>
    </>
  );
}

export default Navbar;
