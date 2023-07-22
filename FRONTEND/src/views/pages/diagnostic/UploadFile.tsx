import React, { Dispatch, SetStateAction, useRef, useState, useEffect } from "react";
import {Button, Box} from "@mui/material";

function isMobileDevice() {
    return /Mobi|Android/i.test(window.navigator.userAgent);
  }

type TakePictureProp = {
  handleRequestFile: (files: any) => void;
  setFiles: any // Dispatch<SetStateAction<Blob[]>>;
};

const TakePicture = ({ handleRequestFile, setFiles }: TakePictureProp) => {
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
        .getUserMedia({ video: {
            facingMode: { exact: "environment" }, // This line selects the rear camera
          } })
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
    <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", alignContent:"center",}}>
      <div>
        <video
          ref={videoRef}
          style={{ width: "100%", maxWidth: "500px" }}
          autoPlay
        ></video>
      </div>
      <Box sx={{textAlign:"center"}}>
        <Button onClick={captureImage}>이미지 촬영</Button>
      </Box>
    </Box>
  );
};


type DragDropFileProp = {
  handleRequestFile: (files: any) => void;
  setFiles: Dispatch<SetStateAction<never[]>>;
};

function DragDropFile({ handleRequestFile }: DragDropFileProp) {
  // drag state
  const [dragActive, setDragActive] = useState(false);
  // ref
  const inputRef = useRef<HTMLInputElement>(null);

  // handle drag events
  const handleDrag = function (e: any) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      console.log(e.dataTransfer.files);
      handleRequestFile(e.dataTransfer.files);
    }
  };

  // triggers when file is selected with click
  const handleChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files);
      handleRequestFile(e.target.files);
    }
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <form
      id="form-file-upload"
      onDragEnter={handleDrag}
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        ref={inputRef}
        type="file"
        id="input-file-upload"
        multiple={true}
        onChange={handleChange}
      />
      <label
        id="label-file-upload"
        htmlFor="input-file-upload"
        className={dragActive ? "drag-active" : ""}
      >
        <div>
          <p>파일을 끌어오거나</p>
          <button className="upload-button" onClick={onButtonClick}>
            파일을 업로드 하세요
          </button>
        </div>
      </label>
      {dragActive && (
        <div
          id="drag-file-element"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        ></div>
      )}
    </form>
  );
}

type Prop = {
    handleRequestFile: (files: any) => void;
    setFiles: Dispatch<SetStateAction<never[]>>;
}

const UploadFile = ({handleRequestFile, setFiles} : Prop) => {
    const [isCamera, setIsCamera] = useState(isMobileDevice());
    return (
        <Box sx={{height:"100%", display:"flex", flexDirection:"column", justifyContent:"center", alignContent:"center", gap:"2px"}}>
            <Box sx={{height:"90%", display:"flex", alignContent:"center",}}>
                {isCamera ? 
                    <TakePicture handleRequestFile={handleRequestFile} setFiles={setFiles}/>
                    :<DragDropFile handleRequestFile={handleRequestFile} setFiles={setFiles}/>
                }
            </Box>
            <Box sx={{textAlign:"center"}}>
                <Button onClick={() => {setIsCamera(val => !val)}}>카메라로 전환</Button>
            </Box>
            
        </Box>
    )
}

export default UploadFile;