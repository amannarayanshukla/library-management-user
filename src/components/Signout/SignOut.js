import React from "react";
import './SignOut.css';



function SignOut(props) {
    return(
        <div className="sign-out">
            <p onClick={props.handleSignOut}>{`SignOut`}</p>
        </div>
    );
}

export default SignOut;
