import React, {
  useState,
  Dispatch,
  SetStateAction,
  useRef,
  useEffect,
} from "react";

// ** MUI Imports
import { Box, Typography, Button } from "@mui/material";

// ** Types Imports
import diagnositcResultType from "src/@types/diagnositcResult";

// ** Image Imports
import Success from "src/images/success.gif";
import Fail from "src/images/fail.gif";
import { set } from "nprogress";

type Prop = {
  diagnosticResults: Array<diagnositcResultType>;
  isDetected: boolean,
  setIsDetected: Dispatch<SetStateAction<boolean>>;
};

type PreviewProp = {
  diagnosticResults: Array<diagnositcResultType>;
  isDetected: boolean,
  totalLength: number;
};

type DetailProp = {
  diagnosticResults: Array<diagnositcResultType>;
  setPageMode: Dispatch<SetStateAction<"preview" | "detail" | "more-detail">>;
  setSelectedDetail: Dispatch<SetStateAction<diagnositcResultType | null>>;
};

type MoreDetailProp = {
  selectedDetail: diagnositcResultType | null;
}

const Detail = ({ diagnosticResults, setPageMode, setSelectedDetail }: DetailProp) => {
  const [hovering, setHovering] = useState(-1);

  useEffect(() => {
    console.log(diagnosticResults);
  }, [diagnosticResults]);
  return (
    <div
      style={{
        width: "100%",
        height: "90%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      <ul style={{ overflowY: "scroll", height: "80%" }}>
        {diagnosticResults.map((diagnosticResult: diagnositcResultType, index: number) =>
          diagnosticResult.disease_detected ? (
            <li
              onMouseOver={() => setHovering(index)}
              onMouseOut={() => setHovering(-1)}
              onClick={() => {
                setSelectedDetail(diagnosticResult);
                setPageMode('more-detail');
              }}
              style={
                hovering === index ? { backgroundColor: "#e7e7e7", cursor: "pointer" } : {}
              }
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  padding:"10px"
                }}
              >
                <img src={"https://220.68.27.149:8000/" + diagnosticResult.image_url} alt="" width="100px" height="100px" />
                <Typography>
                  {`${diagnosticResult.disease_name}${(diagnosticResult.disease_probability)*100}%`}
                </Typography>
              </Box>
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
};

const Preview = ({ diagnosticResults, isDetected, totalLength }: PreviewProp) => {
  return (
    <div>
      {!isDetected ? (
        <>
          <img src={Success.src} height={"150px"} width={"150px"} />
          <Typography variant="h6">모두 정상입니다!</Typography>
        </>
      ) : (
        <Box sx={{ textAlign: "center" }}>
          <img src={Fail.src} height={"150px"} width={"150px"} />
          <Typography variant="h6">
            {totalLength} 중 {diagnosticResults.length}개의 사진에서 질병이
            검출되었습니다!
          </Typography>
        </Box>
      )}
    </div>
  );
};

const MoreDetail = ({ selectedDetail }: MoreDetailProp) => {
  return (
    <>
      <img src={"https://220.68.27.149:8000/" + selectedDetail?.image_url} width={"200px"}></img>
      <div>
        <Typography>{selectedDetail?.disease_name} </Typography>
        <Typography>{selectedDetail?.disease_probability} 이란?</Typography>
        <Typography>설명</Typography>
      </div>
    </>
  )
}

const ImageSearchResult = ({ diagnosticResults, isDetected, setIsDetected }: Prop) => {
  const [pageMode, setPageMode] = useState<"preview" | "detail" | "more-detail">("preview");
  const [selectedDetail, setSelectedDetail] = useState<diagnositcResultType | null>(null);
  const [detectedResults, setDetectedResults] = useState<
    diagnositcResultType[]
  >([]);

  useEffect(() => {
    console.log(diagnosticResults);
    const detected = diagnosticResults.filter(
      (result: diagnositcResultType) => result.disease_detected
    );
    setDetectedResults(detected);

    console.log(detected.length)
    if (detected.length) setIsDetected(true);
    else setIsDetected(false);
  }, [diagnosticResults]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
      }}
    >
      {pageMode === 'detail' &&
        <>
          <Detail diagnosticResults={detectedResults} setPageMode={setPageMode} setSelectedDetail={setSelectedDetail} />
          <Button
            onClick={() => {
              setPageMode('preview');
            }}
          >
            돌아가기
          </Button>
        </>
      }
      { pageMode === 'preview' &&
        <>
          <Preview
            isDetected={isDetected}
            diagnosticResults={detectedResults}
            totalLength={diagnosticResults.length}
          />
          {detectedResults.length ? (
            <Button
              onClick={() => {
                setPageMode('detail');
              }}
            >
              자세히보기
            </Button>
          ) : null}
        </>
      }
      { pageMode === 'more-detail' &&
        <>
          <MoreDetail
            selectedDetail={selectedDetail}
          />
          {detectedResults.length ? (
            <Button
              onClick={() => {
                setPageMode('detail');
              }}
            >
              돌아가기
            </Button>
          ) : null}
        </>
      }
    </Box>
  );
};

export default ImageSearchResult;
