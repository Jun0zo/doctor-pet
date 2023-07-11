import React, {
  useState,
  Dispatch,
  SetStateAction,
  useRef,
  useEffect,
} from "react";

// ** MUI Imports
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Fade,
} from "@mui/material";

// ** View Imports
import ImageSearchResult from "./ImageSearchResult";

// ** Components Imports
import ProgressBar from "src/components/ProgressBar";
import DragDropFile from "src/views/pages/diagnostic/DragDropFile";

// ** Types Imports
import diagnositcResultType from "src/@types/diagnositcResult";

// ** Image Imports
import DogImage from "src/images/dog.png";
import LoadingImage from "src/images/ai-eye.gif";

// ** Third Party
import { FileUploader } from "react-drag-drop-files";

const CaptureContent = () => {
  // return <WebcamSnapshot />;
  // return <DragDropFile />;
};

const DiagnosticSection = () => {
  const [visibleCardIndex, setVisibleCardIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [diagnosticResults, setDiagnositcResults] = useState<
    Array<diagnositcResultType>
  >([]);

  useEffect(() => {
    setStep(1);
  }, []);

  const fetchImages = (_files: File[]) => {
    let diagnositcResult: diagnositcResultType[] = [];
    if (_files && _files.length > 0) {
      const files = Array.from(_files) as File[];

      diagnositcResult = files.map((file) => {
        // conver to imageURLs
        const imageUrl = URL.createObjectURL(file);

        // fetch
        const result = "ok";

        return { imageUrl, result };
      });
    }
    return diagnositcResult;
  };

  const requestFile = (files: any) => {
    setLoading(true);
    setStep(2);
    setTimeout(() => {
      setLoading(false);
      const results: diagnositcResultType[] = fetchImages(files);
      setDiagnositcResults(results);
    }, 5000);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box sx={{ width: "300px" }}>
        <Card sx={{ borderRadius: "30px" }}>
          <CardContent
            sx={{
              padding: "30px",
              height: "300px",
            }}
          >
            {step === 1 && (
              <Fade in={step === 1} timeout={2000}>
                <Box sx={{ height: "100%" }}>
                  <DragDropFile
                    handleRequestFile={requestFile}
                    setFiles={setFiles}
                  />
                </Box>
              </Fade>
            )}
            {step === 2 &&
              (loading ? (
                <Fade in={step === 2 && loading} timeout={2000}>
                  <Box sx={{ height: "100%", backgroundColor: "blue" }}>
                    <img src={LoadingImage.src} height={"100%"} />
                  </Box>
                </Fade>
              ) : (
                <Fade in={step === 2 && !loading} timeout={2000}>
                  <ImageSearchResult diagnosticResults={diagnosticResults} />
                </Fade>
              ))}
          </CardContent>
        </Card>

        <Box
          sx={{
            width: "100%",
            marginTop: "50px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 5,
          }}
        >
          <Button variant="contained" color="error">
            홈으로
          </Button>
          {/* <Button variant="contained" color="success">
          이전으로
        </Button> */}
        </Box>
      </Box>
    </div>
  );
};

export default DiagnosticSection;
