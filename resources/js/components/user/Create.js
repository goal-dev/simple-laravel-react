import React, { Component, useState } from "react";
import toastr from "cogo-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

export default ({ updateState }) => {
    const [errors, setErrors] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birth, setBirth] = useState(new Date());

    //--- Insert new user in users state array by props method ---//
    const handleInsertUser = e => {
        e.preventDefault();
        const data = {
            first_name: firstName,
            last_name: lastName,
            birth: moment(birth).format("YYYY-MM-DD")
        };
        axios
            .post("/api/users/addUser", data)
            .then(repsonse => {
                delete repsonse.data.created_at;
                delete repsonse.data.updated_at;
                updateState(repsonse.data, 0);

                document.getElementById("closeAddModal").click();
                toastr.success("New user added successfully!", {
                    position: "top-right",
                    heading: "Done"
                });
            })
            .catch(error => {
                setErrors(error.response.data.errors);
            });
    };

    //--- Check that any validation errors occure for input field ---//
    const hasErrorFor = fieldName => {
        return !!errors[fieldName];
    };

    //--- Render error for specific validation fail input field ---//
    const renderErrorFor = fieldName => {
        if (hasErrorFor(fieldName)) {
            return (
                <em className="error invalid-feedback">
                    {" "}
                    {errors[fieldName][0]}{" "}
                </em>
            );
        }
    };

    return (
        <div
            className="modal fade"
            id="addModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">New user</h5>
                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form onSubmit={handleInsertUser}>
                        <div className="modal-body">
                            <div className="form-group">
                                <label
                                    htmlFor="firstName"
                                    className="col-form-label"
                                >
                                    First name:
                                </label>
                                <input
                                    type="text"
                                    className={`form-control form-control-sm ${
                                        hasErrorFor("firstName")
                                            ? "is-invalid"
                                            : ""
                                    }`}
                                    id="firstName"
                                    name="firstName"
                                    placeholder="John"
                                    onChange={e => setFirstName(e.target.value)}
                                    value={firstName}
                                />
                                {renderErrorFor("firstName")}
                            </div>
                            <div className="form-group">
                                <label
                                    htmlFor="lastName"
                                    className="col-form-label"
                                >
                                    Last name:
                                </label>
                                <input
                                    type="text"
                                    className={`form-control form-control-sm ${
                                        hasErrorFor("lastName")
                                            ? "is-invalid"
                                            : ""
                                    }`}
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Smith"
                                    onChange={e => setLastName(e.target.value)}
                                    value={lastName}
                                />
                                {renderErrorFor("lastName")}
                            </div>
                            <div className="form-group">
                                <label
                                    htmlFor="birth"
                                    className="col-form-label"
                                >
                                    Birth:
                                </label>
                                <DatePicker
                                    selected={birth}
                                    onChange={date => setBirth(date)}
                                    dateFormat="yyyy/MM/dd"
                                />
                                {renderErrorFor("birth")}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                id="closeAddModal"
                                className="btn btn-secondary btn-sm"
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary btn-sm"
                            >
                                Save User
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
