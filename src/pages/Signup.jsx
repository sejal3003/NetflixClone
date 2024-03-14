import React, { useState } from "react";
// import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { useNavigate } from 'react-router-dom';


export default function Signup() {
  const navigate=useNavigate();
  const [showPassword, setShowPassword] = useState(false)
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",

  });
  const handleSignIn = async () => {
    console.log(formValues);
    navigate('/Subscription');
 }

  
  return (
    <div showPassword={showPassword } className="signupPageContainer">
      <BackgroundImage />
      <div className="content">
        <Header login />
        <div className="signupPageBody flex column a-center j-center">
          <div className="signupPageBodytext flex column">
            <h1>Unlimited movies,TV shows and more</h1>
            <h4>Watch anywhere.Cancel anytime</h4>
            <h6>
              Ready to watch? Enter your email to create or restart your
              membership
            </h6>
          </div>
          <div className="form">
            <input type="email" placeholder="Email Address" name="email" value={formValues.email} onChange={(e)=>setFormValues({...formValues,[e.target.name]:e.target.value})} />{
              showPassword && (<input type="password" placeholder="Password" name="password" value={formValues.password} onChange={(e)=>setFormValues({...formValues,[e.target.name]:e.target.value})} />
              )}
              { !showPassword &&( <button onClick={()=>setShowPassword(true)} className="signupPageGetstartButton">Get Started</button>)}

          </div>
          <button onClick={handleSignIn}className="signupPageButton">Sign Up</button>
        </div>
      </div>
    </div>
  );
}

