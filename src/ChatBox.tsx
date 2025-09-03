import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useEffect, useState } from 'react';

import './ChatBox.css';

interface ChatBoxProps {
  app_state: string;
  onUpdateMessage: (message: string) => void;
}

function ChatBox({app_state, onUpdateMessage}: ChatBoxProps) {
//function ChatBox(props: any) {

  const [processing, setProcessing] = useState(false);

  //let props = {app_state: 'listening'}

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (app_state === "listening") {
      SpeechRecognition.startListening();
      setProcessing(false)
    }
    else if (app_state === "active") {
      SpeechRecognition.stopListening();
      setProcessing(true)
    } else {

    }

    /*
    if (!listening) {
      // This block will execute when listening stops
      //console.log('Speech recognition has stopped listening.');
      // Perform any actions needed after listening ends, e.g., process the final transcript
      //setProcessing(false)
    } 
    */  

    /*
    if (!listening && app_state === "listening" ) {
      // Perform any actions needed after listening ends, e.g., process the final transcript
      console.log('Speech recognition has stopped listening.');

      //setProcessing(true)
      //onUpdateMessage("processing");
    }
    */
  }, [app_state, onUpdateMessage]);


  if (!browserSupportsSpeechRecognition) {
    return <span>Browser does not support speech recognition.</span>;
  } else {
    return (
      <div id="ChatBox">
        <p>Microphone: {listening ? 'on' : 'off'}</p>
        <p>Processing: {processing.toString()}</p>
        <p>{transcript}</p>
      </div>
    );
  }
  
};

export default ChatBox;