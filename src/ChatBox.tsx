import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useEffect, useState, useRef } from 'react';

import './ChatBox.css';

interface ChatBoxProps {
  app_state: string;
  onUpdateMessage: (message: string) => void;
}

function ChatBox({app_state, onUpdateMessage}: ChatBoxProps) {
  //const [processing, setProcessing] = useState(false);
  const [responseText, setResponseText] = useState('');

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const prevListening = useRef(listening);

  useEffect(() => {
    if (app_state === "listening") {
      resetTranscript();
      setResponseText('');
      SpeechRecognition.startListening();
      //setProcessing(false);
    } else if (app_state === "active") {
      //setProcessing(true);
    }
  }, [app_state, resetTranscript]);

  useEffect(() => {
    // When listening changes from true to false and there is a transcript
    if (prevListening.current && !listening && transcript) {
      onUpdateMessage("processing");
      fetch(`https://definite-perch-sincerely.ngrok-free.app/chat?question=${encodeURIComponent(transcript)}`, {
        method: "get",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      })
        .then(res => res.text())
        .then(text => {
          setResponseText(text);
          onUpdateMessage("active");
        })
        .catch(err => {
          console.error("Error fetching chat response:", err);
          setResponseText("Error fetching response.");
          onUpdateMessage("active");
        });
    }
    // Update the ref to the current listening state for the next render
    prevListening.current = listening;
  }, [listening, transcript, onUpdateMessage]);

  let displayedText = transcript;
  if (app_state === 'listening' && !transcript) {
    displayedText = "begin speaking into your microphone now";
  }

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser does not support speech recognition.</span>;
  } else {
    return (
      <div id="ChatBox">
        {/*<p>Microphone: {listening ? 'on' : 'off'}</p>
        <p>Processing: {processing.toString()}</p>*/}
        <p className="transcript">{displayedText}</p>
        <hr className="my-4" />
        <p className="response">{responseText}</p>
      </div>
    );
  }
  
};

export default ChatBox;