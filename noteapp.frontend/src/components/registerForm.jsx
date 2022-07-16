import React, { useState } from 'react'


function RegisterForm({Register, error}) {
    const [details, setDetails] = useState({email: "", password: "", confirmPassword: ""});

    const submitHandler = e => {
        e.preventDefault();

        Register(details);
    }
  return (
    <form className="form" onSubmit={submitHandler}>
        <h1>Create Account</h1>
        {/* ERROR */}
        <div className="input">
            <input id="userName" className="input-wrap" type="text" name="email" placeholder=" " onChange={e => setDetails({...details, email: e.target.value})} value={details.email} required/>
            <label htmlFor="email" className="float-label">Email</label>
        </div>
        <div className="input">
            <input id="userPassword" className="input-wrap" type="password" name="password" placeholder=" " onChange={e => setDetails({...details, password: e.target.value})} value={details.password} required/>
            <label htmlFor="password" className="float-label">Password</label>
        </div>
        <div className="input">
            <input id="confirmUserPassword" className="input-wrap" type="password" name="password" placeholder=" " onChange={e => setDetails({...details, confirmPassword: e.target.value})} value={details.confirmPassword} required/>
            <label htmlFor="password" className="float-label">Confirm Password</label>
        </div>
        <input type="submit" value="Register" />
    </form>
  )
}

export default RegisterForm