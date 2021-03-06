import React,{useState} from "react";
import Layout from "../core/Layout";
import { Redirect } from "react-router-dom";
import { signin,authenticate,isAuthenticated } from "../auth";

const Signin = () => {
    const [values, setValues] = useState({
       
        email: '',
        password: '',
        error: '',
        loading: false,
        redirect:false,
    });

    const {  email, password,loading,error,redirect } = values;
    const { user } = isAuthenticated();
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    }
  
    
    
    
    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false ,loading:true});
        signin({ email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false })
                }
                else {
                    authenticate(
                        data,
                        () => {
                            setValues({
                                ...values,
                                redirect: true
                            });
                        }
                )    
                }
            });
    };

    const signUpForm = () => (
      <div className="container mt-5 pt-5">
        <form>
          <div className="form-group">
            <label className="text font-weight-bold">Email</label>
            <input
              onChange={handleChange("email")}
              type="email"
              className="form-control"
              value={email}
            />
          </div>
          <div className="form-group">
            <label className="text font-weight-bold">Password</label>
            <input
              onChange={handleChange("password")}
              type="password"
              className="form-control"
              value={password}
            />
                </div>
                <div className="text-center">

          <button onClick={clickSubmit} className="mt-3 btn btn-outline-dark ">
            {" "}
            Sign In
          </button>
                </div>
        </form>
      </div>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );
    const showLoading = () =>
      loading && (
        <div class="d-flex justify-content-center">
          <div class="spinner-border text-success" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      );

    const redirectUser = () => {
        if (redirect) {
            if (user && user.role === 1) {
                return <Redirect to={'/admin/dashboard'} />
            }
            else
            {
                return <Redirect to={'user/dashboard'} />
                
                }
            }
            if (isAuthenticated()){
                return <Redirect to={'/'} />;
            };
    };

    return (
        <Layout title="Sign In Page" description="Sign In to Online Shopping Website" className="container col-md-5 text-align-centre">
            {redirectUser()}
            {showLoading()}
            {showError()}
            {signUpForm()}
          
            
        </Layout>
    );
};


export default Signin;
