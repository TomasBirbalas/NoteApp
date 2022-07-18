import React, { useState } from 'react'
import { Link } from "react-router-dom"

function LoginForm( {Login, error} ) {
    const [details, setDetails] = useState({email: "", password: ""});

    const submitHandler = e => {
        e.preventDefault();
        
        Login(details);
        console.log("user-logedin");
    }

  return (
    <form className="form" onSubmit={submitHandler}>
        <h1>Please Login</h1>
        {(error) ? (<div className="error">{error}</div>) : ""}
        <div className="input">
            <input id="userName" className="input-wrap" type="text" name="email" placeholder=" " onChange={e => setDetails({...details, email: e.target.value})} value={details.email} required/>
            <label htmlFor="email" className="float-label">Email</label>
        </div>
        <div className="input">
            <input id="userPassword" className="input-wrap" type="password" name="password" placeholder=" " onChange={e => setDetails({...details, password: e.target.value})} value={details.password} required/>
            <label htmlFor="password" className="float-label">Password</label>
        </div>
        <span>Still don't have an account? <Link to="/register">Creat an account</Link></span>
        <input type="submit" value="Login" />
    </form>
  )
}

export default LoginForm