import React from 'react';
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
  return (
    <div>
      <section className="text-gray-700 ">
        <div className="container flex flex-col px-5 py-24 mx-auto lg:items-center">
          <img className="rounded-full w-1/6" src="https://images2.imgbox.com/ab/88/aS4VAVYc_o.png" alt="Codebench logo"/>
          <div className="flex flex-col w-full mb-12 text-left lg:text-center">
            <h2 className="mb-4 text-xs font-semibold tracking-widest text-black uppercase title-font">
              Get up to speed...
            </h2>
            <h1 className="mb-6 text-2xl font-semibold tracking-tighter text-black sm:text-5xl title-font">
              {' '}
              Benchmark your code.{' '}
            </h1>
            <p className="mx-auto text-base font-medium leading-relaxed text-gray-700 lg:w-2/3">
              Ever wondered what language would be the best suited for a
              specific algorithm? <br />
              Get the answer on Codebench.
            </p>
          </div>
          <div className="flex justify-left lg:justify-center ">
            <Link to="/login">
              <button className="px-6 py-2 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg bg-black hover:bg-gray-800 hover:to-black focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="px-6 py-2 ml-4 font-semibold text-black transition duration-500 ease-in-out transform border rounded-lg shadow-xl hover:bg-wickedgray-300 hover:text-white focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2">
                Sign up
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
