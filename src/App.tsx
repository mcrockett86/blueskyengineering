import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import './App.css';
import ParticlesComponent from './ParticlesBackground';

function App() {
  const [particles_state, setParticlesState] = useState("inactive");  // inactive, listening, active

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const toggleAIChat = (commanded_state: any | null) => {
    // when button is initially clicked
    if (particles_state === "inactive") {
      setParticlesState("listening");
      console.log(`state changed to ${particles_state}`);
      SpeechRecognition.startListening();
    } else if (particles_state === "listening") {
      SpeechRecognition.stopListening();
      console.log(transcript);
      setParticlesState("active");
      console.log(`state changed to ${particles_state}`);
    } else if (particles_state === "active") {
      setParticlesState("listening");
      console.log(`state changed to ${particles_state}`);
    } else {
      setParticlesState("inactive");
      console.log(`state changed to ${particles_state}`);
    }
  };


  // set up a trigger event detection for if the 'listening' variable changes from 'on' to 'off'
  // can send a 'commanded_state' over to the triggerAIChat function to handle this.


  const triggerTranscriptionChat = () => {

    console.log("running transcription ...");
  };
  

  return (
    <div className="App">
      <ParticlesComponent id="tsparticles" particles_state={particles_state}/>
      <header className="App-header">
        <div className="container text-center">
          <h1 className="display-3">Blue Sky Engineering</h1>
          <h4 className="lead">AI, Data Science, & Machine Learning Consulting Services</h4>
          <hr className="my-4" />
          <p className="lead">Whether you're looking to leverage AI for business growth, optimize operations with data science, or implement cutting-edge machine learning models, I'm here to help you navigate the complexities and achieve your goals.</p>
          <p className="lead">
            <a className="btn btn-primary btn-lg mx-2" href="mailto:applybluesky@gmail.com" role="button">Contact Me</a>
            <a className="btn btn-secondary btn-lg mx-2" href="https://calendly.com/applybluesky/30min" target="_blank" rel="noopener noreferrer" role="button">Book a Meeting</a>
            <a className="btn btn-secondary btn-lg mx-2" role="button" onClick={toggleAIChat}>Chat with AI</a>
          </p>
        </div>
      </header>
    </div>
  );
}

export default App;