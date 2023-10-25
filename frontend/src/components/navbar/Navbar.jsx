import Container from "react-bootstrap/Container";
import {Nav, Navbar, NavDropdown, Badge} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {Link, useNavigate} from "react-router-dom";

import {useSelector, useDispatch} from "react-redux";
import {useLogoutMutation} from "../../slices/usersApiSlice";
import {logout} from "../../slices/authSlices";

import {toast} from "react-toastify";

function BasicExample() {
  const {userInfo} = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutApiCall, isLoading] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
      toast.success("Logout successfully");
    } catch (err) {
      toast.error(err?.data?.message) || err.error;
    }
  };
  return (
    <Navbar expand='lg' className='bg-body-tertiary'>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>Shappy.Inventory</Navbar.Brand>
        </LinkContainer>
        {userInfo && (
          <>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='me-auto'>
                <LinkContainer to='/home'>
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>

                <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
                  <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
                  <NavDropdown.Item href='#action/3.2'>
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href='#action/3.3'>
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href='#action/3.4'>
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <NavDropdown title={userInfo.fname} id='userName'>
                {userInfo.role === "admin" && (
                  <>
                    <LinkContainer to='/admin'>
                      <NavDropdown.Item>Admin</NavDropdown.Item>
                    </LinkContainer>
                  </>
                )}
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar>
  );
}

export default BasicExample;
