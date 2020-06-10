import React from "react";

function Scroll(props) {
    return(
        <div style={{overflow:"scroll",height:"800px",borderTop: "3px solid black"}}>
            {props.children}
        </div>
    )
}

export default Scroll;
