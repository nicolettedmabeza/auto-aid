import { useState, useEffect } from "react";

const VehicleModelList = () => {
	const [models, setModels] = useState([]);

	useEffect(() => {
		const fetchModels = async () => {
			const url = "http://localhost:8100/api/models/";
			const response = await fetch(url);

			if (response.ok) {
				const data = await response.json();

				setModels(data.models);
			}
		};
		fetchModels();
	}, []);

	return (
		<div className="container mt-3">
			<div className="row row-cols-1 row-cols-md-2 g-4 t-5 m-2">
				{models.map((model) => {
					return (
						<div key={model.id} className="col-lg-4 d-flex align-items-stretch">
							<div className="card-body mb-3 shadow">
								<h5 className="card-header">{model.manufacturer.name}</h5>
								<div className="card-body">
									<h5 className="card-title">{model.name}</h5>
									<img src={model.picture_url} className="card-img-top" alt={model.name} />
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default VehicleModelList;
