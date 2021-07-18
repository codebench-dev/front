import { DateTime } from 'luxon';
import React, { Fragment, useState } from 'react';
import Gravatar from 'react-gravatar';
import { useLeaderboardList } from '../../hooks/leaderboard';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const languages = [
  {
    id: 0,
    name: 'all',
    avatar:
      'https://cdn.icon-icons.com/icons2/3076/PNG/128/report_chart_graph_analytics_statistics_icon_191167.png',
  },
  {
    id: 1,
    name: 'python',
    avatar:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/768px-Python-logo-notext.svg.png',
  },
  {
    id: 2,
    name: 'go',
    avatar:
      'https://blog.engineering.publicissapient.fr/wp-content/uploads/2016/10/gopher.png',
  },
  {
    id: 3,
    name: 'cpp',
    avatar:
      'https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg',
  },
];

interface LeaderboardProps {
  benchmarkId: string;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ benchmarkId }) => {
  const [selected, setSelected] = useState(languages[0]);

  const leaderboard = useLeaderboardList(benchmarkId).data;
  let rankCounter = 1;

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl pb-3 mt-3 ml-2">Leaderboard</h1>
        <Listbox value={selected} onChange={setSelected}>
          {({ open }) => (
            <>
              <Listbox.Label className="block text-sm font-medium text-gray-700">
                Languages
              </Listbox.Label>
              <div className="mt-1 relative">
                <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <span className="flex items-center">
                    <img
                      src={selected.avatar}
                      alt=""
                      className="flex-shrink-0 h-6 w-6 rounded-full"
                    />
                    <span className="ml-3 block truncate">{selected.name}</span>
                  </span>
                  <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <SelectorIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options
                    static
                    className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                  >
                    {languages.map((language) => (
                      <Listbox.Option
                        key={language.id}
                        className={({ active }) =>
                          classNames(
                            active
                              ? 'text-white bg-indigo-600'
                              : 'text-gray-900',
                            'cursor-default select-none relative py-2 pl-3 pr-9',
                          )
                        }
                        value={language}
                      >
                        {({ selected, active }) => (
                          <>
                            <div className="flex items-center">
                              <img
                                src={language.avatar}
                                alt=""
                                className="flex-shrink-0 h-6 w-6 rounded-full"
                              />
                              <span
                                className={
                                  selected
                                    ? 'font-semibold'
                                    : 'font-normal ml-3 block truncate'
                                }
                              >
                                {language.name}
                              </span>
                            </div>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? 'text-white' : 'text-indigo-600',
                                  'absolute inset-y-0 right-0 flex items-center pr-4',
                                )}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      </div>
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
                      Rank
                    </th>
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
                <tbody className="bg-white divide-y divide-gray-200 ">
                  {leaderboard
                    ? leaderboard
                        .filter(
                          (row) =>
                            row.language === selected.name ||
                            selected.name === 'all',
                        )
                        .map((row) => (
                          <tr key={row.user?.email}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {rankCounter++}
                                </div>
                              </div>
                            </td>
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
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {row.createdAt
                                  ? DateTime.fromISO(row.createdAt).toRelative()
                                  : row.createdAt}
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
