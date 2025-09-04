import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useEffect, useState, useRef } from 'react';

import './ChatBox.css';

interface ChatBoxProps {
  app_state: string;
  onUpdateMessage: (message: string) => void;
}

function ChatBox({app_state, onUpdateMessage}: ChatBoxProps) {
  //const [processing, setProcessing] = useState(false);

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
    }
    // Update the ref to the current listening state for the next render
    prevListening.current = listening;
  }, [listening, transcript, onUpdateMessage]);

  let displayedText = transcript;
  if (app_state === 'listening' && !transcript) {
    displayedText = "begin speaking into your microphone now";
  }

  let response_text = "";
  if (app_state === "active" && transcript) {
    response_text = "placeholder AI response";
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
        <p className="response">{response_text}</p>
      </div>
    );
  }
  
};

export default ChatBox;