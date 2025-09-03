import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useEffect } from 'react';

//function ChatBox(props: any) {
function ChatBox(props: any) {

  //const [chat_box, setAppState] = useState("inactive");  // inactive, listening, active

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (props.app_state === "listening") {
      SpeechRecognition.startListening();
    } else {
      SpeechRecognition.stopListening();
    }

    if (!listening) {
      // This block will execute when listening stops
      console.log('Speech recognition has stopped listening.');
      // Perform any actions needed after listening ends, e.g., process the final transcript
    }
  }, [props]);


  if (!browserSupportsSpeechRecognition) {
    return <span>Browser does not support speech recognition.</span>;
  } else {
    return (
      <div>
        <p>Microphone: {listening ? 'on' : 'off'}</p>
        <p>{transcript}</p>
      </div>
    );
  }
  
};

export default ChatBox;