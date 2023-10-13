import {useContext, useEffect} from "react";
import {UserContext} from "../../context/userContext";
import Navbar from "../../components/navbar/Navbar";
import LogoutButton from "../../components/logout/LogoutBtn";
import {useNavigate} from "react-router-dom";

function Home() {
  const {user} = useContext(UserContext);

  return (
    <>
      <div>
        <Navbar />
        <LogoutButton />
        <h1>Home</h1>
        {!!user && (
          <h2>
            Hi {user.name}, {user.id}
          </h2>
        )}
      </div>
    </>
  );
}

export default Home;
