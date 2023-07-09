import React, { useState } from "react";

// ** MUI Imports
import Typography from "@mui/material/Typography";
import { Box, Button, Card, CardContent } from "@mui/material";

// ** Components Imports
import ProgressBar from "src/components/ProgressBar";

// ** Image Imports
import DogImage from "src/images/dog.png";

interface DCardProps {
  question: string;
  selections: Array<string>;
}

const DCard: React.FC<DCardProps> = ({ question, selections }) => {
  return (
    <Box
      sx={{
        width: "400px",
        textAlign: "center",
        transition: "transform 0.3s ease-in-out",
        transform: "translateX(0)",
      }}
    >
      <Typography variant="h5">{question}</Typography>
      <Box>
        <img src={DogImage.src} style={{ width: "300px" }} alt="Dog" />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 5 }}>
        {selections.map((selection, index) => (
          <Button key={index} variant="contained">
            {selection}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

interface CardSlidesProps {
  data: { question: string; selections: Array<string> }[];
}

const CardSlides: React.FC<CardSlidesProps> = ({ data }) => {
  const [visibleCardIndex, setVisibleCardIndex] = useState(0);

  const handleNextCard = () => {
    setVisibleCardIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  return (
    <div style={{ width: "300px", overflow: "hidden" }}>
      <Box
        sx={{
          display: "flex",
          transform: `translateX(-${visibleCardIndex * 300}px)`,
          transition: "transform 0.3s ease-in-out",
        }}
      >
        {data.map((info, index) => (
          <DCard
            key={index}
            question={info.question}
            selections={info.selections}
          />
        ))}
      </Box>
    </div>
  );
};

const DiagnosticSection: React.FC = () => {
  const data = [
    { question: "A질병", selections: ["선택1", "선택2"] },
    { question: "B질병", selections: ["선택1", "선택2"] },
    { question: "C질병", selections: ["선택1", "선택2"] },
  ];

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
      <Box sx={{ width: "300px", marginBottom: "12px" }}>
        abc
        <ProgressBar value={50} />
      </Box>
      <Card sx={{ borderRadius: "30px" }}>
        <CardContent
          sx={{
            padding: "30px",
          }}
        >
          <CardSlides data={data} />
        </CardContent>
      </Card>

      <Box
        sx={{
          marginTop: "50px",
          display: "flex",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <Button>홈으로</Button>
        <Button>이전으로</Button>
      </Box>
    </div>
  );
};

export default DiagnosticSection;
