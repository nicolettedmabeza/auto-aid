import { useEffect, useState } from "react";

const SalesList = () => {
	const [salesList, setSalesList] = useState([]);

	useEffect(() => {
		async function fetchSalesList() {
			const url = "http://localhost:8090/api/salesrecords/";
			const response = await fetch(url);

			if (response.ok) {
				const data = await response.json();
				setSalesList(data.sales_records);
			}
		}
		fetchSalesList();
	}, []);

	return (
		<table className="table table-striped mt-4">
			<thead>
				<tr>
					<th>Sales Employee</th>
					<th>Employee Number</th>
					<th>Customer</th>
					<th>Automobile VIN</th>
					<th>Sale Price</th>
				</tr>
			</thead>
			<tbody>
				{salesList.map((sale) => {
					return (
						<tr className="table-row" key={sale.id}>
							<td>{sale.sales_person.name}</td>
							<td>{sale.sales_person.employee_number}</td>
							<td>{sale.customer.name}</td>
							<td>{sale.automobile.vin}</td>
							<td>${sale.price.toLocaleString()}.00</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};
export default SalesList;
