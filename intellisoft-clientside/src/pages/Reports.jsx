import React from 'react';
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from 'jquery';
import Moment from 'react-moment';

class Reports extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: null };
    }

    async componentDidMount() {

        const searchParams = new URLSearchParams(this.props.location.search);
        const patientNumber = searchParams.get('patientNumber');

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        // Fetch the visits from the database based on the patient's number.

        const response = await fetch(`http://localhost:8008/intellisoft/visits/${patientNumber}`, requestOptions);

        const data = await response.json();

        console.log("Report Data => " + JSON.stringify(data));

        this.setState({ data: data });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.data !== this.state.data || prevState.filteredData !== this.state.filteredData) {
            var table = $('#patientTable').DataTable({
                "iDisplayLength": 25,
                pagingType: "simple"
            });

            $("#patientTable tbody tr").on('click', function (event) {
                $("#patientTable tbody tr").removeClass('row-selected');
                $(this).addClass('row-selected');
            });

            table.destroy();
        }
    }


    handleDateFilter = (event) => {
        const date = new Date(event.target.value);
        const filteredData = this.state.data.filter((visit) => {
            const visitDate = new Date(visit.visitDate);
            return visitDate.toDateString() === date.toDateString();
        });
        this.setState({ filteredData: filteredData });
    }
    


    render() {
        return (
            this.state.data !== null ? (
                <React.Fragment>
                    <div className="container" style={{ marginTop: 10 }}>
                        <div className="row justify-content-md-center">
                            <h3 class="text-center">Patient Report</h3>
                            <div className="row justify-content-end">
                                <div className='col-lg-4'>
                                    <label htmlFor="dateFilter">Filter by Date: </label>
                                    <input type="date" className="form-control" id="dateFilter" onChange={this.handleDateFilter} />
                                </div>
                            </div>
                            <br />

                            <table id="patientTable" className="table table-striped table-bordered table-sm hover mb-2">
                                <thead>
                                    <tr>
                                        <td>Full Names</td>
                                        <td>Age</td>
                                        <td>BMI Status</td>
                                        <td>Visit Date</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.filteredData ? (
                                        this.state.filteredData.map((visit, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{visit.patientName}</td>
                                                    <td>{visit.age}</td>
                                                    <td>{visit.bmiStatus}</td>
                                                    <td><Moment format="YYYY-MM-DD">{visit.visitDate}</Moment></td>
                                                </tr>
                                            )
                                        })
                                    ) : (
                                        this.state.data.map((visit, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{visit.patientName}</td>
                                                    <td>{visit.age}</td>
                                                    <td>{visit.bmiStatus}</td>
                                                    <td><Moment format="YYYY-MM-DD">{visit.visitDate}</Moment></td>
                                                </tr>
                                            )
                                        })
                                    )}
                                </tbody>

                            </table>
                        </div>
                    </div>
                </React.Fragment>
            ) : (<div className="p-5 text-center"><p>Loading...</p></div>)
        )
    }

}

export default Reports;
