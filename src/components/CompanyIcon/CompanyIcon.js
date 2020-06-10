import React from "react";
import Tilt from 'react-tilt';

import './CompanyIcon.css';

function CompanyIcon() {
    return(
        <Tilt className="Tilt" options={{
            max : 50,
            perspective: 1000,
            easing: "cubic-bezier(.03,.98,.52,.99)",
            speed: 50,
            scale: 1.1,
            reverse: true
        }} >
            <div className="CompanyIcon">
                <img src="https://image.flaticon.com/icons/svg/883/883039.svg" alt={`company icon`}/>
            </div>
        </Tilt>

    )
}

export default CompanyIcon;
