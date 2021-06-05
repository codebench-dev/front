import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { login, register } from '../api/auth';
import useToken from '../hooks/token';
import Label from './utils/Label';

const Register: React.FC = () => {
  const history = useHistory();
  const { token, setToken } = useToken();
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  if (token) {
    history.push('/dashboard');
  }
  const registerUser = async (event: any) => {
    event.preventDefault();

    if (event.target.password.value !== event.target.passwordConfirmed.value) {
      setMessage("Passwords doesn't match");
      setStatus('Error');
      return;
    }

    let errorOnRegister: boolean = false;
    await register(
      event.target.name.value,
      event.target.email.value,
      event.target.username.value,
      event.target.password.value,
    ).catch((event) => {
      if (event.response.status === 409) {
        errorOnRegister = true;
      }
    });

    if (errorOnRegister) {
      setMessage('Email or username already taken');
      setStatus('Error');
      return;
    }

    const token = await login(
      event.target.username.value,
      event.target.password.value,
    );

    setToken(token);
    history.push('/dashboard');
  };

  return (
    <section className="flex min-h-screen flex-col items-center h-screen md:flex-row">
      <div className="container mx-auto">
        <div className="flex justify-center px-2 py-6 ">
          <div className="flex w-full rounded-lg xl:w-3/4 lg:w-11/12 lg:shadow-xl ">
            <div className="w-full px-8 py-24 bg-white rounded-lg border-blueGray-100 lg:w-8/12 lg:px-24 lg:py-4 lg:rounded-l-none s">
              <Link to="/">
                <img
                  className="rounded mx-auto mb-8 w-1/3"
                  src="https://images2.imgbox.com/ab/88/aS4VAVYc_o.png"
                  alt="Codebench logo"
                />
              </Link>
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
                      required={true}
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
                      required={true}
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
                        type="password"
                        placeholder="Your Password"
                        required={true}
                      />
                    </div>
                    <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                      <label
                        className="text-base font-medium leading-relaxed text-blueGray-700"
                        htmlFor="password"
                      >
                        {' '}
                        Confirm password{' '}
                      </label>
                      <input
                        className="block w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blueGray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ext-black focus:border-blueGray-500"
                        id="passwordConfirmed"
                        type="password"
                        placeholder="Confirm Your Password"
                        required={true}
                      />
                    </div>
                  </div>
                  <Label status={status} message={message} />
                  <button
                    type="submit"
                    className="block w-full px-4 py-3 mt-6 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg bg-gradient-to-r from-black hover:from-black to-black focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 hover:to-black"
                  >
                    Sign up
                  </button>
                </form>
                <p className="mt-8 text-center">
                  Already have an account?{' '}
                  <Link
                    className="font-semibold text-black hover:text-black"
                    to="/login"
                  >
                    Sign In
                  </Link>
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
