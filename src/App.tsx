import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import BenchmarkDetail from './components/benchmarks/BenchmarkDetail';
import { Benchmarks } from './components/benchmarks/Benchmarks';
import { CreateBenchmark } from './components/benchmarks/CreateBenchmark';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import useToken from './utils/useToken';

function App() {
  const { setToken } = useToken();

  const queryClient = new QueryClient();

  return (
    <div className="wrapper">
      <QueryClientProvider client={queryClient}>
        <Header />
        <BrowserRouter>
          <Switch>
            <PrivateRoute
              path="/dashboard"
              component={Dashboard}
            ></PrivateRoute>
            {/*<PrivateRoute path="/benchmarks" component={Benchmarks}></PrivateRoute>*/}
            <Route path="/benchmarks/create" component={CreateBenchmark} />
            <Route path="/benchmarks" component={Benchmarks} />
            <Route path="/benchmarks/:id" component={BenchmarkDetail} />
            <Route>
              <Login setToken={setToken} />
            </Route>
          </Switch>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
