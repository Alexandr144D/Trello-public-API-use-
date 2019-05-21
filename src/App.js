import React from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import HeaderComponent from "./components/headerComponent/headerComponent";
import DashboardComponent from "./components/DashboardComponent/DashboardComponent";
import LoginComponent from "./components/LoginCompoent/LoginComponent";

const ROUTES = {
    login: '/login',
    dashboard: '/dashboard',
};

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
        <div className='app'>
          <header>
              <HeaderComponent />
          </header>
          <main>
              <React.Fragment>
                  <Route exact path="/" />
                  <Route path={ROUTES.login} component={LoginComponent} />
                  <Route path={ROUTES.dashboard} component={DashboardComponent} />
              </React.Fragment>
          </main>
        </div>
    )
  }
}


const mapStateToProps = state => {
    return {
    }
};

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
