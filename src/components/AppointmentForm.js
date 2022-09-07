import React, {useState} from "react";
import moment from "moment";
import './Styles.css';

function AppointmentForm(props) {
    const [nameError, setNameError] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [timeError, setTimeError] = useState(false);
    const [typeError, setTypeError] = useState(false);
    const [registeredMsg, setRegisteredMsg] = useState(false);
    
    function fetchPetNames() {
        var opt;
        var select = document.getElementById("name");
        select.innerHTML = "";
        fetch("/getnames").then((res) => res.json())
        .then((data) => {
            for(const key in data.names) {
                opt = document.createElement("option");
                opt.value = data.names[key];
                opt.textContent = data.names[key];
                select.appendChild(opt);
            }
        })
        .catch(err => console.log(err));

    }
    function onAddAppt(event) {
        event.preventDefault();
        if(document.getElementById("name").value === "select"){
            setNameError(true);
        }
        if(document.getElementById("apptdate").value === ""){
            setDateError(true);
        }
        if(document.getElementById("appttime").value  === "") {
            setTimeError(true);
        }
        if(document.getElementById("appttype").value === "select"){
            setTypeError(true);
        }
        if(document.getElementById("name").value !== "select" && document.getElementById("apptdate").value !== "" &&
        document.getElementById("appttime").value !== ""  && document.getElementById("appttype").value !== "select"){
            fetch("/addappt", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username: props.cu,
                    email: props.email,
                    name: document.getElementById("name").value.trim(),
                    date: document.getElementById("apptdate").value.trim(),
                    time: document.getElementById("appttime").value.trim(),
                    type: document.getElementById("appttype").value.trim(),
                })
            }).then((res) => res.json())
            .then((data) => {
                if(data.succeeded){
                    setRegisteredMsg(true);
                }
            })
            .catch(err => console.log(err));
        }
    }

    function nameChanged() {
        setNameError(false);
        setRegisteredMsg(false);
        if(document.getElementById("name").value === "select"){
            setNameError(true);
        }
    }
    function dateChanged() {
        setDateError(false);
        setRegisteredMsg(false);
        if(document.getElementById("apptdate").value === ""){
            setDateError(true);
        }
    }
    function timeChanged() {
        setTimeError(false);
        setRegisteredMsg(false);
        if(document.getElementById("appttime").value  === "") {
            setTimeError(true);
        }
    }
    function typeChanged() {
        setTypeError(false);
        setRegisteredMsg(false);
        if(document.getElementById("appttype").value === "select"){
            setTypeError(true);
        }
    }

    if(props.isLoggedIn) {
        return (
            <div className="petForm">
                <form onSubmit={onAddAppt}>
                    <h1>Schedule an Appointment</h1><br/><br/>
                    <label htmlFor="name">Name:</label><br/><br/>  
                    <select id="name" name="name" onChange={nameChanged} onClick={fetchPetNames}/><br/><br/>
                    {nameError && <p style={{color: 'red'}}>Name cannot be empty</p>}<br/><br/>  
                    <label htmlFor="apptdate">Date:</label><br/><br/>  
                    <input type="date" id="apptdate" name="apptdate" min={moment().add(1, "days").format("YYYY-MM-DD")} onChange={dateChanged}/><br/><br/>
                    {dateError && <p style={{color: 'red'}}>Date cannot be empty</p>}<br/><br/>  
                    <label htmlFor="appttime">Time:</label><br/><br/>  
                    <input type="time" id="appttime" name="appttime" onChange={timeChanged} min='09:00' max='21:00' step='1800'/><br/><br/>
                    {timeError && <p style={{color: 'red'}}>Time cannot be empty</p>}<br/><br/>  
                    <label htmlFor="appttype">Type:</label><br/><br/>  
                    <select name="appttype" id="appttype" onChange={typeChanged}>
                        <option value="select">--Select--</option>
                        <option value="Cleaning">Cleaning</option>
                        <option value="Daycare">Daycare</option>
                        <option value="Vet Checkup">Vet Checkup</option>
                        <option value="Other">Other</option>
                    </select><br/><br/>
                    {typeError && <p style={{color: 'red'}}>Appointment type cannot be empty</p>}<br/><br/>  
                    <button>Add Appointment</button><br/><br/>
                    {registeredMsg && <p style={{color: 'green'}}>Appointment Added!</p>}
                </form>
            </div>
        )
    }
    else {
        return (
            <h1>You must be logged in to add an appointment</h1>
        )
       
    }
    
}

export default AppointmentForm;