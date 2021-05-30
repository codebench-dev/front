import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import BenchmarkDetail from './components/Benchmarks/BenchmarkDetail';
import { Benchmarks } from './components/Benchmarks/Benchmarks';
import { CreateBenchmark } from './components/Benchmarks/CreateBenchmark';
import Dashboard from './components/Dashboard/Dashboard';
import Landing from './components/Landing';
import Login from './components/Login';
import PrivateRoute from './components/Routing/PrivateRoute';

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="wrapper">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Landing />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute
              path="/dashboard"
              component={Dashboard}
            />
            <PrivateRoute exact path="/benchmarks" component={Benchmarks} />
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
