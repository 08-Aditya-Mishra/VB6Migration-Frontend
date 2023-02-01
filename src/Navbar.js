import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./user.context";
import { useNavigate } from "react-router-dom";
import axios from "axios";



function Navbar() {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const navigate = useNavigate();
    const handleLogout = async (e) => {
        e.preventDefault();
        await axios({

            method: "delete",

            url: "https://localhost:7286/api/Admin/logout",

            headers: {
                Authorization: `bearer ${localStorage.getItem("accessToken")}`,
                "Content-Type": "application/json",
            },

        }).then(() => {

            localStorage.removeItem("accessToken");
            console.log(localStorage)
            setCurrentUser(null);
        });
        navigate("/Login");
    };


    return (
        <nav class="navbar navbar-dark bg-dark navbar-expand-lg">
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
    <li class="nav-item" >
    <a class="nav-link active" style={{color: 'white'}} href="/" aria-current="page">Home</a>
    </li>
    <li class="nav-item">
    <a class="nav-link active" style={{color: 'white'}} href="/createaccount">Add New Account</a>
    </li>
    <li class="nav-item">
    <a class="nav-link active" style={{color: 'white'}} href="/deposit">Deposit</a>
    </li>
                            {/* <li class="nav-item">
                                <a class="nav-link disabled" style={{color: 'white'}} href="#">Update port</a>
                            </li> */}
    </ul>
    <span class="navbar-text">
    <button onClick={handleLogout} class="btn btn-outline-light" type="submit">LOG OUT</button>
    </span>
  </div>
</nav>
    )
}
export default Navbar;
