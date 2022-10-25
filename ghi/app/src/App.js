import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppointmentForm from "./AppointmentForm";
import MainPage from "./MainPage";
import Nav from "./Nav";
import TechnicianForm from "./TechnicianForm";

function App() {
	return (
		<BrowserRouter>
			<Nav />
			<div className="container">
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/technicians/new" element={<TechnicianForm />} />
					<Route path="/appointments/new" element={<AppointmentForm />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
