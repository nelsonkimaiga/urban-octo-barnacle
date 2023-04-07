import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home'
import Register from './pages/Register';
import Visits from './pages/Visits';
import Reports from './pages/Reports';
import ExistingPatientVisit from './pages/ExistingPatientVisit';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/visits" component={Visits} />
          <Route exact path="/report" component={Reports} />
          <Route exact path="/patient-visit" component={ExistingPatientVisit} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;