import { Link } from "react-router-dom";
import './Navbar.css';
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

            url: "http://localhost:5178/api/Admin/logout",

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
        <div className="navbar-bg">
            <nav class="navbar navbar-expand-lg" style={{ backgroundColor: "#00003f" }}>
                <div class="container-fluid">

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item" >
                                <a class="nav-link active" href="/" aria-current="page">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active" href="/createaccount">Add New Account</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active" href="/deposit">Deposit</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link disabled" href="#">Update port</a>
                            </li>
                        </ul>
                        <span class="navbar-text">
                            <button onClick={handleLogout} class="btn btn-outline-light" type="submit">Log Out</button>
                        </span>
                    </div>
                </div>
            </nav>
        </div>
    )
}
export default Navbar;