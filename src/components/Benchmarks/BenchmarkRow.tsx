import { Link } from 'react-router-dom';
import React from 'react';
import benchmarkModel from './BenchmarkModel';
import ReactMarkdown from 'react-markdown';

interface BenchmarkRowProps {
  benchmark: benchmarkModel;
}

// @ts-ignore
const BenchmarkRow: React.FC<BenchmarkRowProps> = ({ benchmark }) => {
  const difficultyEasyColor =
    'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800';
  const difficultyMediumColor =
    'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800';
  const difficultyHardColor =
    'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800';
  const truncateSize = 80;

  if (
    benchmark.subject === undefined ||
    benchmark.title === undefined ||
    benchmark.creator === undefined
  ) {
    return;
  }

  return (
    <tr key={benchmark.id}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          {/*<div className="flex-shrink-0 h-10 w-10">*/}
          {/*    /!*<img className="h-10 w-10 rounded-full"*!/*/}
          {/*    /!*     src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"*!/*/}
          {/*    /!*     alt=""/>*!/*/}
          {/*</div>*/}
          <div className="ml-4">
            <div
              key={benchmark.title}
              className="text-sm font-medium text-gray-900"
            >
              {benchmark.title}
            </div>
            {/*<div className="text-sm text-gray-500">*/}
            {/*    jane.cooper@example.com*/}
            {/*</div>*/}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div
          key={benchmark.subject.substring(0, 50)}
          className="text-sm text-gray-900"
        >
          <ReactMarkdown>
            {benchmark.subject.length > truncateSize
              ? benchmark.subject.substring(0, truncateSize) + '...'
              : benchmark.subject}
          </ReactMarkdown>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          key={benchmark.difficulty}
          className={
            benchmark.difficulty === 'Hard'
              ? difficultyHardColor
              : benchmark.difficulty === 'Medium'
              ? difficultyMediumColor
              : difficultyEasyColor
          }
        >
          {benchmark.difficulty}
        </span>
      </td>
      <td
        key={benchmark.creator.name}
        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
      >
        {benchmark.creator.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          to={'/benchmarks/' + benchmark.id}
        >
          See
        </Link>
      </td>
    </tr>
  );
};

export default BenchmarkRow;
