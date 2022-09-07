import React from "react";
import { Link } from "react-router-dom";
import './Styles.css';

function Header(props) {
    function removeLoggedIn(){
        fetch("/notloggedin")
        .catch(err => console.log(err));
    }
    if(props.isLoggedIn){
        return (
            <div className="header">
                <h1>MyPet</h1>
                <Link to='/home' style={{textDecoration: 'none'}}>Home</Link>
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                <Link to='/addpet' style={{textDecoration: 'none'}}>Add Pet</Link>
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                <Link to='/addappt' style={{textDecoration: 'none'}}>Add Appointment</Link>
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                <Link to='/viewpets' style={{textDecoration: 'none'}}>View Pets</Link>
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                <Link to='/viewappts' style={{textDecoration: 'none'}}>View Appointments</Link>
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                <Link to='' onClick={removeLoggedIn} style={{textDecoration: 'none'}}>Logout</Link>
            </div>
        );
    
    }
    else {
        return (
            <div className="header">
                <h1>MyPet</h1>
                <Link to='/home' style={{textDecoration: 'none'}}>Home</Link>
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                <Link to='/addpet' style={{textDecoration: 'none'}}>Add Pet</Link>
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                <Link to='/addappt' style={{textDecoration: 'none'}}>Add Appointment</Link>
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                <Link to='/viewpets' style={{textDecoration: 'none'}}>View Pets</Link>
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                <Link to='/viewappts' style={{textDecoration: 'none'}}>View Appointments</Link>
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                <Link to='' style={{textDecoration: 'none'}}>Login</Link>
            </div>
        );
    
    }
    
}

export default Header;