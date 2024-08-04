import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const CameraCapture = ({ onCapture, onCancel }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCaptured, setIsCaptured] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing the camera: ", err);
    }
  };

  const capturePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext('2d');
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      const imageUrl = canvasRef.current.toDataURL('image/png');
      setIsCaptured(true);
      onCapture(imageUrl);
      stopCamera(); // Stop the camera after capturing the photo
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();

      tracks.forEach(track => {
        track.stop();
      });

      videoRef.current.srcObject = null;
    }
  };

  const handleCancel = () => {
    stopCamera();
    onCancel();
  };

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-96 h-96">
        <div
          onClick={handleCancel}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 cursor-pointer"
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </div>
        <video ref={videoRef} autoPlay className="w-full h-full" />
        <canvas ref={canvasRef} width="400" height="400" className="hidden" />
        <button
          onClick={capturePhoto}
          className="absolute bottom-3 left-1/2 transform -translate-x-1/2 p-2 bg-violet-400 text-white rounded-lg hover:bg-violet-600"
        >
          Capture
        </button>
      </div>
    </div>
  );
};

export default CameraCapture;
