import React from "react"
import myImage from '../Image/clock.jpg';

export default function Navbar() {
    return (
        <nav>
            <img src={myImage} className="nav-icon" width="40px" alt = "clock image"/>
            <h3 className="nav-logo_text">Reminder App</h3>
            
           
        </nav>
    )
}