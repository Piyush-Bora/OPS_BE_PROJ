import { Button, Container, Stack } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import screenfull from "screenfull";

const StartTest = () => {
  const navigate = useNavigate();

  const handleStartTestClick = () => {
    screenfull.request();
    navigate("/test");
  };

  return (
    <Container
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Button size="large" variant="contained" onClick={handleStartTestClick}>
          Start Test
        </Button>
      </Stack>
    </Container>
  );
};

export default StartTest;
