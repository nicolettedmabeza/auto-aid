import React, { useState, useEffect } from "react";

const ServiceHistory = () => {
	const [appointments, setAppointments] = useState([]);
	const [filtered, setFiltered] = useState([]);
	const [searchVin, setSearchVin] = useState("");
	const [submitted, setSubmitted] = useState(false);

	useEffect(() => {
		const fetchAppointments = async () => {
			const url = "http://localhost:8080/api/appointments/";
			const response = await fetch(url);

			if (response.ok) {
				const data = await response.json();
				setAppointments(data.appointments);
			}
		};
		fetchAppointments();
	}, []);

	const handleSearch = async (event) => {
		const results = appointments.filter((appointment) =>
			appointment.vin.includes(searchVin)
		);
		setFiltered(results);
		setSubmitted(true);
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
			{filtered.length > 0 && (
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
						{filtered.map((filter) => {
							return (
								<tr className="table-row" key={filter.id}>
									<td>{filter.owner}</td>
									<td>{filter.vin}</td>
									<td>
										{new Date(filter.date_time).toLocaleDateString("en-US")}
									</td>
									<td>
										{new Date(filter.date_time).toLocaleTimeString([], {
											hour: "2-digit",
											minute: "2-digit",
										})}
									</td>
									<td>{filter.technician.name}</td>
									<td>{filter.reason}</td>
									<td>{filter.finished ? "Yes" : "No"} </td>
								</tr>
							);
						})}
					</tbody>
				</table>
			)}
			{submitted && filtered.length === 0 && (
				<div className="alert alert-danger mb-0 p-4 mt-4" id="danger-message">
					The VIN you entered has no appointment history.
				</div>
			)}
		</React.Fragment>
	);
};

export default ServiceHistory;
