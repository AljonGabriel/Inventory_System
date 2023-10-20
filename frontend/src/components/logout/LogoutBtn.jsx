import axios from "axios";

function LogoutButton() {
  const handleLogout = async () => {
    try {
      // Send a request to the server to log the user out
      await axios.get("/logout"); // This should be an endpoint on your server
      /* 
      navigate("/Inventory_System/"); */
      window.location.href = "/Inventory_System/";
    } catch (error) {
      // Handle any errors that occur during the logout process
      console.error(error);
    }
  };

  // ...

  return (
    <div>
      <div>
        <button onClick={handleLogout}>Logout</button>{" "}
      </div>
    </div>
  );
}

export default LogoutButton;
