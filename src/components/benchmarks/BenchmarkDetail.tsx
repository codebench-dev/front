import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { BenchmarkServices } from '../../api/BenchmarkServices';
import Header from '../Header';
import Page from '../Page';

// @ts-ignore
const BenchmarkDetail = (props) => {
  const [benchmark, setBenchmark] = useState();

  useEffect(() => {
    let isMounted = true;
    BenchmarkServices.getBenchmarkById(props.match.params.id)
      .then((response) => {
        if (isMounted) {
          // @ts-ignore
          setBenchmark(response);
        }
        return () => {
          isMounted = false;
        };
      })
      .catch((e) => {
        // @ts-ignore
        setBenchmark('');
        console.log('Error : ' + e);
      });
  }, [setBenchmark, props.match.params.id]);

  if (benchmark === '') {
    return <Redirect to="/404" />;
  }

  return (
    <Page>
      <Header title="Dashboard" />
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            {
              // @ts-ignore
              benchmark === undefined ? '' : benchmark.title
            }
          </h1>
          <Link
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            to="/benchmarks"
          >
            Back
          </Link>
        </div>
      </header>
      <div className="flex p-4">
        <div className="flex-1 mx-auto border-4 border-dashed border-gray-200 rounded-lg h-96">
          <div className="pl-8 pr-8">
            <h1 className="text-2xl pb-3">Subject</h1>
            <p>
              {
                // @ts-ignore
                benchmark === undefined ? '' : benchmark.subject
              }
            </p>
          </div>
        </div>
        <div className="flex-1 border-4 border-dashed border-gray-200 rounded-lg h-96">
          <h1>Here the editor</h1>
        </div>
      </div>
    </Page>
  );
};

export default BenchmarkDetail;
