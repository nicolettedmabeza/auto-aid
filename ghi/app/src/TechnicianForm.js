import { useState } from "react";

const TechnicianForm = () => {
	const [name, setName] = useState("");
	const [employeeNumber, setEmployeeNumber] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [invalid, setInvalid] = useState(false)


	const handleSubmit = async (event) => {
		event.preventDefault();

		const employee_number = employeeNumber
		const data = { name, employee_number };

		const techUrl = "http://localhost:8080/api/technicians/";
		const fetchConfig = {
			method: "post",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		};

		const response = await fetch(techUrl, fetchConfig);
		if (response.ok) {
			event.target.reset();
			setName("");
			setEmployeeNumber("");
			setSubmitted(true);
			setInvalid("")
		}
		else {
			console.error("Invalid employee number")
			setInvalid(true)
		}
	};

	return (

			<div className="row">
			<div className="offset-3 col-6">
				<div className="shadow p-4 mt-4">
					<h1 className="text-center">Create a Technician</h1>
					<form id="create-technician-form" onSubmit={handleSubmit}>
						<div className="form-floating mb-3">
							<input
								onChange={(e) => setName(e.target.value)}
								placeholder="Name"
								required
								type="text"
								name="name"
								id="name"
								className="form-control"
							/>
							<label htmlFor="name">Technician Name</label>
						</div>
						<div className="form-floating mb-3">
							<input
								onChange={(e) => setEmployeeNumber(e.target.value)}
								placeholder="employeeNumber"
								required
								type="employeeNumber"
								name="employeeNumber"
								id="employeeNumber"
								className="form-control"
							/>
							<label htmlFor="employeeNumber">Employee Number</label>
						</div>
						<div className="col text-center">
							<button className="btn btn-primary">Create</button>
						</div>
					</form>
					{invalid && (
                        <div className="alert alert-danger mb-0 p-4 mt-4" id="success-message">
                            You have put an invalid employee number or that number is already in use.
                        </div>
                    )}
					{!(invalid) && submitted && (
                        <div className="alert alert-success mb-0 p-4 mt-4" id="success-message">
                            You have added a new employee!
                        </div>
                    )}
				</div>
			</div>
		</div>
	);
};
export default TechnicianForm;
