import React from 'react';
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from 'jquery';

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

        const response = await fetch(`http://localhost:8008/intellisoft/visits/${patientNumber}`, requestOptions);

        const data = await response.json();

        console.log("Report Data => " + JSON.stringify(data));

        this.setState({ data: data });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.data !== this.state.data) {
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

    render() {
        return (
            this.state.data !== null ? (
                <React.Fragment>
                    <div className="container" style={{ marginTop: 10 }}>
                        <div className="row justify-content-md-center">
                            <h3>Patient Report</h3>
                            <table id="patientTable" className="table table-striped table-bordered table-sm hover mb-2">
                                <thead>
                                    <tr>
                                        <td>Full Names</td>
                                        <td>Age</td>
                                        <td>BMI Status</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.data.map((visit, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{visit.patientName}</td>
                                                <td>{visit.age}</td>
                                                <td>{visit.bmiStatus}</td>
                                            </tr>
                                        )
                                    })}
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
