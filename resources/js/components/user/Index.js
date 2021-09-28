import React, { Component, useState, useEffect } from "react";
import toastr from "cogo-toast";
import Create from "./Create";
import Edit from "./Edit";
import axios from "axios";
import moment from "moment";
import Pagination from "react-js-pagination";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router-dom";

export default () => {
    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState({});
    const path = window.location.pathname;
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const initialQueryString = queryString.parse(location.search);
        const initialPageNumber = Number(initialQueryString.page) || 1;
        fetchData(initialPageNumber);
    }, [history, path, location]);
    const fetchData = async (pageNumber = 1) => {
        const api = await fetch(`/api/users/pages?page=${pageNumber}`);
        setUsers(await api.json());
    };

    //--- Update state variable while any user insert or update ---//
    const handleUpdateState = (data, operation) => {
        //--- 'operation==1' means update user ---//
        if (operation === 1) {
            setUsers({
                ...users,
                data: users.data.filter(user => {
                    if (user.id === data.id) return Object.assign(user, data);
                    else return user;
                })
            });
            return;
        }
        //--- 'operation==0' means insert user ---//
        let new_users = users.data.concat(data);
        setUsers({ ...users, data: new_users });
    };

    //--- Find editable user and update state variable ---//
    const handleEditUser = userId => {
        axios.get(`/api/users/${userId}/edit`).then(response => {
            setEditUser(response.data);
            // this.setState({
            //     editUser: response.data
            // });
        });
    };

    //--- Delete user and update state ---//
    const handleDeleteUser = userId => {
        axios.delete(`/api/users/deleteUser/${userId}`).then(response => {
            toastr.error("User has been deleted successfully!", {
                position: "top-right",
                heading: "Done"
            });
            setUsers({
                ...users,
                data: users.data.filter(user => {
                    return user.id !== userId;
                })
            });
        });
    };

    const getAge = birth => {
        var currentDate = new Date();
        var currentYear = currentDate.getFullYear();
        var age = currentYear - moment(birth).year();
        return age;
    };

    return (
        <div className="card mt-4">
            <div className="card-header">
                <h4 className="card-title"> Users </h4>
                <button
                    type="button"
                    className="btn btn-primary btn-sm pull-right"
                    data-toggle="modal"
                    data-target="#addModal"
                >
                    Add User
                </button>
            </div>
            <div className="card-body">
                <div className="col-md-12">
                    <Pagination
                        activePage={users.current_page ? users.current_page : 0}
                        itemsCountPerPage={users.per_page ? users.per_page : 0}
                        totalItemsCount={users.total ? users.total : 0}
                        onChange={pageNumber => {
                            history.push(`${path}?page=${pageNumber}`);
                            fetchData(pageNumber);
                        }}
                        pageRangeDisplayed={5}
                        itemClass="page-item"
                        linkClass="page-link"
                        firstPageText="First"
                        lastPageText="Last"
                    />
                </div>
                <div className="col-md-12">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th> Id </th>
                                <th> First Name </th>
                                <th> Last Name </th>
                                <th> Age </th>
                                <th> Action </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.data &&
                                users.data.map((user, i) => (
                                    <tr key={i}>
                                        <td> {user.id} </td>
                                        <td> {user.first_name} </td>
                                        <td> {user.last_name} </td>
                                        <td> {getAge(user.birth)} </td>
                                        <td>
                                            <button
                                                className="btn btn-secondary btn-sm mr-2"
                                                onClick={e =>
                                                    handleEditUser(user.id)
                                                }
                                                data-toggle="modal"
                                                data-target="#editModal"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={e =>
                                                    handleDeleteUser(user.id)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Create updateState={handleUpdateState} />
            <Edit
                updateState={handleUpdateState}
                user={editUser}
                deleteUser={handleDeleteUser}
            />
        </div>
    );
};
