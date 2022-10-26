import { useEffect, useState } from "react";

const AutomobileList = () => {
    const [automobileList, setAutomobileList] = useState([]);

    useEffect(() => {
        async function fetchSalesList() {
            const url = "http://localhost:8100/api/automobiles/";
            const response = await fetch(url);

            if (response.ok) {
                const data = await response.json();
                setAutomobileList(data.autos);
            }
        }
        fetchSalesList();
    }, []);

    return (
        <table className="table table-striped mt-4">
          <thead>
            <tr>
              <th>Automobile VIN</th>
              <th>Color</th>
              <th>Year</th>
              <th>Model</th>
              <th>Manufacturer</th>
            </tr>
          </thead>
          <tbody>
            {automobileList.map((automobile) => {
              return (
                <tr key={automobile.id}>
                  <td>{automobile.vin}</td>
                  <td>{automobile.color}</td>
                  <td>{automobile.year}</td>
                  <td>{automobile.model.name}</td>
                  <td>{automobile.model.manufacturer.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
    export default AutomobileList;
