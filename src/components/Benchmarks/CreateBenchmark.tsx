import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import { createBenchmark } from '../../hooks/benchmark';
import Header from '../Page/Header';
import Page from '../Page/Page';
import Label from '../utils/Label';
import benchmarkModel from './BenchmarkModel';

const CreateBenchmark: React.FC = () => {
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [id, setId] = useState('');

  const { mutate } = useMutation(createBenchmark, {
    onSuccess: (data: benchmarkModel) => {
      setMessage(`Your benchmark ${data.title} has been saved`);
      setStatus('Success');
      setId(data.id!);
    },
    onError: (err: any) => {
      setMessage(`Failed to create benchmark: ${err}`);
      setStatus('Error');
    },
  });

  const submitBenchmarkCreation = async (event: any) => {
    event.preventDefault();
    const title = event.target.title.value;
    const subject = event.target.subject.value;
    const difficulty = event.target.difficulty.value;

    if (title === '' || subject === '') {
      setMessage('At least one field is blank');
      setStatus('Error');
      return;
    }

    mutate({ title, subject, difficulty });
  };

  return (
    <Page>
      <Header title="Create benchmark" />
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <form className="w-full max-w-lg" onSubmit={submitBenchmarkCreation}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase dark:text-gray-100 tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Title
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="title"
                type="text"
                placeholder="Your benchmark title"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block dark:text-gray-100 uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Subject
              </label>
              <textarea
                className="xl:resize-y appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="subject"
                placeholder="Your benchmark subject"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block dark:text-gray-100 uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Difficulty
              </label>
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="difficulty"
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>
          </div>
          <div className="text-center pb-3">
            <Label status={status} message={message} />
          </div>
          <div className="flex flex-col bg-grey-light">
            <input
              type="submit"
              value="Create"
              className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            />
          </div>
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between">
            <Link
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
              to="/benchmarks"
            >
              Back to benchmarks
            </Link>
            {(() => {
              if (status === 'Success') {
                return (
                  <Link
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    to={'/benchmarks/' + id}
                  >
                    See my benchmark
                  </Link>
                );
              }
            })()}
          </div>
        </form>
      </div>
    </Page>
  );
};

export default CreateBenchmark;
