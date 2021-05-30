import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { BenchmarkServices } from '../../api/BenchmarkServices';
import Header from '../Page/Header';
import Page from '../Page/Page';

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

  if (benchmark === ''|| undefined) {
    return <Redirect to="/404" />;
  }

  return (
    <Page>
      <Header title={
          // @ts-ignore
          benchmark === undefined ? '' : benchmark.title}
              button='Back' navTo='/benchmarks'
      />
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
