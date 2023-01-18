import { Link } from "react-router-dom";
import './style.css';

const Navbar = () => {
    return (
        <>
            <nav class="navbar navbar-expand-lg" style={{ backgroundColor: "#d3d3d3" }}>
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">My Bank</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link active" href="/" aria-current="page">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/createaccount">Add New Account</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/deposit">Deposit</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Update port</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}
export default Navbar;