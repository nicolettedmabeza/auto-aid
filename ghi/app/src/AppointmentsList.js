import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/free-regular-svg-icons";

const AppointmentsList = () => {
	const [appointments, setAppointments] = useState([]);

	useEffect(() => {
		const fetchAppointments = async () => {
			const url = "http://localhost:8080/api/appointments/";
			const response = await fetch(url);

			if (response.ok) {
				const data = await response.json();
				console.log(data);
				setAppointments(data.appointments);
			}
		};
		fetchAppointments();
	}, []);

	const deleteAppointment = async (id) => {
		const appointmentUrl = `http://localhost:8080/api/appointments/${id}/`;
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
		const appointmentUrl = `http://localhost:8080/api/appointments/${id}/`;
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

	// const handleSubmit = async (event) => {
	// 	event.preventDefault();
	// 	const data = { name, email, selectedConference };
	// 	data.conference = data.selectedConference;

	// 	delete data.selectedConference;

	// 	console.log(data);

	// 	const attendeeUrl = "http://localhost:8001/api/attendees/";
	// 	const fetchConfig = {
	// 		method: "post",
	// 		body: JSON.stringify(data),
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 	};

	// 	const response = await fetch(attendeeUrl, fetchConfig);
	// 	if (response.ok) {
	// 		const newAttendee = await response.json();
	// 		console.log(newAttendee);

	// 		setNames("");
	// 		setEmails("");
	// 		setSelectedConference("");
	// 		setSubmitted(true);
	// 	}
	// };

	return (
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
							<td>
								{appointment.vip ? (
									<FontAwesomeIcon icon="fa-solid fa-star" />
								) : (
									<FontAwesomeIcon icon="fa-regular fa-star" />
								)}
							</td>
							<td>
								<button
									onClick={(e) => deleteAppointment(appointment.id)}
									className="btn btn-secondary m-2">
									Delete
								</button>
								{!appointment.finished && (
									<button
										onClick={(e) => finishAppointment(appointment.id)}
										className="btn btn-primary">
										Finished
									</button>
								)}
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default AppointmentsList;
