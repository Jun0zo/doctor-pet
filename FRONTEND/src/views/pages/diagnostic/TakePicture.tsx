import React, { Dispatch, SetStateAction, useRef, useState, useEffect } from "react";

type Prop = {
  handleRequestFile: (files: any) => void;
  setFiles: any // Dispatch<SetStateAction<Blob[]>>;
};

const TakePicture = ({ handleRequestFile, setFiles }: Prop) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    startCamera();

    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = () => {
    if (!stream) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          setStream(mediaStream);
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }
        })
        .catch((error) => {
          console.error("Error accessing camera:", error);
        });
    }
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (context && videoRef.current.videoWidth && videoRef.current.videoHeight) {
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvas.width,
          canvas.height
        );
        canvas.toBlob((blob) => {
          if (blob) {
            handleRequestFile([blob]);
            setFiles((prevFiles: any) => [...prevFiles, blob]);
          }
        }, "image/jpeg");
      }
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  return (
    <div>
      <div>
        <video
          ref={videoRef}
          style={{ width: "100%", maxWidth: "500px" }}
          autoPlay
        ></video>
      </div>
      <div>
        <button onClick={captureImage}>Capture Image</button>
      </div>
    </div>
  );
};

export default TakePicture;
