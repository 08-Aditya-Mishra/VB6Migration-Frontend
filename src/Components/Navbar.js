import { Link } from "react-router-dom";

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
                                <a class="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Add New Account</a>
                            </li>

                            
                           
                               
                            
                        </ul>
                            <div class="d-flex">
                                <Link to="login" class="btn btn-outline-success nav-link p-2">login</Link>
                            </div>
                        {/* <form class="d-flex" role="search">
                            <button class="btn btn-outline-success" type="submit"><Link to="login" class="btn btn-outline-success nav-link">Login</Link></button>
                        </form> */}

                    </div>
                </div>
            </nav>
            
        </>
    )
}
export default Navbar;