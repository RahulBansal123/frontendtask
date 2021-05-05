import './App.css';
import React from 'react';
import Pie from './Pie';
import Table from './Table';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <div className="App__header">
        <div className="Logo">
          <img
            alt="Logo"
            src="https://dhwaniris.in/wp-content/uploads/2018/08/Dhwani-Logo_Versions-e1533798168980.png"
          />
        </div>
        <div className="App__navbar">
          <ul>
            <NavLink to="/table" activeStyle={{ color: '#821623' }}>
              Table
            </NavLink>
            <NavLink to="/pie" activeStyle={{ color: '#821623' }}>
              Pie
            </NavLink>
          </ul>
        </div>
      </div>
      <hr />
      <Switch>
        <Route exact path="/table">
          <Table />
        </Route>
        <Route exact path="/pie">
          <Pie />
        </Route>
        <Redirect from="/" to="/table" />
      </Switch>
      <div className="Footer">Made with love ❤️ by RAHUL BANSAL!</div>
    </div>
  );
}

export default App;
