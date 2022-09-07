import React, {useState} from "react";
import './Styles.css';

function PetForm(props) {

    const [nameError, setNameError] = useState(false);
    const [weightError, setWeightError] = useState(false);
    const [ageError, setAgeError] = useState(false);
    const [breedError, setBreedError] = useState(false);
    const [petError, setPetError] = useState(false);
    const [registeredMsg, setRegisteredMsg] = useState(false);

    
    function selectedPet() {
        var select;
        select = document.getElementById("selectBreed");
        var opt;

        setPetError(false);
        setRegisteredMsg(false);
        if(document.getElementById("selectPet").value === "select"){
            setPetError(true);
            select.innerHTML = "";
        }
        if(document.getElementById("selectPet").value === "Other"){
            setBreedError(false);
            select.innerHTML = "";
        }
        if(document.getElementById("selectPet").value === "Dog"){
            select.innerHTML = "";

            opt = document.createElement("option");
            opt.value = "select";
            opt.textContent = "--Select--";
            select.appendChild(opt);

            opt = document.createElement("option");
            opt.value = "Labrador Retriever";
            opt.textContent = "Labrador Retriever";
            select.appendChild(opt);

            opt = document.createElement("option");
            opt.value = "German Shepherd";
            opt.textContent = "German Shepherd";
            select.appendChild(opt);

            opt = document.createElement("option");
            opt.value = "Golden Retriever";
            opt.textContent = "Golden Retriever";
            select.appendChild(opt);

            opt = document.createElement("option");
            opt.value = "Poodle";
            opt.textContent = "Poodle";
            select.appendChild(opt);

            opt = document.createElement("option");
            opt.value = "Bulldog";
            opt.textContent = "Bulldog";
            select.appendChild(opt);

            opt = document.createElement("option");
            opt.value = "Other";
            opt.textContent = "Other";
            select.appendChild(opt);
        }

        if(document.getElementById("selectPet").value === "Cat"){
            select.innerHTML = "";

            opt = document.createElement("option");
            opt.value = "select";
            opt.textContent = "--Select--";
            select.appendChild(opt);

            opt = document.createElement("option");
            opt.value = "Domestic Longhair";
            opt.textContent = "Domestic Longhair";
            select.appendChild(opt);

            opt = document.createElement("option");
            opt.value = "Domestic Shorthair";
            opt.textContent = "Domestic Shorthair";
            select.appendChild(opt);

            opt = document.createElement("option");
            opt.value = "American Shorthair";
            opt.textContent = "American Shorthair";
            select.appendChild(opt);

            opt = document.createElement("option");
            opt.value = "Maine Coon";
            opt.textContent = "Maine Coon";
            select.appendChild(opt);

            opt = document.createElement("option");
            opt.value = "Siamese";
            opt.textContent = "Siamese";
            select.appendChild(opt);

            opt = document.createElement("option");
            opt.value = "Other";
            opt.textContent = "Other";
            select.appendChild(opt);
        }

        if(document.getElementById("selectPet").value === "Fish"){
            select.innerHTML = "";

            opt = document.createElement("option");
            opt.value = "select";
            opt.textContent = "--Select--";
            select.appendChild(opt);

            opt = document.createElement("option");
            opt.value = "Betta";
            opt.textContent = "Betta";
            select.appendChild(opt);

            opt = document.createElement("option");
            opt.value = "Goldfish";
            opt.textContent = "Goldfish";
            select.appendChild(opt);

            opt = document.createElement("option");
            opt.value = "Angelfish";
            opt.textContent = "Angelfish";
            select.appendChild(opt);

            opt = document.createElement("option");
            opt.value = "Catfish";
            opt.textContent = "Catfish";
            select.appendChild(opt);

            opt = document.createElement("option");
            opt.value = "Guppies";
            opt.textContent = "Guppies";
            select.appendChild(opt);

            opt = document.createElement("option");
            opt.value = "Other";
            opt.textContent = "Other";
            select.appendChild(opt);
        }
    }

    function onAdd(event) {
        event.preventDefault();
        if(document.getElementById("selectPet").value === "select"){
            setPetError(true);
        }
        if(document.getElementById("selectPet").value !== "other" && (document.getElementById("selectBreed").value === "select" || document.getElementById("selectBreed").value === "")){
            setBreedError(true);
        }
        if(document.getElementById("age").value === ""){
            setAgeError(true);
        }
        if(document.getElementById("weight").value  === "") {
            setWeightError(true);
        }
        if(document.getElementById("name").value === ""){
            setNameError(true);
        }
        if(document.getElementById("selectPet").value !== "select" && document.getElementById("selectBreed").value !== "select" &&
        document.getElementById("selectBreed").value !== ""  && document.getElementById("name").value !== "" && document.getElementById("age").value !== "" &&
        document.getElementById("weight").value !== ""){

            fetch("/addpet", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: props.cu,
                    pet: document.getElementById("selectPet").value,
                    breed: document.getElementById("selectBreed").value,
                    name: document.getElementById("name").value.trim(),
                    age: document.getElementById("age").value,
                    weight: document.getElementById("weight").value,
                    file: document.getElementById("vacfile").value.substring(document.getElementById("vacfile").value.lastIndexOf("\\") + 1)
                })
            }).then((res) => res.json())
            .then((data) => {
                if(data.succeeded){
                    setRegisteredMsg(true);
                }
            })
            .catch(err => console.log(err));
        }

        if(document.getElementById("selectPet").value === "other" && document.getElementById("name").value !== "" && 
        document.getElementById("age").value !== "" && document.getElementById("weight").value !== "") {

            fetch("/addpet", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username: props.cu,
                    pet: document.getElementById("selectPet").value,
                    breed: document.getElementById("selectBreed").value,
                    name: document.getElementById("name").value.trim(),
                    age: document.getElementById("age").value,
                    weight: document.getElementById("weight").value,
                    file: document.getElementById("vacfile").value.substring(document.getElementById("vacfile").value.lastIndexOf("\\") + 1)
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

    function breedChanged() {
        setBreedError(false);
        setRegisteredMsg(false);
        if(document.getElementById("selectBreed").value === "select" || document.getElementById("selectBreed").value === ""){
            setBreedError(true);
        }
    }
    function nameChanged() {
        setNameError(false);
        setRegisteredMsg(false);
        if(document.getElementById("name").value === ""){
            setNameError(true);
        }
    }
    function weightChanged() {
        setWeightError(false);
        setRegisteredMsg(false);
        if(document.getElementById("weight").value  === "") {
            setWeightError(true);
        }
    }
    function ageChanged() {
        setAgeError(false);
        setRegisteredMsg(false);
        if(document.getElementById("age").value === ""){
            setAgeError(true);
        }
    }
    
    if(props.isLoggedIn){
        return (
        <div className="petForm">
            <form onSubmit={onAdd} encType="multipart/form-data">
                <h1>Add Pet</h1><br/><br/>
                <label htmlFor="pet">Pet</label><br/><br/>
                <select name="selectPet" id="selectPet" onChange={selectedPet}>
                    <option value="select">--Select--</option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Fish">Fish</option>
                    <option value="Other">Other</option>
                </select><br/><br/>
                {petError && <p style={{color: 'red'}}>Pet type cannot be empty</p>}<br/><br/>
                <label htmlFor="breed">Breed</label><br/><br/>
                <select name="selectBreed" id="selectBreed" onChange={breedChanged}/><br/><br/>
                {breedError && <p style={{color: 'red'}}>Breed cannot be empty unless pet type is other</p>}<br/><br/>
                <label htmlFor="name">Name</label><br/><br/>
                <input type="text" id="name" name="name" onChange={nameChanged}/><br/><br/>
                {nameError && <p style={{color: 'red'}}>Name cannot be empty</p>}<br/><br/>
                <label htmlFor="weight">Weight</label><br/><br/>
                <input type="number" id="weight" name="weight" min="0" max="100" step="5" onChange={weightChanged}/>  kg<br/><br/>
                {weightError && <p style={{color: 'red'}}>Weight cannot be empty</p>}<br/><br/>
                <label htmlFor="age">Age</label><br/><br/>
                <input type="number" id="age" name="age" min="0" max="15" onChange={ageChanged}/>   yrs<br/><br/>
                {ageError && <p style={{color: 'red'}}>Age cannot be empty</p>}<br/><br/>
                <label htmlFor="vacfile">Upload Any Vaccination File If Applicable:</label><br/><br/>
                <input type="file" id="vacfile" name="vacfile"></input><br/><br/>
                <button>Add Pet</button><br/><br/>
                {registeredMsg && <p style={{color: 'green'}}>Pet Added!</p>}
            </form>
        </div>
        )
    }
    else {
        return (
            <h1>You must be logged in to add a pet</h1>
        )
    }
    
}

export default PetForm;