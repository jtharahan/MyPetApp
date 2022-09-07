import React, {useState} from "react";
import { Link } from "react-router-dom";
import './Styles.css';

function RegisterPage() {
    const [fnameError, setfnameError] = useState(false);
    const [lnameError, setlnameError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [registeredMsg, setRegisteredMsg] = useState(false);
    const [sameUsernameError, setSameUsernameError] = useState(false);

     function onRegister () {
        if(document.getElementById("fname").value === ""){
            setfnameError(true);
        }
        if(document.getElementById("lname").value === ""){
            setlnameError(true);
        }
        if(document.getElementById("email").value === ""){
            setEmailError(true);
        }
        if(document.getElementById("username").value === "" || document.getElementById("username").value.includes(" ")){
            setUsernameError(true);
        }
        if(document.getElementById("password").value  ===  "" || document.getElementById("password").value.includes(" ")) {
            setPasswordError(true);
        }
        if(document.getElementById("fname").value !== "" && document.getElementById("lname").value !== "" && 
        document.getElementById("email").value !== "" && document.getElementById("username").value !== "" && document.getElementById("password").value !== "" &&
        !document.getElementById("username").value.includes(" ") && !document.getElementById("password").value.includes(" ")){

            fetch("/register", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: document.getElementById("fname").value.trim(),
                    lastName: document.getElementById("lname").value.trim(),
                    email: document.getElementById("email").value.trim(),
                    username: document.getElementById("username").value.trim(),
                    password: document.getElementById("password").value.trim()
                })
            }).then((res) => res.json())
            .then((data) => {
                if(data.userExists){
                     setSameUsernameError(true);
                }
                else{
                    setRegisteredMsg(true);
                }})
            .catch(err => console.log(err));
        }
    
    }
    function fnameChanged() {
        setfnameError(false);
        setRegisteredMsg(false);
        if(document.getElementById("fname").value === ""){
            setfnameError(true);
        }
    }
    function lnameChanged() {
        setlnameError(false);
        setRegisteredMsg(false);
        if(document.getElementById("lname").value === ""){
            setlnameError(true);
        }
    }
    function emailChanged() {
        setEmailError(false);
        setRegisteredMsg(false);
        if(document.getElementById("email").value === ""){
            setEmailError(true);
        }
    }
    function usernameChanged() {
        setUsernameError(false);
        setRegisteredMsg(false);
        setSameUsernameError(false);
        if(document.getElementById("username").value === "" || document.getElementById("username").value.includes(" ")){
            setUsernameError(true);
        }
    }
    function passwordChanged() {
        setPasswordError(false);
        setRegisteredMsg(false);
        if(document.getElementById("password").value === "" || document.getElementById("password").value.includes(" ")) {
            setPasswordError(true);
        }
    }

    return (
        <div>
        <img width="100%" height="100%" src="https://img.freepik.com/free-vector/frame-with-dogs-vector-white-background_53876-127700.jpg?w=2000" alt="Pets"/>
        <div className="registerForm">
            <h1>MyPet Register</h1>
            <form>
            <label htmlFor="fname">First Name</label><br/><br/>
            <input type="text" id="fname" name="fname" onChange={fnameChanged}/><br/><br/>
            {fnameError && <p style={{color: 'red'}}>First name cannot be empty</p>}
            <label htmlFor="lname">Last Name</label><br/><br/>
            <input type="text" id="lname" name="lname" onChange={lnameChanged}/><br/><br/>
            {lnameError && <p style={{color: 'red'}}>Last name cannot be empty</p>}
            <label htmlFor="email">Email</label><br/><br/>
            <input type="text" id="email" name="email" onChange={emailChanged}/><br/><br/>
            {emailError && <p style={{color: 'red'}}>Email cannot be empty</p>}
            <label htmlFor="username">Username</label><br/><br/>
            <input type="text" id="username" name="username" onChange={usernameChanged}/><br/><br/>
            {usernameError && <p style={{color: 'red'}}>Username cannot be empty or contain empty spaces</p>}
            <label htmlFor="password">Password</label><br/><br/>
            <input type="password" id="password" name="password" onChange={passwordChanged}/><br/><br/>
            {passwordError && <p style={{color: 'red'}}>Password cannot be empty or contain empty spaces</p>}
            </form> 
            <button onClick={onRegister}>Register</button><br/><br/><br/>
            {registeredMsg && <p style={{color: 'green'}}>You have been registered! Please click Login to log in to your account.</p>}
            {sameUsernameError && <p style={{color: "red"}}>Another user already has that username. Please choose a different one.</p>}
            <Link to=''>Login</Link>
        </div>
        </div>
    );
}

export default RegisterPage;