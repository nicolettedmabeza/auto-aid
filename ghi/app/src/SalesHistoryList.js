import { useEffect, useState } from "react";

const SalesHistoryList = () => {
  const [salesPeople, setSalesPeople] = useState([]);
  const [salesHistory, setSalesHistory] = useState([]);

  useEffect(() => {
    async function fetchSalesPeople() {
      const url = "http://localhost:8090/api/salespeople/";
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setSalesPeople(data.sales_people);
      }
    }
    fetchSalesPeople();
  }, []);


  const handleChange = async (event) => {
    event.preventDefault();
    const person = event.target.value;

    const salesHistoryUrl = `http://localhost:8090/api/salespeople/${person}/salesrecords`;

    const response = await fetch(salesHistoryUrl);
    if (response.ok) {
      const salesHistory = await response.json();
      setSalesHistory(salesHistory.sales_records);
    }
  };

  return (
    <div>
      <h1 className="mt-4 mb-4">Employee Sales History</h1>
      <select
        onChange={handleChange}
        id="sales-person-sales-history"
        name="Sales Person"
        className="form-select mb-3">
        <option value="">Choose a Sales Employee</option>
        {salesPeople.map((salesPerson) => {
          return (
            <option key={salesPerson.id} value={salesPerson.id}>
              {salesPerson.name}
            </option>
          );
        })}
      </select>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Sales Employee</th>
            <th>Customer</th>
            <th>Automobile VIN</th>
            <th>Sale Price</th>
          </tr>
        </thead>
        <tbody >
          {salesHistory.map((sale) => {
            return (
              <tr key={sale.id}>
                <td>{sale.sales_person.name}</td>
                <td>{sale.customer.name}</td>
                <td>{sale.automobile.vin}</td>
                <td>${sale.price.toLocaleString()}.00</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default SalesHistoryList;
