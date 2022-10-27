import { useState } from "react";

const ManufacturerForm = () => {
	const [name, setName] = useState("");
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = { name };

		const url = "http://localhost:8100/api/manufacturers/";
		const fetchConfig = {
			method: "post",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		};

		const response = await fetch(url, fetchConfig);
		if (response.ok) {
			event.target.reset();
			setName("");
			setSubmitted(true);
		}
	};

	return (
		<div className="row">
			<div className="offset-3 col-6">
				<div className="shadow p-4 mt-4">
					<h1 className="text-center">Create a Manufacturer</h1>
					<form id="create-manufacturer-form" onSubmit={handleSubmit}>
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
							<label htmlFor="name">Manufacturer Name</label>
						</div>
						<div className="col text-center">
							<button className="btn btn-primary">Create</button>
						</div>
					</form>
					{submitted && (
						<div
							className="alert alert-success mb-0 p-4 mt-4"
							id="success-message">
							Your manufacturer has been created!
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
export default ManufacturerForm;
