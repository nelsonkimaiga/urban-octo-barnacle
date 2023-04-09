import React, { Component } from 'react';
import swal from 'sweetalert';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            dob: '',
            gender: ''
        };
    }

    handleFirstNameChange = (event) => {
        this.setState({ firstName: event.target.value });
    }

    handleLastNameChange = (event) => {
        this.setState({ lastName: event.target.value });
    }

    handleDOBChange = (event) => {
        this.setState({ dob: event.target.value });
    }

    handleGenderChange = (event) => {
        this.setState({ gender: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();


        const patient = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            dob: this.state.dob,
            gender: this.state.gender,
            patientNumber: "INC".concat(Math.floor(Math.random() * 89999 + 100000)), //Dynamically generated unique patientNumber will asssist to identify patient in the reports & visits
        };

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(patient)
        };

        fetch("http://localhost:8008/intellisoft/register", requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong');
                }
            })
            .then(data => {
                console.log('Response => ' + JSON.stringify(data))
                swal("Success!", "Patient Added Successfully", "success");

            // redirect to Visits page with data from API response::

            const queryParams = new URLSearchParams();

            queryParams.append('patientNumber', data.patientNumber);
            queryParams.append('patientName', data.firstName+data.lastName);
            queryParams.append('dob', data.dob);

            const queryStr = queryParams.toString();
            const redirectUrl = `/visits?${queryStr}`;
            window.location.href = redirectUrl;

            })
            .catch(error => {
                console.error('Error:', error);
                swal("Error!", "Something Went Wrong", "error");
            });

    }

    render() {
        return (
            <div className='container' style={{ marginTop: 10 }}>
                <div class="row justify-content-md-center">
                    <div class="col">
                    </div>
                    <div className="col">
                        <form className='class="mb-3' onSubmit={this.handleSubmit}>
                            <label className="form-label">
                                First Name:
                                <input className="form-control form-control-lg" type="text" value={this.state.firstName} onChange={this.handleFirstNameChange} />
                            </label>
                            <br />
                            <label className="form-label">
                                Last Name:
                                <input className="form-control form-control-lg" type="text" value={this.state.lastName} onChange={this.handleLastNameChange} />
                            </label>
                            <br />
                            <label className="form-label">
                                Date of Birth:
                                <input className="form-control form-control-lg" type="date" value={this.state.dob} onChange={this.handleDOBChange} />
                            </label>
                            <br />
                            <label className="form-label">
                                Gender:
                                <select className="form-select" value={this.state.gender} onChange={this.handleGenderChange}>
                                    <option value="">Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </label>
                            <br />
                            <button type="submit" className="btn btn-info">Submit</button>
                        </form>
                    </div>
                    <div class="col">
                    </div>

                </div>
            </div>
        );
    }
}

export default Register;
