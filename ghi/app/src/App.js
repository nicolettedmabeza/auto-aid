import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppointmentForm from "./AppointmentForm";
import AppointmentsList from "./AppointmentsList";
import MainPage from "./MainPage";
import ManufacturerForm from "./ManufacturerForm";
import ManufacturerList from "./ManufacturerList";
import Nav from "./Nav";
import ServiceHistory from "./ServiceHistory";
import TechnicianForm from "./TechnicianForm";
import VehicleModelForm from "./VehicleModelForm";
import VehicleModelList from "./VehicleModelList";

function App() {
	return (
		<BrowserRouter>
			<Nav />
			<div className="container">
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="technicians/new/" element={<TechnicianForm />} />
					<Route path="appointments/">
						<Route path="" element={<AppointmentsList />} />
						<Route path="new/" element={<AppointmentForm />} />
						<Route path="history/" element={<ServiceHistory />} />
					</Route>
					<Route path="manufacturers/">
						<Route path="" element={<ManufacturerList />} />
						<Route path="new/" element={<ManufacturerForm />} />
					</Route>
					<Route path="models/">
						<Route path="" element={<VehicleModelList />} />
						<Route path="new/" element={<VehicleModelForm />} />
					</Route>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
