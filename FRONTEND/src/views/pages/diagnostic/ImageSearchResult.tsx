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

type Prop = {
  diagnosticResults: Array<diagnositcResultType>;
};

const Detail = ({ diagnosticResults }: Prop) => {
  useEffect(() => {
    console.log(diagnosticResults);
  }, [diagnosticResults]);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      <ul>
        {diagnosticResults.map((diagnosticResult: diagnositcResultType) => (
          <li>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <img src={diagnosticResult.imageUrl} alt="" width="30px" />
              <div>dfs</div>
            </Box>
          </li>
        ))}
      </ul>
      
    </div>
  );
};

const Preview = ({ diagnosticResults }: Prop) => {
  return (
    <div>
      <img src={Success.src} height={"150px"} width={"150px"} />
      <Typography variant="h6">모두 정상입니다!</Typography>
    </div>
  );
};

const ImageSearchResult = ({ diagnosticResults }: Prop) => {
  const [detailed, setDetailed] = useState<boolean>(false);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "30px",
        height: "100%",
      }}
    >
      {detailed ? (
        <>
          <Detail diagnosticResults={diagnosticResults} />
          <Button onClick={() => {setDetailed(false)}}>돌아가기</Button>
        </>
        
      ) : (
        <>
          <Preview diagnosticResults={diagnosticResults} />
          <Button onClick={() => {setDetailed(true)}}>자세히 보기</Button>
        </>
        
      )}
      
    </Box>
  );
};

export default ImageSearchResult;
