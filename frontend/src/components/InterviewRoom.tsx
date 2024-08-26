import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

function InterviewRoom() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [receivedResponse, setReceivedResponse] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<{ text: string, isExpanded: boolean }[]>([]);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [cameraAndInterviewHeight, setCameraAndInterviewHeight] = useState(300);
  const [responseAreaHeight, setResponseAreaHeight] = useState(200);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isGifVisible, setIsGifVisible] = useState(false); // State to control GIF visibility
  const videoRef = useRef<HTMLVideoElement>(null);
  const cameraAndInterviewRef = useRef<HTMLDivElement>(null);
  const responseAreaRef = useRef<HTMLDivElement>(null);
  const recogRef: any = useRef(null);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Speech recognition not supported.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recogRef.current = recognition;

    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (e: any) => {
      const transcriptResult = e.results[0][0].transcript;
      console.log('Transcript Result:', transcriptResult); // Debugging
      setTranscript(transcriptResult);
    };

    recognition.onspeechend = () => {
      setIsListening(false);
      recognition.stop();
    };

    recognition.onerror = (e: any) => {
      console.error('Speech recognition error detected: ' + e.error);
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

  const speakText = () => {
    if ('speechSynthesis' in window && response) {
      const utterance = new SpeechSynthesisUtterance(response);
      utterance.rate = 1;

      // Manage GIF visibility
      utterance.onstart = () => {
        setIsGifVisible(true);  
      };

      utterance.onend = () => {
        setIsGifVisible(false);
        setReceivedResponse(false); // Mark response as handled after speaking
      };

      window.speechSynthesis.speak(utterance);
    }
  };

  const getResponse = async () => {
    try {
      console.log('Fetching response for:', transcript); // Debugging
      const res = await axios.post('http://localhost:3000/api/v1/user/callModel', { query: transcript });
      console.log('API Response:', res.data.message); // Debugging
      setResponse(res.data.message);
      setReceivedResponse(true);
      setIsGifVisible(true); // Show GIF when response is received
    } catch (error) {
      console.error('Error fetching response:', error);
    }
  };

  useEffect(() => {
    if (transcript) {
      getResponse();
    }
  }, [transcript]);

  useEffect(() => {
    if (response) {
      console.log("Response received:", response); // Debugging line
      speakText();
      const timestamp = new Date().toLocaleTimeString();
      setConversationHistory(prev => [
        ...prev,
        { text: `Prompt (${timestamp}): ${transcript}\nResponse (${timestamp}): ${response}`, isExpanded: false }
      ]);
    }
  }, [response]);

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

  const handleCameraAndInterviewResizeMouseDown = () => {
    document.addEventListener('mousemove', handleCameraAndInterviewResizeMouseMove as EventListener);
    document.addEventListener('mouseup', handleCameraAndInterviewResizeMouseUp as EventListener);
  };

  const handleCameraAndInterviewResizeMouseMove = (e: MouseEvent) => {
    const newHeight = e.clientY - (cameraAndInterviewRef.current?.getBoundingClientRect().top || 0);
    if (newHeight > 100 && newHeight < window.innerHeight - responseAreaHeight - 50) {
      setCameraAndInterviewHeight(newHeight);
      setResponseAreaHeight(window.innerHeight - newHeight - 50);
    }
  };

  const handleCameraAndInterviewResizeMouseUp = () => {
    document.removeEventListener('mousemove', handleCameraAndInterviewResizeMouseMove as EventListener);
    document.removeEventListener('mouseup', handleCameraAndInterviewResizeMouseUp as EventListener);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleEntry = (index: number) => {
    setConversationHistory(prev => prev.map((entry, i) => i === index ? { ...entry, isExpanded: !entry.isExpanded } : entry));
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 bg-black text-white transition-transform transform ${isSidebarOpen ? 'w-64 translate-x-0 border-r-2 border-white' : 'w-0 -translate-x-full'}`}>
        <div className="h-full p-4 overflow-auto">
          <h2 className="items-center justify-center text-lg font-bold">Conversation History</h2>
          <ul className="space-y-2">
            {conversationHistory.length > 0 ? (
              conversationHistory.map((entry, index) => (
                <li key={index} className="border-b border-gray-700">
                  <div className="p-2 cursor-pointer" onClick={() => toggleEntry(index)}>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Conversation {index + 1}</span>
                      <span>{entry.isExpanded ? '▲' : '▼'}</span>
                    </div>
                    {entry.isExpanded && (
                      <pre className="mt-2 whitespace-pre-wrap">{entry.text}</pre>
                    )}
                  </div>
                </li>
              ))
            ) : (
              <li className="p-2">No conversation history available.</li>
            )}
          </ul>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="relative">
          {/* Hamburger Icon */}
          <button
            onClick={toggleSidebar}
            className="absolute z-10 p-2 text-white bg-green-700 rounded-md top-4 left-4 focus:outline-none"
          >
            &#9776;
          </button>
        </div>

        <div className="flex flex-col h-full">
          <div ref={cameraAndInterviewRef} className="flex" style={{ height: cameraAndInterviewHeight }}>
            {/* Camera Area */}
            <div className="relative flex-1 bg-gray-200 rounded-md">
              <video ref={videoRef} autoPlay className={`w-full h-full rounded-lg ${isCameraOn ? 'block' : 'hidden'}`}></video>
              {!isCameraOn && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-lg">
                  <div className="relative text-4xl font-bold">
                    <span className="text-black">Mayank Manchanda</span>
                  </div>
                </div>
              )}
              <button
                onClick={toggleCamera}
                className={`absolute bottom-4 left-4 p-2 rounded-full ${isCameraOn ? 'bg-red-600' : 'bg-green-600'}`}
              >
                {isCameraOn ? 'Turn Off Camera' : 'Turn On Camera'}
              </button>
            </div>

            {/* Interviewer Area */}
            <div className="relative flex items-center justify-center flex-1 h-full overflow-auto bg-gray-200">
          {(isGifVisible && !isListening) ? (
            <img
              src="interviewer1.gif" // Ensure this path is correct
              alt="Interviewer"
              height={200}
              width={200}
              className="object-contain max-w-full max-h-full"
            />
          ) : (
            <img
              src="interviewer1.png" // Ensure this path is correct
              alt="Interviewer"
              height={200}
              width={200}
              className="object-contain max-w-full max-h-full"
            />
          )}
        </div>
          </div>

          {/* Resizable Divider */}
          <div
            onMouseDown={handleCameraAndInterviewResizeMouseDown}
            className="w-full h-2 bg-gray-600 cursor-row-resize"
          ></div>

          {/* Response Area */}
          <div
            ref={responseAreaRef}
            className="relative flex-1 p-4 overflow-auto text-white rounded-lg shadow-md bg-zinc-900"
            style={{ height: responseAreaHeight }}
          >
            <div className="mb-4">
              <h3 className="text-3xl font-semibold text-gray-200">Current Message</h3>
              <br />
              <p className="p-3 mt-2 text-xl text-white break-words border border-gray-700 rounded-md">{transcript}</p>
            </div>
            <br />
            <div>
              <h3 className="text-3xl font-semibold text-gray-200">Response</h3>
              <br />
              <p className="p-3 mt-2 break-words border border-gray-700 rounded-md text-gray-50">
                {response}
              </p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="fixed flex justify-center w-full gap-4 bottom-4">
          <button
            onClick={startListening}
            className={`text-white border-2 rounded p-2 ${isListening ? 'border-green-600' : 'border-red-600'}`}
          >
            {isListening ? 'Listening...' : 'Start Listening'}
          </button>
          <button onClick={() => window.location.href = '/dashboard'} className="p-2 text-white bg-red-600 rounded">
            End Interview
          </button>
        </div>
      </div>
    </div>
  );
}

export default InterviewRoom;