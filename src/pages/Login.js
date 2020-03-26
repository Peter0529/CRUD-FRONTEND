import React, { useState } from "react";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if((username === "admin") && (password === "crud123")){
        sessionStorage.setItem('isAuthenticated',true);
        props.history.push('/dashboard');
    }
  }
  return (
      <div>
        <main className="main d-flex justify-content-center w-100">
            <div className="container d-flex flex-column">
                <div className="row h-100">
                    <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
                        <div className="d-table-cell align-middle">

                            <div className="text-center mt-4">
                                <h1 className="h2">Welcome back, Admin</h1>
                                <p className="lead">
                                    Sign in to your account to continue
                                </p>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <div className="m-sm-4">
                                        <div className="text-center">
                                            {/* <img src="img/avatar.png" alt="Chris Wood" className="img-fluid rounded-circle" width="132" height="132"/> */}
                                            <i className="align-middle mr-2 fas fa-fw fa-user-shield fa-10x" ></i>
                                        </div>
                                        <form>
                                            <div className="form-group">
                                                <label>UserName</label>
                                                <input className="form-control form-control-lg" type="username" name="username" value={username} onChange = {e=>setUsername(e.target.value)} placeholder="Enter your username"/>
                                            </div>
                                            <div className="form-group">
                                                <label>Password</label>
                                                <input className="form-control form-control-lg" type="password" name="password" value={password} onChange = {e=>setPassword(e.target.value)}  placeholder="Enter your password"/>
                                                {/* <small>
                                                    <a href="pages-reset-password.html">Forgot password?</a>
                                                </small> */}
                                            </div>
                                            <div>
                                                <div className="custom-control custom-checkbox align-items-center">
                                                    {/* <input type="checkbox" className="custom-control-input" value="remember-me" name="remember-me" /> */}
                                                    {/* <label className="custom-control-label text-small">Remember me next time</label> */}
                                                </div>
                                            </div>
                                            <div className="text-center mt-3">
                                                <button type="submit" className="btn btn-lg btn-primary" disabled={!validateForm()} onClick={e => handleSubmit(e)}>Sign in</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
  );
}