import { DateTime } from 'luxon';
import Gravatar from 'react-gravatar';
import { RouteComponentProps } from 'react-router-dom';
import { useBenchmarksForUser } from '../hooks/benchmark';
import { useUser } from '../hooks/users';
import benchmarkModel from './Benchmarks/BenchmarkModel';
import BenchmarkRow from './Benchmarks/BenchmarkRow';
import Header from './Page/Header';
import Page from './Page/Page';

type UserParams = {
  id: string;
};

const User = ({ match }: RouteComponentProps<UserParams>) => {
  const {
    isLoading: isProfileLoading,
    isError: isProfileError,
    data: profileData,
    error,
  } = useUser(match.params.id);

  let benchmarks: benchmarkModel[] = [];
  const {
    isLoading: isBenchmarksLoading,
    isError: isBenchmarksError,
    data: benchmarksData,
    error: benchmarksError,
  } = useBenchmarksForUser(match.params.id);

  if (isProfileLoading) {
    return <span>Loading....</span>;
  }

  if (isProfileError) {
    if (error) {
      return <span>Error: {error.message}</span>;
    }
  }

  if (benchmarksData) {
    benchmarks = benchmarksData;
  }

  return (
    <Page>
      <Header title="Profile" />

      <div className="w-full text-white bg-gray-50">
        <div className="container mx-auto my-5 p-5">
          <div className="md:flex no-wrap md:-mx-2 ">
            {/* <!-- Left Side --> */}
            <div className="w-full md:w-3/12 md:mx-2">
              {/* <!-- Profile Card --> */}
              <div className="bg-white p-3 border-t-4 border-green-400">
                <div className="image overflow-hidden">
                  <Gravatar
                    size={500}
                    email={profileData?.email}
                    className="h-auto w-full mx-auto rounded"
                  />
                </div>
                <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                  {profileData?.name}
                </h1>
                <h3 className="text-gray-600 font-lg text-semibold leading-6">
                  Developer
                </h3>
                {/* <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Reprehenderit, eligendi dolorum sequi illum qui unde
                  aspernatur non deserunt
                </p> */}
                <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                  <li className="flex items-center py-3">
                    <span>Status</span>
                    <span className="ml-auto">
                      <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                        Active
                      </span>
                    </span>
                  </li>
                  <li className="flex items-center py-3">
                    <span>Member since</span>
                    <span className="ml-auto">
                      {profileData?.createdAt
                        ? DateTime.fromISO(profileData?.createdAt).toISODate()
                        : ''}
                    </span>
                  </li>
                </ul>
              </div>
              {/* <!-- End of profile card --> */}
              <div className="my-4"></div>
            </div>
            {/* <!-- Right Side --> */}
            <div className="w-full md:w-9/12 mx-2 h-64">
              {/* <!-- Profile tab --> */}

              {/* <!-- Experience and education --> */}
              <div className="bg-white p-3 shadow-sm rounded-sm">
                <div className="grid grid-cols-1">
                  <div>
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                      <span className="text-green-500">
                        <svg
                          className="h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </span>
                      <span className="tracking-wide">
                        Published benchmarks
                      </span>
                    </div>
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                              <tr>
                                <th
                                  scope="col"
                                  className="dark:text-gray-100 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Title
                                </th>
                                <th
                                  scope="col"
                                  className="dark:text-gray-100 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Subject
                                </th>
                                <th
                                  scope="col"
                                  className="dark:text-gray-100 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Difficulty
                                </th>
                                <th
                                  scope="col"
                                  className="dark:text-gray-100 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Creator
                                </th>
                                <th scope="col" className="relative px-6 py-3">
                                  <span className="sr-only">View</span>
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-300 divide-y divide-gray-200">
                              {benchmarks.map((benchmark: benchmarkModel) => (
                                <BenchmarkRow
                                  key={benchmark.id?.toString()}
                                  benchmark={benchmark}
                                />
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- End of Experience and education grid --> */}
              </div>
              {/* <!-- End of profile tab --> */}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default User;
