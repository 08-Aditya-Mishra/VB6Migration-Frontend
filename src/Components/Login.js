import { Link } from "react-router-dom";

const Login = () => {
    return (
        <>
                <form className="mt-6 container col-sm-4 p-5" style={{marginTop:"100px",border:"1px solid black"}}>
                <h2>Login Here</h2>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Username</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <Link to="/navbar">
                    <button type="submit"  class="btn btn-dark">Login</button>
                    </Link>
                </form>
           
        </>
    )
}
export default Login;