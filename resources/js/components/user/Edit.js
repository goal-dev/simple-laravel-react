import React, { useState, useEffect } from "react";
import toastr from "cogo-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

export default ({ updateState, user, deleteUser }) => {
    const [state, setState] = useState({
        errors: [],
        id: "",
        first_name: "",
        last_name: "",
        birth: new Date()
    });

    //--- Update state variable value while input field change ---//
    useEffect(() => {
        setState({ ...state, ...user, birth: moment(user.birth).toDate() });
    }, [user]);

    const handleInputFieldChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    //--- Update state users variable by props method ---//
    const handleUpdateUser = e => {
        e.preventDefault();
        //--- Declare state variable for this component ---//
        const data = {
            id: state.id,
            first_name: state.first_name,
            last_name: state.last_name,
            birth: moment(state.birth).format("YYYY-MM-DD")
        };
        axios
            .put(`/api/users/updateUser/${state.id}`, data)
            .then(response => {
                updateState(data, 1);
                document.getElementById("closeEditModal").click();
                toastr.info("User data updated successfully!", {
                    position: "top-right",
                    heading: "Done"
                });
            })
            .catch(error => {
                setState({
                    ...state,
                    errors: error.response.data.errors
                });
            });
    };

    //--- Check that any validation errors occure for input field ---//
    const hasErrorFor = fieldName => {
        return !!state.errors[fieldName];
    };

    //--- Render error for specific validation fail input field ---//
    const renderErrorFor = fieldName => {
        if (hasErrorFor(fieldName)) {
            return (
                <em className="error invalid-feedback">
                    {" "}
                    {state.errors[fieldName][0]}{" "}
                </em>
            );
        }
    };

    return (
        <div
            className="modal fade"
            id="editModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Update user information</h5>
                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form onSubmit={handleUpdateUser}>
                        <div className="modal-body">
                            <div className="form-group">
                                <label
                                    htmlFor="first_name"
                                    className="col-form-label"
                                >
                                    First name:
                                </label>
                                <input
                                    type="text"
                                    className={`form-control form-control-sm ${
                                        hasErrorFor("first_name")
                                            ? "is-invalid"
                                            : ""
                                    }`}
                                    id="first_name"
                                    name="first_name"
                                    placeholder="John"
                                    onChange={handleInputFieldChange}
                                    value={state.first_name}
                                />
                                {renderErrorFor("first_name")}
                            </div>
                            <div className="form-group">
                                <label
                                    htmlFor="last_name"
                                    className="col-form-label"
                                >
                                    Last name:
                                </label>
                                <input
                                    type="text"
                                    className={`form-control form-control-sm ${
                                        hasErrorFor("last_name")
                                            ? "is-invalid"
                                            : ""
                                    }`}
                                    id="last_name"
                                    name="last_name"
                                    placeholder="Smith"
                                    onChange={handleInputFieldChange}
                                    value={state.last_name}
                                />
                                {renderErrorFor("last_name")}
                            </div>
                            <div className="form-group">
                                <label
                                    htmlFor="birth"
                                    className="col-form-label"
                                >
                                    Birth:
                                </label>
                                <DatePicker
                                    selected={state.birth}
                                    onChange={date =>
                                        setState({ ...state, birth: date })
                                    }
                                    dateFormat="yyyy/MM/dd"
                                />
                                {renderErrorFor("birth")}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                id="closeEditModal"
                                className="btn btn-secondary btn-sm"
                                data-dismiss="modal"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                id="closeEditModal"
                                data-dismiss="modal"
                                className="btn btn-danger btn-sm"
                                onClick={e => deleteUser(user.id)}
                            >
                                Delete
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary btn-sm"
                            >
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
