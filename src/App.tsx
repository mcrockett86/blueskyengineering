import React, { useState } from 'react';
import './App.css';
import ParticlesComponent from './ParticlesBackground';

function App() {
  const [particles_state, setParticlesState] = useState("inactive");  // inactive, listening, active

  const updateParticleBackground = () => {
    if (particles_state === "inactive") {
      setParticlesState("listening");
      //console.log(`state changed to ${particles_state}`);
    } else if (particles_state === "listening") {
      setParticlesState("active");
      //console.log(`state changed to ${particles_state}`);
    } else {
      setParticlesState("inactive");
      //console.log(`state changed to ${particles_state}`);
    }

  };
  

  return (
    <div className="App">
      <ParticlesComponent id="particles" particles_state={particles_state}/>
      <header className="App-header">
        <div className="container text-center">
          <h1 className="display-3">Blue Sky Engineering</h1>
          <h4 className="lead">AI, Data Science, & Machine Learning Consulting Services</h4>
          <hr className="my-4" />
          <p className="lead">Whether you're looking to leverage AI for business growth, optimize operations with data science, or implement cutting-edge machine learning models, I'm here to help you navigate the complexities and achieve your goals.</p>
          <p className="lead">
            <a className="btn btn-primary btn-lg mx-2" href="mailto:applybluesky@gmail.com" role="button">Contact Me</a>
            <a className="btn btn-secondary btn-lg mx-2" href="https://calendly.com/applybluesky/30min" target="_blank" rel="noopener noreferrer" role="button">Book a Meeting</a>
            <a className="btn btn-secondary btn-lg mx-2" role="button" onClick={updateParticleBackground}>Chat with AI</a>
          </p>
        </div>
      </header>
    </div>
  );
}

export default App;