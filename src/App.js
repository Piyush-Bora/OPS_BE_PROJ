import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartTest from "./StartTest";
import ExamComponent from "./ExamComponent";
import "./App.css";
import { AdminDashboard } from "./AdminPages/AdminDashboard";
import AddMCQSection from "./AdminPages/MCQs/AddMCQSection";
import AddSubjectiveSection from "./AdminPages/Subjectives/AddSubjectiveSection";
import { CreateTestForm } from "./AdminPages/CreateTestForm";
import Login from "./features/auth/Login";
import ShowCreatedTests from "./AdminPages/ShowCreatedTests";
import RegistrationForm from "./features/auth/RegistrationForm";
import UpdateMcq from "./AdminPages/MCQs/UpdateMCQs";
import Test from "./UserPages/Test";
import UpdateSub from "./AdminPages/Subjectives/UpdateSub";
import GeneralDashBoard from './AdminPages/GeneralDashBoard';

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
					<Route path='updateSub/:testid' element={<UpdateSub />} />
					<Route path='addSub/:testid' element={<AddSubjectiveSection />} />
					<Route path='createTest' element={<CreateTestForm />} />
					<Route path='generalDashboard' element={<GeneralDashBoard />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
