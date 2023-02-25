import React from "react"

export default function Footer() {
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth() +1;
    const currentYear = today.getFullYear();
    return (
        <footer className= "foot" >
            <small>© The project made by Pham Minh Triet  {currentDay}-{currentMonth}-{currentYear}.</small>
        </footer>
    )
}