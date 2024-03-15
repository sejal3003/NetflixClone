import React from 'react'
import background from "../assets/login.jpg"
export default function BackgroundImage() {
    return (
        <div className="background">
            <img className="backgroundImg"src={background} alt="background" />
        </div>
    );
}

