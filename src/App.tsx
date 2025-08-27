import React from 'react';
import './App.css';
import ParticlesComponent from './ParticlesBackground';

function App() {
  return (
    <div className="App">
      <ParticlesComponent id="particles" />
      <header className="App-header">
        <div className="container text-center">
          <h1 className="display-3">Blue Sky Engineering</h1>
          <h4 className="lead">AI, Data Science, & Machine Learning Consulting Services</h4>
          <hr className="my-4" />
          <p className="lead">Whether you're looking to leverage AI for business growth, optimize operations with data science, or implement cutting-edge machine learning models, I'm here to help you navigate the complexities and achieve your goals.</p>
          <p className="lead">
            <a className="btn btn-primary btn-lg mx-2" href="mailto:applybluesky@gmail.com" role="button">Contact Me</a>
            <a className="btn btn-secondary btn-lg mx-2" href="https://calendly.com/applybluesky/30min" target="_blank" rel="noopener noreferrer" role="button">Book a Meeting</a>
          </p>
        </div>
      </header>
    </div>
  );
}

export default App;