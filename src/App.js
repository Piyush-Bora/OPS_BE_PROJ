import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartTest from "./StartTest";
import ExamComponent from "./ExamComponent";
import "./App.css";
import { AdminDashboard } from "./AdminPages/AdminDashboard";
import AddMCQSection from "./AdminPages/AddMCQSection";
import { AddSubjectiveSection } from "./AdminPages/AddSubjectiveSection";
import { CreateTestForm } from "./AdminPages/CreateTestForm";
import Login from "./features/auth/Login";
import ShowCreatedTests from "./AdminPages/ShowCreatedTests";
import RegistrationForm from "./features/auth/RegistrationForm";
import UpdateMcq from "./AdminPages/UpdateMCQs";
import Test from "./UserPages/Test";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<RegistrationForm />} />
				<Route path='/startTest' element={<StartTest />} />
				<Route path='/test' element={<Test />} />
				<Route path='/createTest' element={<CreateTestForm />} />
				<Route path='/test' element={<ExamComponent />} />
				<Route path='/admin.dashboard/' element={<AdminDashboard />}>
					<Route index element={<ShowCreatedTests />} />
					<Route path='addMcq/:testid' element={<AddMCQSection />} />
					<Route path='updateMcq/:testid' element={<UpdateMcq />} />
					<Route path='subq' element={<AddSubjectiveSection />} />
					<Route path='createTest' element={<CreateTestForm />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
