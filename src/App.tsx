import React, { useState } from 'react';
import ParticlesComponent from './ParticlesBackground';
import ChatBox from './ChatBox';
import { FaLinkedin, FaGithub, FaFacebook, FaEnvelope, FaCalendarAlt, FaRobot } from 'react-icons/fa';
import { FaMapMarkerAlt } from 'react-icons/fa';


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
          <h3 className="lead">AI, Data Science, & Machine Learning Services</h3>
          <hr className="my-4" />
          <p className="lead-promise">Whether you're looking to leverage AI for business growth, optimize operations with data science, or implement cutting-edge machine learning models, I'm here to help you achieve your goals.</p>
          <p className="lead-promise">Contact me using the icons below, or speak with my <span className="lead-action">AI robot persona</span> immediately!</p>
          <hr className="my-4" />
          <ChatBox app_state={app_state} onUpdateMessage={updateMessageFromChildComponent} />
        </div>
          <div className="social-icons-container mt-4">
            <div className="social-icon-wrapper">
              <a href="mailto:applybluesky@gmail.com" className="social-icon blue-brand">
                <FaEnvelope size={50} />
              </a>
              <div className="icon-label blue-brand">Email</div>
            </div>
            <div className="social-icon-wrapper">
              <a href="https://calendly.com/applybluesky/30min" target="_blank" rel="noopener noreferrer" className="social-icon blue-brand">
                <FaCalendarAlt size={50} />
              </a>
              <div className="icon-label blue-brand">Calendar</div>
            </div>
            <div className="social-icon-wrapper">
              <a role="button" href="#foo" onClick={(e) => { e.preventDefault(); toggleAIChat(null); }} className="social-icon ai-robot">
                <FaRobot size={50} />
              </a>
              <div className="icon-label ai-robot">Chat with AI</div>
            </div>
            <div className="social-icon-wrapper">
              <a href="https://linkedin.com/in/rniice" target="_blank" rel="noopener noreferrer" className="social-icon blue-brand">
                <FaLinkedin size={50} />
              </a>
              <div className="icon-label blue-brand">LinkedIn</div>
            </div>
            <div className="social-icon-wrapper">
              <a href="https://github.com/mcrockett86" target="_blank" rel="noopener noreferrer" className="social-icon blue-brand">
                <FaGithub size={50} />
              </a>
              <div className="icon-label blue-brand">GitHub</div>
            </div>
            <div className="social-icon-wrapper">
              <a href="https://www.google.com/maps/place/47%C2%B037'17.0%22N+122%C2%B020'18.5%22W/@47.6241954,-122.357612,12940m/data=!3m1!1e3!4m4!3m3!8m2!3d47.6213889!4d-122.3384722?entry=ttu&g_ep=EgoyMDI1MDgzMC4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="social-icon blue-brand">
                <FaMapMarkerAlt size={50} />
              </a>
              <div className="icon-label blue-brand">Location</div>
            </div>
            <div className="social-icon-wrapper">
              <a href="https://www.facebook.com/croketm/" target="_blank" rel="noopener noreferrer" className="social-icon blue-brand">
                <FaFacebook size={50} />
              </a>
              <div className="icon-label blue-brand">Facebook</div>
            </div>
          </div>
      </header>
    </div>
    
  );
}

export default App;