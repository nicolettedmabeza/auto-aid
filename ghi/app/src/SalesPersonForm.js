import { useState } from "react";

const SalesPersonForm = () => {
    const [name, setName] = useState("");
    const [employeeNumber, setEmployeeNumber] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { name, employeeNumber };
        data.employee_number = data.employeeNumber;
        delete data.employeeNumber;


        const salesPersonUrl = "http://localhost:8090/api/salespeople/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(salesPersonUrl, fetchConfig);
        if (response.ok) {
            const newSalesPerson = await response.json();
            setName("");
            setEmployeeNumber("");
            setSubmitted(true);
        }
    };

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a New Sales Person</h1>
                    <form id="create-new-sales-person-form" onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
                                required
                                type="text"
                                name="name"
                                id="name"
                                className="form-control"
                                value={name}
                            />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={(e) => setEmployeeNumber(e.target.value)}
                                placeholder="Employee Number"
                                required
                                type="text"
                                name="employee_number"
                                id="employee_number"
                                className="form-control"
                                value={employeeNumber}
                            />
                            <label htmlFor="employee_number">Employee Number</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default SalesPersonForm;
