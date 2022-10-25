import { useEffect, useState } from "react";

const AppointmentForm = () => {
	const [vin, setVin] = useState("");
	const [owner, setOwner] = useState("");
	const [dateTime, setDateTime] = useState("");
	const [technicians, setTechnicians] = useState([]);
	const [selectedTechnician, setSelectedTechnician] = useState("");
	const [reason, setReason] = useState([]);
	const [submitted, setSubmitted] = useState(false);
	// const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const fetchTechnicians = async () => {
			const url = "http://localhost:8080/api/technicians/";
			const response = await fetch(url);

			if (response.ok) {
				const data = await response.json();
				console.log(data);
				setTechnicians(data.technicians);
			}
		};
		fetchTechnicians();
		// setLoaded(true);
	}, []);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = { vin, owner, dateTime, selectedTechnician, reason };
		data.date_time = data.dateTime;
		data.technician_id = data.selectedTechnician;

		delete data.selectedTechnician;
		delete data.dateTime;

		console.log(data);

		const appointmentUrl = "http://localhost:8080/api/appointments/";
		const fetchConfig = {
			method: "post",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		};

		const response = await fetch(appointmentUrl, fetchConfig);
		if (response.ok) {
			const newAppointment = await response.json();
			console.log(newAppointment);
			event.target.reset();
			setVin("");
			setOwner("");
			setDateTime("");
			setSelectedTechnician("");
			setReason("");
			setSubmitted(true);
		}
	};

	return (
		<div className="row">
			<div className="offset-3 col-6">
				{!submitted && (
					<div className="shadow p-4 mt-4">
						<h1>Create a New Appointment</h1>
						<form id="create-appointment-form" onSubmit={handleSubmit}>
							<div className="form-floating mb-3">
								<input
									onChange={(e) => setVin(e.target.value)}
									placeholder="Vin"
									required
									type="text"
									name="vin"
									id="vin"
									className="form-control"
								/>
								<label htmlFor="vin">Vin Number</label>
							</div>
							<div className="form-floating mb-3">
								<input
									onChange={(e) => setOwner(e.target.value)}
									placeholder="Owner"
									required
									type="text"
									name="owner"
									id="owner"
									className="form-control"
								/>
								<label htmlFor="owner">Owner</label>
							</div>
							<div className="form-floating mb-3">
								<input
									onChange={(e) => setDateTime(e.target.value)}
									placeholder="Date Time"
									type="datetime-local"
									name="dateTime"
									id="dateTime"
									className="form-control"
								/>
								<label htmlFor="Date Time">Date & Time</label>
							</div>

							<div className="mb-3">
								<select
									onChange={(e) => setSelectedTechnician(e.target.value)}
									required
									name="technician"
									id="technician"
									className="form-select">
									<option value="">Select a Technician</option>
									{technicians.map((technician) => {
										return (
											<option key={technician.id} value={technician.id}>
												{technician.name}
											</option>
										);
									})}
								</select>
							</div>
							<div className="mb-3">
								<label htmlFor="reason">Reason</label>
								<textarea
									onChange={(e) => setReason(e.target.value)}
									id="reason"
									rows="1"
									name="reason"
									className="form-control"></textarea>
							</div>
							<button className="btn btn-primary">Create</button>
						</form>
					</div>
				)}
				{submitted && (
					<div
						className="alert alert-success mb-0 p-4 mt-4"
						id="success-message">
						Your appointment has been created!
					</div>
				)}
			</div>
		</div>
	);
};
export default AppointmentForm;
