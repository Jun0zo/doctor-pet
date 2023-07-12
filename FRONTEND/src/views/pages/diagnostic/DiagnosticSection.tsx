import React, {
  useState,
  Dispatch,
  SetStateAction,
  useRef,
  useEffect,
} from "react";
import { useRouter } from "next/router";

// ** MUI Imports
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Fade,
  IconButton,
  Stack
} from "@mui/material";

// ** Icons Imports
import PinDropIcon from '@mui/icons-material/PinDrop';

// ** View Imports
import ImageSearchResult from "./ImageSearchResult";
import HospitalSearchResult from "./HospitalSearchResult";

// ** Components Imports
import ProgressBar from "src/components/ProgressBar";
import DragDropFile from "src/views/pages/diagnostic/DragDropFile";

// ** Types Imports
import diagnositcResultType from "src/@types/diagnositcResult";
import hospitalSearchResultType from "src/@types/hospitalSearchResultType";

// ** Image Imports
import DogImage from "src/images/dog.png";
import DiagnosticLoadingImage from "src/images/ai-eye.gif";
import SearchLoadingImage from "src/images/search.gif";
import Success from "src/images/success.gif";

// ** Third Party
import axios from 'axios';

const CaptureContent = () => {
  // return <WebcamSnapshot />;
  // return <DragDropFile />;
};

const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      const base64 = base64String.split(',')[1];
      resolve(base64);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
};

const sendImage = (base64: string): Promise<string> => {
  const url = 'YOUR_ENDPOINT_URL'; // Replace with your actual endpoint URL
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const data = {
    image: base64,
  };

  return axios.post(url, data, config)
    .then(response => {
      return response.data.result;
    })
    .catch(error => {
      console.error('Error sending image:', error);
      return 'error';
    });
};

