import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../context/userContext";
import Navbar from "../../components/navbar/Navbar";
import LogoutButton from "../../components/logout/LogoutBtn";
/* import {useNavigate} from "react-router-dom"; */
import axios from "axios";
import {toast} from "react-hot-toast";

function Home() {
  const {user} = useContext(UserContext);
  const [usersData, setUsersData] = useState(null);

  useEffect(() => {
    fetchUsers();
  });

  const fetchUsers = async () => {
    const res = await axios.get("/user");

    setUsersData(res.data.user);
  };

  const deleteUser = async (_id) => {
    //delete
    const res = await axios.delete(`/user/${_id}`);

    res && toast.success("Deleted Successfully");
  };

  return (
    <>
      <div>
        <Navbar />
        <LogoutButton />
        <h1>Home</h1>
        {user ? (
          <div>
            <h2>Hi, {user.name}</h2>
            <h2>User List</h2>
            {usersData &&
              usersData.map((user) => {
                return (
                  <div key={user._id}>
                    <h3>{user._id}</h3>
                    <h3>{user.name}</h3>
                    <button onClick={() => deleteUser(user._id)}>Delete</button>
                  </div>
                );
              })}
          </div>
        ) : (
          <p>Please log in</p>
        )}
      </div>
    </>
  );
}

export default Home;
