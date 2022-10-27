import { useEffect, useState } from "react";

const AutomobileForm = () => {
	const [color, setColor] = useState("");
	const [year, setYear] = useState("");
	const [vin, setVin] = useState("");
	const [models, setModels] = useState([]);
	const [model, setModel] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [invalid, setInvalid] = useState(false);

	useEffect(() => {
		async function fetchModels() {
			const url = "http://localhost:8100/api/models/";
			const response = await fetch(url);

			if (response.ok) {
				const data = await response.json();
				setModels(data.models);
			}
		}
		fetchModels();
	}, []);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = { color, year, vin, model };
		data.year = parseInt(data.year);
		data.model_id = parseInt(data.model);
		delete data.model;

		const automobileUrl = "http://localhost:8100/api/automobiles/";
		const fetchConfig = {
			method: "post",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		};

		const response = await fetch(automobileUrl, fetchConfig);
		if (response.ok) {
			const newAutomobile = await response.json();
			setColor("");
			setYear("");
			setVin("");
			setModel("");
			setSubmitted(true);
			setInvalid("");
		} else {
			setInvalid(true);
		}
	};

	return (
		<div className="row">
			<div className="offset-3 col-6">
				<div className="shadow p-4 mt-4">
					<h1>Create a New Automobile</h1>
					<form id="add-automobile-form" onSubmit={handleSubmit}>
						<div className="form-floating mb-3">
							<input
								onChange={(e) => setColor(e.target.value)}
								placeholder="Color"
								required
								type="text"
								name="color"
								id="color"
								className="form-control"
								value={color}
							/>
							<label htmlFor="color">Color</label>
						</div>
						<div className="form-floating mb-3">
							<input
								onChange={(e) => setYear(e.target.value)}
								placeholder="Year"
								required
								type="number"
								name="year"
								id="year"
								className="form-control"
								value={year}
							/>
							<label htmlFor="year">Year</label>
						</div>
						<div className="form-floating mb-3">
							<input
								onChange={(e) => setVin(e.target.value)}
								placeholder="VIN"
								required
								type="text"
								name="vin"
								id="vin"
								className="form-control"
								value={vin}
							/>
							<label htmlFor="vin">VIN</label>
						</div>
						<div className="mb-3">
							<select
								onChange={(e) => setModel(e.target.value)}
								required
								name="Model"
								id="model"
								className="form-select"
								value={model}>
								<option value="">Select an Model</option>
								{models.map((model) => {
									return (
										<option key={model.id} value={model.id}>
											{model.name}
										</option>
									);
								})}
							</select>
						</div>
						<button className="btn btn-primary">Create</button>
					</form>
					{invalid && (
						<div
							className="alert alert-danger mb-0 p-4 mt-4"
							id="success-message">
							You have put an invalid employee number or that number is already
							in use.
						</div>
					)}
					{!invalid && submitted && (
						<div
							className="alert alert-success mb-0 p-4 mt-4"
							id="success-message">
							You have added a new employee!
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
export default AutomobileForm;
