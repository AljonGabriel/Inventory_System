import {Link} from "react-router-dom";

function Navbar() {
  return (
    <>
      <Link to='/Inventory_System/'>Home</Link>
      <Link to='/Inventory_System//dashboard'>Dashboard</Link>
      <Link to='/Inventory_System//admin'>Admin</Link>
    </>
  );
}

export default Navbar;
