import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const FaceCapture = ({setImageUrl, setIsFaceVerified}) => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionMessage, setDetectionMessage] = useState(''); 
  const [isVerified, setIsVerified] = useState(false);
  const [showModal, setShowModal] = useState(false); 

  const captureImage = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
      setIsVerified(false);
    }
  };

  const retakeImage = () => {
    setCapturedImage(null);
    setShowModal(false);
    setIsVerified(false);
  };

  const verifyFace = async () => {
    if (!capturedImage) return;

    setIsDetecting(true);

    try {
      const byteString = atob(capturedImage.split(',')[1]);
      const mimeString = capturedImage.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });

      const formData = new FormData();
      formData.append('file', blob, 'captured_face.jpg');

      const res = await axios.post('https://face-detection-c8td.onrender.com/count_faces', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Server Response:', res.data);

      if (res.data.result) {
        setIsFaceVerified(true);
        setImageUrl(res.data.image_url);
        setDetectionMessage('Face verified successfully.');
        setIsVerified(true);
      } else {
        setDetectionMessage('No face detected. Please retake the photo.');
        setIsVerified(false);
      }
    } catch (error) {
      console.error('Face verification failed:', error);
      setDetectionMessage('Error verifying face. Please try again.');
      setIsVerified(false);
    }

    setIsDetecting(false);
    setShowModal(true);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-4">Capture Your Face</h2>
        
        {!capturedImage ? (
          <div className="flex flex-col items-center">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="rounded-lg mb-4 w-full"
              videoConstraints={{ facingMode: "user" }}
              style={{ transform: 'scaleX(-1)' }} 
            />

            <button
              onClick={captureImage}
              className="bg-blue-500 text-white py-2 px-4 rounded-md w-full hover:bg-blue-600 transition duration-200"
            >
              Capture Photo
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <img src={capturedImage} alt="Captured face" className="rounded-lg mb-4 w-full object-cover" style={{ transform: 'scaleX(-1)' }} />
            
            <div className="flex gap-4 w-full">
              <button
                onClick={retakeImage}
                className="bg-yellow-500 text-white py-2 px-4 rounded-md flex-1 hover:bg-yellow-600 transition duration-200"
              >
                Retake Photo
              </button>
              
              <button
                onClick={verifyFace}
                className="bg-blue-500 text-white py-2 px-4 rounded-md flex-1 hover:bg-blue-600 transition duration-200"
              >
                Verify Face
              </button>
            </div>
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg text-center">
              <h3 className="text-xl font-bold mb-4">{isDetecting ? 'Processing...' : 'Verification Complete'}</h3>
              <p>{detectionMessage}</p>
              {!isDetecting && (
                <div className="mt-4">
                  {detectionMessage === 'Face verified successfully.' ? (
                    <button
                      onClick={() => setShowModal(false)}
                      className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
                    >
                      Close
                    </button>
                  ) : (
                    <button
                      onClick={retakeImage}
                      className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition duration-200"
                    >
                      Retake Photo
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FaceCapture;
