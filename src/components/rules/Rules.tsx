import Page from '../Page/Page';
import Header from '../Page/Header';
import React from 'react';

const Rules: React.FC = () => {
  return (
    <Page>
      <Header title="Quality rules" />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <p className="ml-2 dark:text-gray-100">
          This page contains all the rules for the supported languages.
        </p>
        <h1 className="text-3xl dark:text-gray-100 font-bold text-gray-900 ml-2 mt-3">
          C++
        </h1>
        <ul className="list-disc dark:text-gray-100 ml-20 mt-5">
          <li>
            If the function names are not in snake case, decrease score of 3
            points
          </li>
          <li>
            If the function names is longer than 25 characters, decrease score
            of 1 points
          </li>
          <li>
            If the function body contains more than 30 lines, decrease score of
            5 points
          </li>
          <li>
            If the line in a function have more than 80 characters, decrease
            score of 1 point
          </li>
        </ul>
        <h1 className="text-3xl dark:text-gray-100 font-bold text-gray-900 ml-2 mt-3">
          Python
        </h1>
        <ul className="list-disc dark:text-gray-100 ml-20 mt-5">
          <li>
            If the function names are not in snake case, decrease score of 3
            points
          </li>
          <li>
            If the function names is longer than 25 characters, decrease score
            of 1 points
          </li>
          <li>
            If the line in a function have more than 80 characters, decrease
            score of 1 point
          </li>
        </ul>
        <h1 className="text-3xl dark:text-gray-100 font-bold text-gray-900 ml-2 mt-3">
          Go
        </h1>
        <ul className="list-disc dark:text-gray-100 ml-20 mt-5">
          <li>
            If the function names are not in snake case, decrease score of 3
            points
          </li>
          <li>
            If the function names is longer than 25 characters, decrease score
            of 1 points
          </li>
          <li>
            If the function body contains more than 30 lines, decrease score of
            5 points
          </li>
        </ul>
      </div>
    </Page>
  );
};

export default Rules;
