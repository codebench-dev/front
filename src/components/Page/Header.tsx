import {Link} from "react-router-dom";
import React from "react";

interface HeaderProps {
  title: string;
  button?: string;
  navTo?: string;
}

const Header: React.FC<HeaderProps> = ({ title, button, navTo}) => {
    const isButtonNeeded = button !== undefined && navTo !== undefined;

    return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          {isButtonNeeded?
              <Link
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  to={navTo !== undefined ? navTo : '/500'}
              >
                  {button}
              </Link>
              : <></>}
      </div>

    </header>

  );
};

export default Header;
