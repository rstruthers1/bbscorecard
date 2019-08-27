import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import AppNavbar from './components/layout/AppNavbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import AddTeam from './components/teams/AddTeam';
import EditTeam from './components/teams/EditTeam';
import AddPlayer from './components/players/AddPlayer';
import ListPlayers from './components/players/ListPlayers';
import Teams from './components/teams/Teams';
import AddSeason from './components/seasons/AddSeason';
import ViewSeason from './components/seasons/ViewSeason';
import ListSeasons from './components/seasons/ListSeasons';
import Csv from './components/csv/Csv';
import ListLeagueSeasons from './components/seasons/ListLeagueSeasons'

// Redux
import {Provider} from 'react-redux';
import store from './store';
import setAuthToken from "./utils/setAuthToken";
import {loadUser} from "./actions/auth";


if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <AppNavbar/>
            <Route exact path="/" component={Landing}/>
            <section className="container">
              <Alert/>
              <Switch>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/login" component={Login}/>
                <PrivateRoute exact path="/csv" component={Csv}/>
                <PrivateRoute exact path="/dashboard" component={Dashboard}/>

                <PrivateRoute exact path="/teams/add" component={AddTeam}/>
                <PrivateRoute exact path="/teams/list" component={Teams}/>
                <PrivateRoute exact path="/teams/:id/edit" component={EditTeam}/>

                <PrivateRoute exact path="/players/add" component={AddPlayer}/>
                <PrivateRoute exact path="/players/:id/edit" component={AddPlayer}/>
                <PrivateRoute exact path="/players/list" component={ListPlayers}/>

                <PrivateRoute exact path="/seasons/add" component={AddSeason}/>
                <PrivateRoute exact path="/seasons/list" component={ListSeasons}/>
                <PrivateRoute exact path="/seasons/:id/edit" component={AddSeason}/>
                <PrivateRoute exact path="/seasons/:id/view" component={ViewSeason}/>
                <PrivateRoute exact path="/seasons/:id/leagues/view" component={ListLeagueSeasons}/>
              </Switch>
            </section>
          </Fragment>
        </Router>
      </Provider>
  );
};

export default App;
