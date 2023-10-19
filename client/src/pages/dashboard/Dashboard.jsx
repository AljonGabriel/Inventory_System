import {useEffect, useState} from "react";

/* import {useNavigate} from "react-router-dom"; */
import axios from "axios";
import {toast} from "react-hot-toast";

function Dashboard({userProfile}) {
  const [usersData, setUsersData] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get("/user");
    setUsersData(res.data.user);
  };

  const deleteUser = async (_id) => {
    const res = await axios.delete(`/user/${_id}`);
    res && toast.success("Deleted Successfully");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {userProfile ? (
        <div>
          <h2>Hi, {userProfile.name}</h2>{" "}
          {/* Display user's name from userData */}
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
  );
}

export default Dashboard;