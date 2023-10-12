import React from "react";
import SignIn from "./SignIn.jsx";
//import "./Metamask.jsx";

function SignUp() {
  return (
    <div className="contact">
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-5">
            <SignIn />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

