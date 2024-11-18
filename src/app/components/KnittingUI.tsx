'use client';
import React, { useEffect, useState, useRef } from 'react';

const KnittingUI = ({ togglePalette, selectedItems, isRecording, toggleRecording }) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [recordingProgress, setRecordingProgress] = useState(0); // Track progress
  const [isSaving, setIsSaving] = useState(false); // Track saving state
  const screenStreamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunks = useRef([]);
  const recordingIntervalRef = useRef(null); // Interval for tracking progress

  const totalRecordingTime = useRef(0); // Total duration of recording in seconds

  // Function to start recording the current screen
  const startScreenRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true }); // Capture the screen
      screenStreamRef.current = stream;

      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: 'video/webm',
      });

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunks.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'screen-recording.webm';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        setIsSaving(false);
      };

      mediaRecorderRef.current.start();
      toggleRecording(); // Update recording state to true
      startProgressTracking(); // Start tracking recording progress
    } catch (err) {
      console.error('Error starting screen recording:', err);
    }
  };

  // Function to stop the screen recording
  const stopScreenRecording = () => {
    mediaRecorderRef.current.stop();
    screenStreamRef.current.getTracks().forEach((track) => track.stop());
    toggleRecording(); // Update recording state to false
    clearInterval(recordingIntervalRef.current); // Stop progress tracking
    setRecordingProgress(100); // Set progress to 100% when recording stops
    setIsSaving(true); // Indicate saving state
  };

  // Function to track progress during recording
  const startProgressTracking = () => {
    totalRecordingTime.current = selectedItems.reduce((total, item) => total + item.time, 0);
    setRecordingProgress(0); // Reset progress at start

    recordingIntervalRef.current = setInterval(() => {
      setRecordingProgress((prevProgress) => {
        const newProgress = prevProgress + (100 / totalRecordingTime.current);
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 1000); // Update progress every second
  };

  // Handle switching between selected icons based on timer
  useEffect(() => {
    if (isRecording && selectedItems.length > 0) {
      const currentItem = selectedItems[activeItemIndex];
      
      const timer = setTimeout(() => {
        if (activeItemIndex < selectedItems.length - 1) {
          setActiveItemIndex(activeItemIndex + 1);
        } else {
          setActiveItemIndex(0); // Loop back to first item
        }
      }, currentItem.time * 1000);

      return () => clearTimeout(timer);
    } else {
      setActiveItemIndex(0);
    }
  }, [isRecording, activeItemIndex, selectedItems]);

  return (
    <div className="h-screen bg-white p-8">
      {/* Page Title Section */}
      <div className="flex flex-col mb-6">
        <h1 className="text-xl font-normal text-gray-900">Part 1</h1>
        <h2 className="text-3xl font-bold text-gray-700">The Needle</h2>
      </div>

      {/* Knitting Section */}
      <div className="bg-pink-100 rounded-lg p-8 mb-8 relative w-/5 h-3/5 mx-auto shadow-lg flex flex-col justify-between">
        <div>
          <h3 className="text-3xl font-bold mb-6 text-pink-800">Knitting Section</h3>
          <div className="flex justify-center mb-6">
            <div className="relative w-40 h-40 flex items-center justify-center">
              {isRecording && selectedItems[activeItemIndex] && (
                <div className={`w-full h-full flex items-center justify-center`}>
                  {selectedItems[activeItemIndex].icon}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Progress bar */}
     
        <div className="flex justify-center items-center space-x-4 mt-4">
          <button 
            onClick={isRecording ? stopScreenRecording : startScreenRecording}
            className={`w-12 h-12 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${isRecording ? 'bg-red-500' : 'bg-purple-600'}`}
            aria-label={isRecording ? "Stop recording" : "Start recording"}
            disabled={isSaving} // Disable the button while saving
          >
            {isRecording ? "🛑" : "🎤"}
          </button>

          {/* Toggle Palette */}
          <button 
            onClick={togglePalette} 
            className="text-5xl focus:outline-none"
            aria-label="Toggle Palette"
          >
            😊
          </button>
        </div>
      </div>

      {/* Parts grid */}
      <div className="grid grid-cols-4 gap-1 mt-8">
        {['The Yarn', 'The Needle', 'Knitting', 'Outcome'].map((text, index) => (
          <div key={index} className="flex flex-col items-start">
            <div className="bg-purple-200 p-6 h-32 w-64 flex items-center justify-center mb-2 shadow-md"></div>
            <div className="text-lg text-black text-left">Part {index + 1}</div>
            <div className="text-xl font-semibold text-black text-left">{text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KnittingUI;
