import { useEffect, useState } from "react";

const VehicleModelForm = () => {
	const [name, setName] = useState("");
	const [pictureUrl, setPictureUrl] = useState("");
	const [manufacturers, setManufacturers] = useState([]);
	const [selectedManufacturer, setSelectedManufacturer] = useState("");
	const [submitted, setSubmitted] = useState(false);

	useEffect(() => {
		const fetchManufacturers = async () => {
			const url = "http://localhost:8100/api/manufacturers/";
			const response = await fetch(url);

			if (response.ok) {
				const data = await response.json();
				setManufacturers(data.manufacturers);
			}
		};
		fetchManufacturers();
	}, []);

	const handleSubmit = async (event) => {
		event.preventDefault();

		const picture_url = pictureUrl;
		const manufacturer_id = selectedManufacturer;
		const data = { name, picture_url, manufacturer_id };

		const modelUrl = "http://localhost:8100/api/models/";
		const fetchConfig = {
			method: "post",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		};

		const response = await fetch(modelUrl, fetchConfig);
		if (response.ok) {
			event.target.reset();
			setName("");
			setPictureUrl("");
			setSelectedManufacturer("");
			setSubmitted(true);
		}
	};

	return (
		<div className="row">
			<div className="offset-3 col-6">
				<div className="shadow p-4 mt-4">
					<h1 className="text-center">Create a New Model</h1>
					<form id="create-model-form" onSubmit={handleSubmit}>
						<div className="form-floating mb-3">
							<input
								onChange={(e) => setName(e.target.value)}
								placeholder="Model Name"
								required
								type="text"
								name="name"
								id="name"
								className="form-control"
							/>
							<label htmlFor="name">Model Name</label>
						</div>
						<div className="form-floating mb-3">
							<input
								onChange={(e) => setPictureUrl(e.target.value)}
								placeholder="pictureUrl"
								required
								type="text"
								name="pictureUrl"
								id="pictureUrl"
								className="form-control"
							/>
							<label htmlFor="pictureUrl">Picture Url</label>
						</div>
						<div className="mb-3">
							<select
								onChange={(e) => setSelectedManufacturer(e.target.value)}
								required
								name="manufacturer"
								id="manufacturer"
								className="form-select">
								<option value="">Select a Manufacturer</option>
								{manufacturers.map((manufacturer) => {
									return (
										<option key={manufacturer.id} value={manufacturer.id}>
											{manufacturer.name}
										</option>
									);
								})}
							</select>
						</div>
						<div className="col text-center">
							<button className="btn btn-primary">Create</button>
						</div>
					</form>
					{submitted && (
						<div
							className="alert alert-success mb-0 p-4 mt-4"
							id="success-message">
							Your model has been created!
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
export default VehicleModelForm;
