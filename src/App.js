import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartTest from "./StartTest";
import TestRoute from "./ExamComponent";
import "./App.css";
import Test from "./ExamComponent";
import { Container } from "@mui/material";

function App() {
  return (
    <Container
      style={{
        minHeight: "100vh",
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartTest />} />
          <Route path="/test" element={<TestRoute />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
