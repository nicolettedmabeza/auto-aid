import { useState, useEffect } from "react";

const AppointmentsList = () => {
	const [appointments, setAppointments] = useState([]);

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

	const deleteAppointment = async (id) => {
		const appointmentUrl = `http://localhost:8080/api/appointments/detail/${id}/`;
		const fetchConfig = {
			method: "delete",
			headers: {
				"Content-Type": "application/json",
			},
		};

		const response = await fetch(appointmentUrl, fetchConfig);
		if (response.ok) {
			window.location.reload();
		}
	};

	const finishAppointment = async (id) => {
		const appointmentUrl = `http://localhost:8080/api/appointments/detail/${id}/`;
		const fetchConfig = {
			method: "put",
			body: JSON.stringify({ finished: true }),
			headers: {
				"Content-Type": "application/json",
			},
		};

		const response = await fetch(appointmentUrl, fetchConfig);
		if (response.ok) {
			window.location.reload();
		}
	};

	return (
		<>
			<div className="px-4 py-5 my-1 mt-0 text-center">
				<h1 className="display-5">Appointment List</h1>
			</div>
			<table className="table table-striped">
				<thead>
					<tr>
						<th>Owner</th>
						<th>Vin</th>
						<th>Date</th>
						<th>Time</th>
						<th>Technician</th>
						<th>Reason</th>
						<th>Vip</th>
					</tr>
				</thead>
				<tbody>
					{appointments.map((appointment) => {
						if (!(appointment.finished)) {
						return (
							<tr key={appointment.id}>
								<td>{appointment.owner}</td>
								<td>{appointment.vin}</td>
								<td>
									{new Date(appointment.date_time).toLocaleDateString("en-US")}
								</td>
								<td>
									{new Date(appointment.date_time).toLocaleTimeString([], {
										hour: "2-digit",
										minute: "2-digit",
									})}
								</td>
								<td>{appointment.technician.name}</td>
								<td>{appointment.reason}</td>
								<td>{appointment.vip ? "Yes" : "No"}</td>
								<td>
									<button
										onClick={(e) => deleteAppointment(appointment.id)}
										className="btn btn-secondary m-2">
										Delete
									</button>

										<button
											onClick={(e) => finishAppointment(appointment.id)}
											className="btn btn-primary">
											Finished
										</button>

								</td>
							</tr>
						)};
					})}
				</tbody>
			</table>
		</>
	);
};

export default AppointmentsList;
