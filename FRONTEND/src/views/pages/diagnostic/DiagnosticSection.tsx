import React, { useState, Dispatch, SetStateAction } from "react";

// ** MUI Imports
import { Box, Button, Card, CardContent, Typography } from "@mui/material";

// ** Components Imports
import ProgressBar from "src/components/ProgressBar";

// ** Image Imports
import DogImage from "src/images/dog.png";

interface DCardProps {
  question: string;
  selections: Array<string>;

  handleNextCard: () => void;
}

const DCard: React.FC<DCardProps> = ({
  question,
  selections,
  handleNextCard,
}) => {
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 5,
          marginTop: "2rem",
        }}
      >
        {selections.map((selection, index) => (
          <Button key={index} variant="contained" onClick={handleNextCard}>
            {selection}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

interface CardSlidesProps {
  data: {
    question: string;
    selections: Array<string>;
  }[];
  visibleCardIndex: number;
  setVisibleCardIndex: Dispatch<SetStateAction<number>>;
}

const CardSlides: React.FC<CardSlidesProps> = ({
  data,
  visibleCardIndex,
  setVisibleCardIndex,
}) => {
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
            handleNextCard={handleNextCard}
          />
        ))}
      </Box>
    </div>
  );
};

const DiagnosticSection: React.FC = () => {
  const [visibleCardIndex, setVisibleCardIndex] = useState(0);

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
      <Box sx={{ width: "350px", marginBottom: "12px" }}>
        <Typography variant="h6" textAlign="center" mb="1rem">
          {visibleCardIndex + 1}/{data.length} 완료
        </Typography>
        <ProgressBar value={((visibleCardIndex + 1) / data.length) * 100} />
      </Box>
      <Card sx={{ borderRadius: "30px" }}>
        <CardContent
          sx={{
            padding: "30px",
          }}
        >
          <CardSlides
            data={data}
            visibleCardIndex={visibleCardIndex}
            setVisibleCardIndex={setVisibleCardIndex}
          />
        </CardContent>
      </Card>

      <Box
        sx={{
          width: "350px",
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
        <Button variant="contained" color="success">
          이전으로
        </Button>
      </Box>
    </div>
  );
};

export default DiagnosticSection;
