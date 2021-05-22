import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import useToken from './utils/useToken';

function App() {
  const { setToken } = useToken();

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/dashboard" component={Dashboard}></PrivateRoute>
          <Route>
            <Login setToken={setToken} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
