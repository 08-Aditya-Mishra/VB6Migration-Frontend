import Navbar from "./Navbar"
import { Link } from "react-router-dom";
const Deposit=()=>{
    return(
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

                            <li class="nav-item">
                               <Link to="deposit" class="nav-link">Deposit</Link>
                            </li>
                            
                        </ul>
                       
                    </div>
                </div>
            </nav>   
                <form className="mt-5 container col-sm-4 p-5 " style={{marginTop:"100px",border:"1px solid black"}}>
                <h2 className="mb-3">Account Deposit</h2>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Account Number</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Amount</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <button type="submit" class="btn btn-primary ">Deposit</button>
                    <button type="submit" class="btn btn-primary m-4">Exit</button>
                </form>                                              
        </>
    )
}
export default Deposit