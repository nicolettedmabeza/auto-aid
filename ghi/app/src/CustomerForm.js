import { useState } from "react";

const CustomerForm = () => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { name, address, phoneNumber };
        data.phone_number = data.phoneNumber;

        delete data.phoneNumber;
        console.log(data);

        const salesPersonUrl = "http://localhost:8090/api/customers/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(salesPersonUrl, fetchConfig);
        if (response.ok) {
            const newCustomer = await response.json();
            console.log(newCustomer);
            setName("");
            setAddress("");
            setPhoneNumber("");
            setSubmitted(true);
        }
    };

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a New Customer</h1>
                    <form id="create-presentation-form" onSubmit={handleSubmit}>
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
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Address"
                                required
                                type="text"
                                name="address"
                                id="address"
                                className="form-control"
                                value={address}
                            />
                            <label htmlFor="address">Address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="Phone Number"
                                required
                                type="text"
                                name="phone_number"
                                id="phone_number"
                                className="form-control"
                                value={phoneNumber}
                            />
                            <label htmlFor="phone_number">Phone Number</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default CustomerForm;
