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
import CustomerForm from './CustomerForm';
import SalesList from './SalesList';
import SalesPersonForm from './SalesPersonForm';
import SalesRecordForm from './SalesRecordForm';
import SalesHistoryList from './SalesHistoryList';
import AutomobileForm from './AutomobileForm';
import AutomobileList from './AutomobileList';

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
					<Route path="/salespeople/new" element={<SalesPersonForm />} />
					<Route path="/customers/new" element={<CustomerForm />} />
					<Route path="/sales/list" element={<SalesList />} />
					<Route path="/sales/new" element={<SalesRecordForm />} />
					<Route path="/sales/history" element={<SalesHistoryList />} />
					<Route path="/automobiles/" element={<AutomobileList />} />
					<Route path="/automobiles/new" element={<AutomobileForm />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
