import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import BenchmarkDetail from './components/Benchmarks/BenchmarkDetail';
import Benchmarks from './components/Benchmarks/Benchmarks';
import CreateBenchmark from './components/Benchmarks/CreateBenchmark';
import UserBenchmarks from './components/Benchmarks/UserBenchmarks';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/Routing/PrivateRoute';
import Rules from './components/rules/Rules';
import User from './components/User';

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="wrapper transition duration-500 dark:bg-gray-600 h-screen bg-gray-50">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Landing />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <PrivateRoute path="/user/:id" component={User} />
            <PrivateRoute exact path="/benchmarks" component={Benchmarks} />
            <PrivateRoute exact path="/rules" component={Rules} />
            <PrivateRoute
              path="/benchmarks/user/:id"
              component={UserBenchmarks}
            />
            <PrivateRoute
              exact
              path="/benchmarks/create"
              component={CreateBenchmark}
            />
            <PrivateRoute path="/benchmarks/:id" component={BenchmarkDetail} />
          </Switch>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
