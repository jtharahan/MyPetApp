import React, {useState} from "react";
import "./Styles.css";

function ViewAppointments(props) {
    const [appts, setAppts] = useState([]);

    fetch("/viewappts")
      .then((res) => res.json())
      .then((data) => setAppts(data.appts))
      .catch(err => console.log(err));

    function onRemove(id){
        fetch("/deleteappt/" + id, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json'},
        }).then((res) => res.json())
        .catch(err => console.log(err));
    }

    if(props.isLoggedIn) {
        return (
            <div>
                <h1 style={{textAlign: 'center'}}>Appointments</h1><br/><br/>
                {appts.map((appt) => (
                  <div key={appt.id} className="appt">
                  <h1 style={{fontWeight:"bold", fontStyle: "italic", textAlign: 'center', color: "green"}}>{appt.type}</h1><br/><br/>
                  <p style={{textAlign: 'center'}}>Name: {appt.name}</p><br/>
                  <p style={{textAlign: 'center'}}>Date: {appt.date}</p><br/>
                  <p style={{textAlign: 'center'}}>Time: {appt.time}</p><br/>
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  <button onClick={() => { onRemove(appt.id) }}>Remove</button>
                  </div>
                ))}
            </div>
        );
    }
    else {
        return (
            <h1>You must be logged in to view an appointment</h1>
        )
        
    }
    
}

export default ViewAppointments;