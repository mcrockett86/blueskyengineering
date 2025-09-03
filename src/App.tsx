import React, { useState } from 'react';
import ParticlesComponent from './ParticlesBackground';
import ChatBox from './ChatBox';

import './App.css';


function App() {
  const [app_state, setAppState] = useState("inactive");  // inactive, listening, active
  

  // TODO: change this to useEffect method switching app state
  const toggleAIChat = (commanded_state: any | null) => {
    // when button is initially clicked
    if (app_state === "inactive") {
      setAppState("listening");
      //console.log(`state changed to ${app_state}`);
    } else if (app_state === "listening") {
      setAppState("active");
      //console.log(`state changed to ${app_state}`);
    } else if (app_state === "active") {
      setAppState("listening");
      //console.log(`state changed to ${app_state}`);
    } else {
      setAppState("inactive");
      //console.log(`state changed to ${app_state}`);
    }
  };

  const updateMessageFromChildComponent = (newMessage: string) => {
    if (newMessage === "processing"){
      console.log("received updateMessage from child component!")
      setAppState("active");
      //console.log(`state changed to ${app_state}`);
    }
  };

  console.log(`App.props.app_state = ${app_state}`);

  return (
    <div className="App">
      <ParticlesComponent id="tsparticles" particles_state={app_state}/>
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
          <ChatBox app_state={app_state} onUpdateMessage={updateMessageFromChildComponent} />
        </div>
      </header>
    </div>
  );
}

export default App;