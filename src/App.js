import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartTest from "./StartTest";
import ExamComponent from "./ExamComponent";
import "./App.css";
import { AdminDashboard } from "./AdminDashboard";
import { AddMCQSection } from "./AdminPages/AddMCQSection";
import { AddSubjectiveSection } from "./AdminPages/AddSubjectiveSection";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/start' element={<StartTest />} />
        <Route path='/createTest' element={<StartTest />} />
        <Route path='/test' element={<ExamComponent />} />
        <Route path='/admin.dashboard/:testid' element={<AdminDashboard />}>
          <Route index element={<AddMCQSection />} />
          <Route path='subq' element={<AddSubjectiveSection />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
