import React, {useEffect, useState} from "react";
import './Styles.css';
import { Link } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import Header from "./Header";
import PetForm from "./PetForm";
import Home from "./Home";
import AppointmentForm from "./AppointmentForm";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import RegisterPage from "./RegisterPage";
import ViewPet from "./ViewPet";
import ViewAppointments from "./ViewAppointments";

function LoginPage() {
    const [userLogin, setUserLogin] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [invalidLogin, setIsInvalidLogin] = useState(false);
    const [currentUser, setCurrentUser] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentEmail, setCurrentEmail] = useState('');

    useEffect(() => {
        async function getLoggedInState() {
            await fetch("/isloggedin", {
            }).then((res) => res.json())
            .then((data) => {
                if(data.loggedIn){
                    setIsLoggedIn(true);
                }
                else{
                    setIsLoggedIn(false);
                }})
            .catch(err => console.log(err));
        }
        getLoggedInState();
    }, [])
   
    function usernameChanged() {
        setUsernameError(false);
        setIsInvalidLogin(false);
        if(document.getElementById("username").value === ""){
            setUsernameError(true);
        }
    }
    function passwordChanged() {
        setPasswordError(false);
        setIsInvalidLogin(false);
        if(document.getElementById("password").value === "") {
            setPasswordError(true);
        }
    }

    function onLogin(event) {
        event.preventDefault();
        if(document.getElementById("username").value === ""){
            setUsernameError(true);
        }
        if(document.getElementById("password").value  === "") {
            setPasswordError(true);
        }
        if(document.getElementById("username").value !== "" && document.getElementById("password").value !== "") {
        
            fetch("/login", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: document.getElementById("username").value, password: document.getElementById("password").value})
            }).then((res) => res.json())
            .then((data) => {
                if(data.loggedIn){
                    setUserLogin(true);
                    setCurrentUser(data.currentUser);
                    setCurrentEmail(data.email);
                }
                else{
                    setIsInvalidLogin(true);
                }})
            .catch(err => console.log(err));
         
        }
        
    }
    
    return (
    <Switch>
        <Route exact path="/addpet"> 
            <Header isLoggedIn={isLoggedIn}/>
            <PetForm cu={currentUser} isLoggedIn={isLoggedIn}/>
        </Route>
        <Route exact path="/addappt">
            <Header isLoggedIn={isLoggedIn}/>
            <AppointmentForm cu={currentUser} isLoggedIn={isLoggedIn} email={currentEmail}/>
        </Route>
        <Route exact path="/viewpets">
            <Header isLoggedIn={isLoggedIn}/>
            <ViewPet isLoggedIn={isLoggedIn}/>
        </Route>
        <Route exact path="/viewappts">
            <Header isLoggedIn={isLoggedIn}/>
            <ViewAppointments isLoggedIn={isLoggedIn}/>
        </Route>
        <Route exact path="/register">
            <RegisterPage/>
        </Route>
        <Route exact path="/home">
            <Header isLoggedIn={isLoggedIn}/>
            <Home/>
        </Route>
        <Route exact path="">
        <img width="100%" height="100%" src="https://img.freepik.com/free-vector/frame-with-dogs-vector-white-background_53876-127700.jpg?w=2000" alt="Pets"/>
        <div className="loginForm">
            <h1>MyPet Login</h1>
            <form onSubmit={onLogin}>
            <label htmlFor="username">Username</label><br/><br/>
            <input type="text" id="username" name="username" onChange={usernameChanged}/><br/><br/>
            {usernameError && <p style={{color: 'red'}}>Username cannot be empty</p>}
            <label htmlFor="password">Password</label><br/><br/>
            <input type="password" id="password" name="password" onChange={passwordChanged}/><br/><br/>
            {passwordError && <p style={{color: 'red'}}>Password cannot be empty</p>}
            <button>Login</button><br/><br/>
            {invalidLogin && <p style={{color: "red"}}>Invalid Credentials</p>}
            </form> 
            <Link to='/register'>Register</Link>
            {userLogin && <Redirect to='/home'/>}
        </div>
        </Route>
    </Switch>
    );
} 

export default LoginPage;