// import { Button, Container, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import screenfull from "screenfull";

const StartTest = () => {
  const navigate = useNavigate();

  const handleStartTestClick = () => {
    screenfull.request();
    navigate("/test");
  };

  useEffect(() => {
    const extensionId = "mbdgaedkjlhmhbcaecmnahpoaagfbacj"; // Replace with the actual extension ID
    const resourceUrl = `chrome-extension://${extensionId}/options.html`;

    fetch(resourceUrl)
      .then(() => {
        console.log("Custom extension detected");
      })
      .catch(() => {
        console.log("Custom extension not detected");
      });
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <button size="large" variant="contained" onClick={handleStartTestClick}>
          Start Test
        </button>
      </div>
    </div>
  );
};

export default StartTest;
