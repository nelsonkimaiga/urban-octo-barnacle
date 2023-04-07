import React from 'react';
import renderIf from 'render-if';
import swal from 'sweetalert';

class Visits extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: '',
            weight: '',
            bmi: '',
            patientNumber: '',
            generalHealth: 'Poor',
            takingDrugs: 'No',
            comments: '',
            healthStatus: 'poor',
            isDieting: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleHealthChange = (event) => {
        this.setState({ healthStatus: event.target.value });
    };

    handleDietingChange = (event) => {
        this.setState({ isDieting: event.target.value === 'yes' });
    };

    handleCommentsChange = (event) => {
        this.setState({ comments: event.target.value });
    };

    handleGeneralHealthChange = (event) => {
        this.setState({ generalHealth: event.target.value });
    };

    handleTakingDrugsChange = (event) => {
        this.setState({ takingDrugs: event.target.value });
    };



    handleWeightChange = (event) => {
        const weight = event.target.value;
        const height = this.state.height;
        const bmiResult = (parseFloat(weight) * 10000) / (parseFloat(height) * parseFloat(height));
        this.setState({ weight, bmi: bmiResult.toFixed(2) });
    };

    handleHeightChange = (event) => {
        const height = event.target.value;
        const weight = this.state.weight;
        const bmiResult = (parseFloat(weight) * 10000) / (parseFloat(height) * parseFloat(height));
        this.setState({ height, bmi: bmiResult.toFixed(2) });
    };

    componentDidMount() {
        const searchParams = new URLSearchParams(this.props.location.search);
        const patientNumber = searchParams.get('patientNumber');
        const patientName = searchParams.get('patientName');
        const dob = searchParams.get('dob');
        this.setState({ patientNumber });
        this.setState({ patientName });
        this.setState({ dob });
    }

    calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }



    handleSubmit(event) {
        event.preventDefault();

        //Assign BMI status::
        let status;
        if (this.state.bmi < 18.5) {
            status = "Underweight";

        } else if (this.state.bmi >= 18.5 && this.state.bmi < 25) {
            status = "Normal weight";
        } else if (this.state.bmi >= 25 && this.state.bmi < 30) {
            status = "Overweight";
        }

        const patientVisits = {
            age: this.calculateAge(this.state.dob),
            bmiStatus: status,
            healthStatus: this.state.healthStatus,
            isDieting: this.state.isDieting,
            takingDrugs: this.state.takingDrugs,
            comments: this.state.comments,
            patientNumber: this.state.patientNumber,
            patientName: this.state.patientName,
        };


        // send data to API service:
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(patientVisits)
        };

        fetch("http://localhost:8008/intellisoft/save-visit", requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong');
                }
            })
            .then(data => {
                console.log('Response => ' + JSON.stringify(data))
                swal("Success!", "Patient Visit Saved Successfully", "success");

                //Redirect to home
                const redirectUrl = '/';
                window.location.pathname = redirectUrl;

            })
            .catch(error => {
                console.error('Error:', error);
                swal("Error!", "Something Went Wrong", "error");
            });
    }


    render() {
        return (
            <div className="container" style={{ marginTop: 10 }}>
                <div className="row justify-content-md-center">
                    <div className="col"></div>
                    <div className="col">
                        <h1>Vitals</h1>
                        <form className="mb-3" onSubmit={this.handleSubmit}>
                            <label className="form-label">
                                Height (CM):
                                <input
                                    className="form-control form-control-lg"
                                    type="text"
                                    value={this.state.height}
                                    onChange={this.handleHeightChange}
                                />
                            </label>
                            <br />
                            <label className="form-label">
                                Weight (KG):
                                <input
                                    className="form-control form-control-lg"
                                    type="text"
                                    value={this.state.weight}
                                    onChange={this.handleWeightChange}
                                />
                            </label>
                            <br />
                            <label className="form-label">
                                BMI:
                                <input
                                    className="form-control form-control-lg"
                                    type="text"
                                    value={this.state.bmi}
                                    readOnly
                                />
                            </label>
                            <br />

                            {renderIf(this.state.bmi !== '' && this.state.bmi < 25)(
                                <div className='container justify-content-md-center'>
                                    <p>BMI is Under 25: General Health ?</p>
                                    <div className='form-check'>
                                        <input
                                            className='form-check-input'
                                            type='radio'
                                            name='healthStatus'
                                            id='goodWeight1'
                                            value='good'
                                            checked={this.state.healthStatus === 'good'}
                                            onChange={this.handleHealthChange}
                                        />
                                        <label className='form-check-label' htmlFor='goodWeight1'>
                                            Good
                                        </label>
                                    </div>
                                    <div className='form-check'>
                                        <input
                                            className='form-check-input'
                                            type='radio'
                                            name='healthStatus'
                                            id='goodWeight2'
                                            value='poor'
                                            checked={this.state.healthStatus === 'poor'}
                                            onChange={this.handleHealthChange}
                                        />
                                        <label className='form-check-label' htmlFor='goodWeight2'>
                                            Poor
                                        </label>
                                    </div>
                                    <p>Have you been on diet to lose weight?</p>
                                    <div className='form-check'>
                                        <input
                                            className='form-check-input'
                                            type='radio'
                                            name='isDieting'
                                            id='diet1'
                                            value='yes'
                                            checked={this.state.isDieting}
                                            onChange={this.handleDietingChange}
                                        />
                                        <label className='form-check-label' htmlFor='flexRadioDefault1'>
                                            Yes
                                        </label>
                                    </div>
                                    <div className='form-check'>
                                        <input
                                            className='form-check-input'
                                            type='radio'
                                            name='isDieting'
                                            id='diet2'
                                            value='no'
                                            checked={!this.state.isDieting}
                                            onChange={this.handleDietingChange}
                                        />
                                        <label className='form-check-label' htmlFor='flexRadioDefault2'>
                                            No
                                        </label>
                                    </div>
                                    <div className='form-floating'>
                                        <textarea
                                            className='form-control'
                                            placeholder='Comments'
                                            id='floatingTextarea1'
                                            style={{ height: 100 }}
                                            value={this.state.comments}
                                            onChange={this.handleCommentsChange}
                                        ></textarea>
                                        <label htmlFor='floatingTextarea2'>Comments</label>
                                    </div>
                                    <br />
                                    <button type='submit' className='btn btn-info'>
                                        Submit
                                    </button>
                                </div>
                            )}

                            {renderIf(this.state.bmi !== '' && this.state.bmi >= 25.5)(
                                <div className='container justify-content-md-center'>
                                    <p>BMI is Over 25: General Health ?</p>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="generalHealth"
                                            id="weightUnder25"
                                            value="Good"
                                            checked={this.state.generalHealth}
                                            onChange={this.handleGeneralHealthChange}
                                        />
                                        <label className="form-check-label" htmlFor="goodWeight1">
                                            Good
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="generalHealth"
                                            id="weightUnder252"
                                            value="Poor"
                                            checked={this.state.generalHealth}
                                            onChange={this.handleGeneralHealthChange}
                                        />
                                        <label className="form-check-label" htmlFor="goodWeight2">
                                            Poor
                                        </label>
                                    </div>
                                    <p>Are you currently taking any drugs?</p>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="takingDrugs"
                                            id="drugs1"
                                            value="Yes"
                                            checked={this.state.takingDrugs}
                                            onChange={this.handleTakingDrugsChange}
                                        />
                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                            Yes
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="takingDrugs"
                                            id="drugs2"
                                            value="No"
                                            checked={this.state.takingDrugs}
                                            onChange={this.handleTakingDrugsChange}
                                        />
                                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                                            No
                                        </label>
                                    </div>
                                    <div className="form-floating">
                                        <textarea
                                            className="form-control"
                                            placeholder="Comments"
                                            id="floatingTextarea2"
                                            style={{ height: 100 }}
                                            value={this.state.comments}
                                            onChange={this.handleCommentsChange}
                                        ></textarea>
                                        <label htmlFor="floatingTextarea2">Comments</label>
                                    </div>
                                    <br />
                                    <button type="submit" className="btn btn-info">
                                        Submit
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                    <div className="col"></div>
                </div>
            </div >
        );
    }
}

export default Visits;
