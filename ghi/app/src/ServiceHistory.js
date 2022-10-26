import React, { useState, useEffect } from "react";

const ServiceHistory = () => {
	const [appointments, setAppointments] = useState([]);
	const [searchVin, setSearchVin] = useState("");
	const [searchSuccessful, setSearchSuccessful] = useState(false);

	// useEffect(() => {
	// 	const fetchAppointments = async () => {
	// 		const url = "http://localhost:8080/api/appointments/";
	// 		const response = await fetch(url);

	// 		if (response.ok) {
	// 			const data = await response.json();
	// 			console.log(data);
	// 			setAppointments(data.appointments);
	// 		}
	// 	};
	// 	fetchAppointments();
	// 	// setLoaded(true);
	// }, []);

	const handleSearch = async (event) => {
		const data = { searchVin };
		const vin = data.searchVin;
		// console.log(vin);

		const searchUrl = `http://localhost:8080/api/appointments/${vin}/`;
		const searchResponse = await fetch(searchUrl);
		// console.log(searchResponse);
		if (searchResponse.ok) {
			const searchData = await searchResponse.json();
			console.log(searchData);
			setAppointments(searchData);
			// console.log(appointments);
			setSearchSuccessful(true);
		} else {
			console.error("Invalid response");
		}
	};

	return (
		<React.Fragment>
			<div className="px-4 py-5 my-1 mt-0 text-center">
				<h1 className="display-5">Service Appointment History</h1>
			</div>
			<div className="row height d-flex justify-content-center align-items-center">
				<div className="col-md-auto">
					<div className="input-group mb-2">
						<input
							type="text"
							value={searchVin}
							onChange={(e) => setSearchVin(e.target.value)}
						/>
						<button
							onClick={handleSearch}
							type="button"
							className="btn btn-outline-secondary">
							Search VIN
						</button>
					</div>
				</div>
			</div>
			{appointments.length > 0 && (
				<table className="table table-striped">
					<thead>
						<tr>
							<th>Owner</th>
							<th>Vin</th>
							<th>Date</th>
							<th>Time</th>
							<th>Technician</th>
							<th>Reason</th>
							<th>Finished</th>
						</tr>
					</thead>
					<tbody>
						{appointments.map((appointment) => {
							return (
								<tr key={appointment.id}>
									<td>{appointment.owner}</td>
									<td>{appointment.vin}</td>
									<td>
										{new Date(appointment.date_time).toLocaleDateString(
											"en-US"
										)}
									</td>
									<td>
										{new Date(appointment.date_time).toLocaleTimeString([], {
											hour: "2-digit",
											minute: "2-digit",
										})}
									</td>
									<td>{appointment.technician.name}</td>
									<td>{appointment.reason}</td>
									<td>{appointment.finished ? "Yes" : "No"} </td>
								</tr>
							);
						})}
					</tbody>
				</table>
			)}
			{searchSuccessful && appointments.length <= 0 && (
				<div className="alert alert-danger mb-0 p-4 mt-4" id="danger-message">
					The VIN you entered has no appointment history.
				</div>
			)}
		</React.Fragment>
	);
};

export default ServiceHistory;
