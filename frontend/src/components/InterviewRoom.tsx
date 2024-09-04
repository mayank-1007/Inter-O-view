import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { IconRiCameraLine } from './IconRiCameraLine';
import { IconRiCameraOffLine } from './IconRiCameraOffLine';
import { IconRiMicLine } from './IconRiMicLine';
import { IconRiMicOffLine } from './IconRiMicOffLine';
import AWS from 'aws-sdk';

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

function InterviewRoom() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [conversationHistory, setConversationHistory] = useState<any[]>([]);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isGifVisible, setIsGifVisible] = useState(false);
  const [isAwsConnected, setIsAwsConnected] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const recogRef: any = useRef(null);

  useEffect(() => {
    // Check if AWS Polly is configured and connected
    const checkAwsConnection = async () => {
      try {
        AWS.config.update({
          region: 'us-east-1', // Change to your region
          accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY, // Replace with your credentials
          secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
        });
        const polly = new AWS.Polly();
        const params = {
          Text: 'Test connection',
          OutputFormat: 'mp3',
          VoiceId: 'Joanna',
        };
        await polly.synthesizeSpeech(params).promise();
        setIsAwsConnected(true);
      } catch (error) {
        console.error('AWS Polly connection failed:', error);
        setIsAwsConnected(false);
      }
    };

    checkAwsConnection();

    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition not supported.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recogRef.current = recognition;

    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (e: any) => {
      const transcriptResult = e.results[0][0].transcript;
      setTranscript(transcriptResult);
    };

    recognition.onspeechend = () => {
      setIsListening(false);
      recognition.stop();
    };

    recognition.onerror = () => {
      setIsListening(false);
      recognition.stop();
    };
  }, []);

  const startListening = () => {
    if (isListening) {
      setIsListening(false);
      recogRef.current.stop();
    } else {
      setIsListening(true);
      recogRef.current.start();
    }
  };

  const speakText = async () => {
    if (response) {
      if (isAwsConnected) {
        const polly = new AWS.Polly();
        const params = {
          Text: response,
          OutputFormat: 'mp3',
          VoiceId: 'Joanna', // or any other available voice
        };

        try {
          const { AudioStream } = await polly.synthesizeSpeech(params).promise();
          const audioBlob = new Blob([AudioStream as BlobPart], { type: 'audio/mp3' });
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          audio.onplay = () => {
            setIsGifVisible(true);
          };
          audio.onended = () => {
            setIsGifVisible(false);
          };
          audio.play();
        } catch (error) {
          console.error('Error with AWS Polly speech synthesis:', error);
        }
      } else if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(response);
        utterance.rate = 1;

        utterance.onstart = () => {
          setIsGifVisible(true);
        };

        utterance.onend = () => {
          setIsGifVisible(false);
        };

        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const getResponse = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/v1/user/callModel', { query: transcript });
      const newResponse = res.data.message;
      setResponse(newResponse);
      setConversationHistory([...conversationHistory, { user: transcript, ai: newResponse }]);
      speakText();
    } catch (error) {
      console.error('Error fetching response:', error);
    }
  };

  useEffect(() => {
    if (transcript) {
      getResponse();
    }
  }, [transcript]);

  const toggleCamera = async () => {
    if (isCameraOn) {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
      setIsCameraOn(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsCameraOn(true);
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-200 bg-zinc-900">
      <div className="flex justify-between p-4 bg-zinc-800">
        <h2 className="text-2xl font-semibold">
          <img
            src="inter-o-view.jpg"
            alt="logo"
            height={'40px'}
            width={'80px'}
            className="rounded-lg"
          />
        </h2>
        <button
          onClick={() => window.location.href = '/dashboard'}
          className="px-4 py-2 text-black bg-white rounded-md"
        >
          End Interview
        </button>
      </div>

      <div className="flex flex-1 gap-4 p-4 overflow-hidden">
        {/* Left Section with Camera and GIF */}
        <div className="flex flex-col items-center flex-1 gap-4">
          <div className="flex flex-row justify-center w-full gap-4">
            {/* Camera Area */}
            <div className="relative w-1/2 max-w-sm overflow-hidden bg-gray-800 h-72 rounded-3xl">
              <video ref={videoRef} autoPlay className={`w-full h-full ${isCameraOn ? 'block' : 'hidden'}`}></video>
              {!isCameraOn && (
                <div className="flex items-center justify-center h-full text-3xl text-white">
                  User
                </div>
              )}
            </div>

            {/* GIF Area */}
            <div className="relative items-center justify-center w-1/2 max-w-sm overflow-hidden bg-zinc-800 h-72 rounded-3xl">
              {(isGifVisible && !isListening) ? (
                <img
                  src="interviewer1.gif"
                  alt="Interviewer"
                  className="object-cover h-full w-fit"
                />
              ) : (
                <img
                  src="interviewer1.png"
                  alt="Interviewer"
                  className="object-cover h-full w-fit "
                />
              )}
            </div>
          </div>

          {/* Camera and Mic Icons */}
          <div className="flex justify-center p-2 rounded-3xl">
            <button
              onClick={toggleCamera}
              className={`items-center justify-center p-4 mr-4 rounded-full ${isCameraOn ? 'bg-green-600' : 'bg-red-600'}`}
            >
              {isCameraOn ? (
                <IconRiCameraLine className="text-3xl" />
              ) : (
                <IconRiCameraOffLine className="text-3xl" />
              )}
            </button>

            <button
              onClick={startListening}
              className={`items-center justify-center p-4 rounded-full ${isListening ? 'bg-green-600' : 'bg-red-600'}`}
            >
              {isListening ? <IconRiMicLine className="text-3xl" /> : <IconRiMicOffLine className="text-3xl" />}
            </button>
          </div>

          {/* Message and Response Section */}
          <div className="w-full min-h-0 p-4 rounded-md bg-zinc-800">
            {transcript && (
              <p className="p-4 mt-2 text-lg rounded-md">
                <span className="font-semibold">User:</span> <br /> {transcript}
              </p>
            )}
            {response && (
              <p className="p-4 mt-2 text-lg rounded-md">
                <span className="font-semibold">AI:</span> <br /> {response}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewRoom;
