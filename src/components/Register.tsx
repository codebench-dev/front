import React from 'react';
import { useHistory } from 'react-router-dom';
import { register } from '../api/auth';
import useToken from '../hooks/token';

const Register: React.FC = () => {
  const history = useHistory();
  const { token, setToken } = useToken();

  if (token) {
    history.push('/dashboard');
  }
  const registerUser = async (event: any) => {
    event.preventDefault();

    await register(
      event.target.name.value,
      event.target.email.value,
      event.target.username.value,
      event.target.password.value,
    );

    history.push('/login');
  };

  return (
    <section className="flex flex-col items-center h-screen md:flex-row">
      <div className="container mx-auto">
        <div className="flex justify-center px-2 py-6 ">
          <div className="flex w-full rounded-lg xl:w-3/4 lg:w-11/12 lg:shadow-xl ">
            <div className="w-full px-8 py-24 bg-white rounded-lg border-blueGray-100 lg:w-8/12 lg:px-24 lg:py-4 lg:rounded-l-none s">
              <div className="relative z-10 text-left ">
                <form className="mt-6" onSubmit={registerUser}>
                  <div>
                    <label className="block text-base font-medium leading-relaxed text-blueGray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      name=""
                      id="name"
                      placeholder="Your name "
                      className="w-full px-4 py-2 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blueGray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ext-black focus:border-blueGray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-medium leading-relaxed text-blueGray-700">
                      Username
                    </label>
                    <input
                      type="text"
                      name=""
                      id="username"
                      placeholder="Your Username "
                      className="w-full px-4 py-2 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blueGray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ext-black focus:border-blueGray-500"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-base font-medium leading-relaxed text-blueGray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name=""
                      id="email"
                      placeholder="Your Email "
                      className="w-full px-4 py-2 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blueGray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ext-black focus:border-blueGray-500"
                      autoComplete="email"
                      required={true}
                    />
                  </div>
                  <div className="flex flex-wrap mt-4 mb-6 -mx-3">
                    <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                      <label
                        className="text-base font-medium leading-relaxed text-blueGray-700"
                        htmlFor="password"
                      >
                        {' '}
                        Password{' '}
                      </label>
                      <input
                        className="block w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blueGray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ext-black focus:border-blueGray-500"
                        id="password"
                        type="text"
                        placeholder="Your Password"
                      />
                      {/* <p className="mt-1 text-xs italic text-black">
                        Please fill out this field.
                      </p> */}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="block w-full px-4 py-3 mt-6 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg bg-gradient-to-r from-black hover:from-black to-black focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 hover:to-black"
                  >
                    Sign up
                  </button>
                </form>
                <p className="mt-8 text-center">
                  Already have an account?{' '}
                  <a
                    href="#"
                    className="font-semibold text-black hover:text-black"
                  >
                    Sign In
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
