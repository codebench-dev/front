import { RouteComponentProps } from 'react-router-dom';
import { useBenchmarksForUser } from '../../hooks/benchmark';
import Header from '../Page/Header';
import Page from '../Page/Page';
import benchmarkModel from './BenchmarkModel';
import BenchmarkRow from './BenchmarkRow';

type UserParams = {
  id: string;
};

const UserBenchmarks = ({ match }: RouteComponentProps<UserParams>) => {
  let benchmarks: benchmarkModel[] = [];
  const {
    isLoading: isBenchmarksLoading,
    isError: isBenchmarksError,
    data: benchmarksData,
    error,
  } = useBenchmarksForUser(match.params.id);

  if (isBenchmarksLoading) {
    return <span>Loading....</span>;
  }

  if (isBenchmarksError) {
    if (error) {
      return <span>Error: {error.message}</span>;
    }
  }

  if (benchmarksData) {
    benchmarks = benchmarksData;
  }

  return (
    <Page>
      <Header
        title="My Benchmarks"
        button="Create"
        navTo="/benchmarks/create"
      />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col">
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
    </Page>
  );
};

export default UserBenchmarks;
