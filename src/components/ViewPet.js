import React, {useState} from "react";
import "./Styles.css";

function ViewPet(props) {
    const [pets, setPets] = useState([]);

    async function viewPets() {
      await fetch("/viewpets")
      .then((res) => res.json())
      .then((data) => setPets(data.pets))
      .catch(err => console.log(err));
    }
    
    viewPets();
    
    function onRemove(id) {
        fetch("/deletepet/" + id, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        }).then((res) => res.json())
        .catch(err => console.log(err));
    }
    if(props.isLoggedIn) {
        return (
            <div>
                <h1 style={{textAlign: 'center'}}>Pets</h1><br/><br/>
                {pets.map((singlePet) => (
                  <div key={singlePet.id} className="pet">
                  <h1 style={{fontWeight:"bold", fontStyle: "italic", textAlign: 'center', color: "green"}}>{singlePet.name}</h1><br/><br/>
                  <p style={{textAlign: 'center'}}>Pet: {singlePet.pet}</p><br/>
                  <p style={{textAlign: 'center'}}>Breed: {singlePet.breed}</p><br/>
                  <p style={{textAlign: 'center'}}>Age: {singlePet.age} yrs</p><br/>
                  <p style={{textAlign: 'center'}}>Weight: {singlePet.weight} kg</p><br/>
                  <p style={{textAlign: 'center'}}>File: {singlePet.file}</p><br/><br/>
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
                  <button onClick={() => { onRemove(singlePet.id) }}>Remove</button>
                  </div>
                ))}
            </div>
        );
    }
    else {
        return (
            <h1>You must be logged in to view your pets</h1>
        )
       
    }
    
}

export default ViewPet;