const DiagnosticSection = () => {
  // router
  const router = useRouter();

  // hooks
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [diagnosticResults, setDiagnositcResults] = useState<
    Array<diagnositcResultType>
  >([]);
  const [hospitalSearchResult, setHospitalSearchResult] =
    useState<hospitalSearchResultType>({
      hospitalName: "",
      distance: -1,
      datetime: new Date(),
    });

  const [] = useState();

  useEffect(() => {
    setStep(5);
    // gps loading
  }, []);

  const fetchImages = async (_files: File[]) => {
    let diagnositcResult: diagnositcResultType[] = [];
    if (_files && _files.length > 0) {
      const files = Array.from(_files) as File[];

      const base64Results = [] 
      for (const file of files) {
        // Convert to Base64
        const base64 = await convertToBase64(file);
        base64Results.push(base64)
        // diagnositcResult.push({ imageUrl: base64, result });
      }

      // const result = await sendImage(base64Results);

      axios.post('/upload', {image: base64Results}, {headers: {
        'Content-Type': 'application/json',
      },})
        .then(response => {
          response.data.result.map((result:diagnositcResultType)  => {
              
              const decodedString = atob(result.image);
              const url = decodeURIComponent(decodedString);
              result.image
            }
          )
          setDiagnositcResults(response.data.result);
        })
        .catch(error => {
          console.error('Error sending image:', error);
          return 'error';
        });
      }
    return diagnositcResult;
  };

  const requestFile = async (files: any) => {
    setLoading(true);
    setStep(2);
    setTimeout(async() => {
      setLoading(false);
      const results: diagnositcResultType[] = await fetchImages(files);
      setDiagnositcResults(results);
    }, 5000);
  };

  const searchHospitals = (
    isRetry = false,
    _date = new Date(),
    fixHospital = false,
    fixDate = false,
    fixHour = false
  ) => {
    if (isRetry) {
      setLoading(true);
    }
    // 병원 선택
    const hospitals = ["A병원", "B병원", "C병원"];
    let randomIndex = Math.floor(Math.random() * hospitals.length);
    let selectedHospital = "";
    if (!fixHospital) {
      selectedHospital = hospitals[randomIndex];
    } else {
      selectedHospital = hospitals[randomIndex];
    }

    // 날짜 및 시간 선택
    const selectedDate = _date;

    if (!fixDate) {
      const date = selectedDate.getDate();
      const addDate = Math.floor(Math.random() * 7) + 1;
      selectedDate.setDate(date + addDate);
    }
    if (!fixHour) {
      const randomHour = Math.floor(Math.random() * 8) + 9;
      selectedDate.setHours(randomHour, 0, 0);
    }

    // return [randomHospital, reservationDate];

    setTimeout(() => {
      
      setLoading(false);
      setHospitalSearchResult({
        hospitalName: selectedHospital,
        distance: 32,
        datetime: selectedDate,
      });
    }, 5000);
  };

  const reservateHospital = () => {
    setTimeout(() => {
      setLoading(false);
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
              height: "400px",
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
                  <Box sx={{ height: "100%", textAlign: "center" }}>
                    <img src={DiagnosticLoadingImage.src} width={"100%"} />
                    <Typography variant="h6">분석중</Typography>
                  </Box>
                </Fade>
              ) : (
                <Fade in={step === 2 && !loading} timeout={2000}>
                  <ImageSearchResult diagnosticResults={diagnosticResults} />
                </Fade>
              ))}
            {step === 3 && (
              <Box sx={{ height: "100%" }}>
                <img src={DiagnosticLoadingImage.src} width={"100%"} />
                <Typography variant="h6">가까운 병원에 예약할까요?</Typography>
                <p>
                  AI가 병원의 스케쥴을 고려하여 최적의 병원과 예약시간을
                  잡아줘요!
                </p>
              </Box>
            )}
            {step === 4 &&
              (loading ? (
                <Fade in={step === 4 && loading} timeout={2000}>
                  <Box sx={{ height: "100%", textAlign: "center" }}>
                    <img src={SearchLoadingImage.src} width={"100%"} />
                    <Typography variant="h6">근처 병원 검색 중...</Typography>
                  </Box>
                </Fade>
              ) : (
                <Fade in={step === 4 && !loading} timeout={2000}>
                  <HospitalSearchResult
                    hospitalSearchResult={hospitalSearchResult}
                    searchHospitals={searchHospitals}
                  />
                </Fade>
              ))}
            {step === 5 &&
              (loading ? (
                <Fade in={step === 5 && loading} timeout={2000}>
                  <Box sx={{ height: "100%", textAlign: "center" }}>
                    <img src={SearchLoadingImage.src} width={"100%"} />
                    <Typography variant="h6">해당 병원 예약 중...</Typography>
                  </Box>
                </Fade>
              ) : (
                <Fade in={step === 5 && !loading} timeout={2000}>
                  <Box sx={{display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "30px",
                          height: "100%",}}>
                    <img src={Success.src} height={"150px"} width={"150px"} />
                    <Typography variant="h5">예약을 완료했어요!</Typography>
                    
                    <Stack direction="row" spacing={1}>
                      <IconButton aria-label="delete">
                        <PinDropIcon />
                      </IconButton>
                      <IconButton color="secondary" aria-label="add an alarm">
                        <PinDropIcon />
                      </IconButton>
                    </Stack>
                  </Box>
                </Fade>
              ))}
              {step === 6 &&
              (
                <Fade in={step === 6} timeout={2000}>
                  <Box sx={{display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "30px",
                          height: "100%",}}>
                    <img src={Success.src} height={"150px"} width={"150px"} />
                    <Typography variant="h5">캘린더에 저장할까요?</Typography>
                  </Box>
                </Fade>
              )}
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
          {step === 2 && !loading && (
            <>
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  setLoading(true);
                  setStep((step) => step + 1);
                }}
              >
                다음으로
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  setStep(1);
                }}
              >
                다시촬영
              </Button>
            </>
          )}

          {step === 3 && (
            <>
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  setLoading(true);
                  setStep((step) => step + 1);
                  searchHospitals();
                }}
              >
                예약하기
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  setStep(1);
                }}
              >
                다시촬영
              </Button>
            </>
          )}

          {step === 4 && !loading && (
            <>
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  setLoading(true);
                  setStep((step) => step + 1);
                  reservateHospital();
                }}
              >
                예약하기
              </Button>
            </>
          )}

          <Button
            variant="contained"
            color="error"
            onClick={() => {
              router.push("/home");
            }}
          >
            홈으로 {loading.toString()}
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default DiagnosticSection;
