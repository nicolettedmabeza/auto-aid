import { useState, useEffect } from "react";

const ManufacturerList = () => {
	const [manufacturers, setManufacturers] = useState([]);

	useEffect(() => {
		const fetchManufacturers = async () => {
			const url = "http://localhost:8100/api/manufacturers/";
			const response = await fetch(url);

			if (response.ok) {
				const data = await response.json();
				console.log(data);
				setManufacturers(data.manufacturers);
			}
		};
		fetchManufacturers();
	}, []);

	return (
		<div className="container overflow-hidden mt-5">
			<div className="row gy-5">
				{manufacturers.map((manufacturer) => {
					return (
						// <div class="container overflow-hidden">
						// 	<div class="row gy-5">
						<div class="col-6 mb-2 text-center text-white">
							<div class="p-3 border shadow bg-success">
								{manufacturer.name}
							</div>
						</div>
						// 		</div>
						// 	</div>
					);
				})}
			</div>
		</div>
	);
};

export default ManufacturerList;
