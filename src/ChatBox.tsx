import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useEffect, useState, useRef } from 'react';

import './ChatBox.css';

interface ChatBoxProps {
  app_state: string;
  onUpdateMessage: (message: string) => void;
}

function ChatBox({app_state, onUpdateMessage}: ChatBoxProps) {
  const [processing, setProcessing] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const prevListening = useRef(listening);

  let response_text = "";

  useEffect(() => {
    if (app_state === "listening") {
      SpeechRecognition.startListening();
      setProcessing(false);
    } else if (app_state === "active") {
      setProcessing(true);
    }
  }, [app_state]);

  useEffect(() => {
    // When listening changes from true to false and there is a transcript
    if (prevListening.current && !listening && transcript) {
      onUpdateMessage("processing");
    }
    // Update the ref to the current listening state for the next render
    prevListening.current = listening;
  }, [listening, transcript, onUpdateMessage]);


  if (!browserSupportsSpeechRecognition) {
    return <span>Browser does not support speech recognition.</span>;
  } else {
    return (
      <div id="ChatBox">
        {/*<p>Microphone: {listening ? 'on' : 'off'}</p>
        <p>Processing: {processing.toString()}</p>*/}
        <p>{transcript}</p>
        <p>{response_text}</p>
      </div>
    );
  }
  
};

export default ChatBox;