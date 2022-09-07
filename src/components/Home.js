import React from "react";
import './Styles.css';

function Home() {
    return (
        <div>
        <h1 style={{textAlign: 'center'}}>Welcome to MyPet!</h1>
        <p style={{textAlign: 'center'}}>Add as many pets as you like and set up appointments for them with us.</p>
        <img width="100%" src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=0.672xw:1.00xh;0.166xw,0&resize=640:*" alt="Dog in Yard"/>
        </div>
    );
}

export default Home;