import Gravatar from 'react-gravatar';
import React from 'react';
import { useLeaderboardList } from '../../hooks/leaderboard';

interface LeaderboardProps {
  benchmarkId: string;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ benchmarkId }) => {
  const leaderboard = useLeaderboardList(benchmarkId).data;

  console.log(leaderboard);

  return (
    <>
      <h1 className="text-2xl pb-3 mt-3 ml-2">Leaderboard</h1>
      <div className="ml-2 flex flex-col h-80 scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date / Language
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Quality Score
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Lint Score
                    </th>
                  </tr>
                </thead>
                {/*<div className="overscroll-auto h-50">*/}
                <tbody className="bg-white divide-y divide-gray-200 ">
                  {leaderboard
                    ? leaderboard.map((row) => (
                        <tr key={row.user?.email}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <Gravatar
                                  email={row.user?.email}
                                  className="h-8 w-8 rounded-full"
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {row.user?.name}
                                </div>
                                {/*<div className="text-sm text-gray-500">*/}
                                {/*  {person.email}*/}
                                {/*</div>*/}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {row.createdAt}
                            </div>
                            <div className="text-sm text-gray-500">
                              {row.language}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {row.qualityScore}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {row.lintScore}
                          </td>
                        </tr>
                      ))
                    : ''}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
