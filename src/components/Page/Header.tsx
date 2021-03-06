import React, { ReactChild } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  title: string;
  button?: string;
  navTo?: string;
  extraContent?: ReactChild;
}

const Header: React.FC<HeaderProps> = ({
  title,
  button,
  navTo,
  extraContent,
}) => {
  const isButtonNeeded = button !== undefined && navTo !== undefined;

  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      {button === 'back' ? (
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex ">
          {isButtonNeeded ? (
            <Link
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              to={navTo !== undefined ? navTo : '/500'}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </Link>
          ) : (
            <></>
          )}
          <h1 className="text-3xl dark:text-gray-100 font-bold text-gray-900 ml-2">
            {title}
          </h1>
          {/* Add space to move extraContent to the end of the header */}
          <div className="flex-grow"></div>
          {extraContent}
        </div>
      ) : (
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between">
          <h1 className="text-3xl dark:text-gray-100 font-bold text-gray-900">
            {title}
          </h1>
          {isButtonNeeded ? (
            <Link
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              to={navTo !== undefined ? navTo : '/500'}
            >
              {button}
            </Link>
          ) : (
            <></>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
