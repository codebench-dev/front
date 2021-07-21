import { Dialog, Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import Editor from '@monaco-editor/react';
import React, { Fragment, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { RouteComponentProps } from 'react-router-dom';
import useBenchmarkDetail from '../../hooks/benchmark';
import useProcessInterval, {
  useLastSubmissionForUser,
} from '../../hooks/submissions';
import Result from './Result';
import Header from '../Page/Header';
import Page from '../Page/Page';
import Leaderboard from '../leaderboard/Leaderboard';
import { languagesList } from '../../assets/languages';
import { XIcon } from '@heroicons/react/outline';
import useDarkMode from '../../hooks/darkmode';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const languages = languagesList;

type BenchmarkDetailParams = {
  id: string;
};

const BenchmarkDetail = ({
  match,
}: RouteComponentProps<BenchmarkDetailParams>) => {
  const [selected, setSelected] = useState(languages[0]);
  const [open, setOpen] = useState(false);
  const [colorTheme] = useDarkMode();

  //Get monaco instance to access code later
  const editorRef: any = useRef<null>(null);

  let editorTheme = colorTheme === 'dark' ? 'light' : 'vs-dark';

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
  }

  let lastSubmission;
  const {
    isLoading: isLastSubmissionLoading,
    isError: isLastSubmissionError,
    data: lastSubmissionData,
    error: errorLastSubmission,
  } = useLastSubmissionForUser(match.params.id, selected.name);

  // Handle code submission and job result polling
  const {
    mutate,
    data: jobData,
    isLoading: isProcessing,
  } = useProcessInterval({
    onSuccess: (data: any) => console.log('Process finished', data),
    onError: (err: any) => console.log('Error with process', err),
  });

  let result;
  if (isProcessing) {
    result = 'Processing...';
  }
  if (jobData) {
    result = (
      <Result
        status={jobData.status}
        message={jobData.message}
        error={jobData.error}
        stderr={jobData.stderr}
        stdout={jobData.stdout}
        execDuration={jobData.execDuration}
        qualityScore={jobData.qualityScore}
        lintScore={jobData.lintScore}
      />
    );
  }

  const {
    isLoading: isBenchmarkLoading,
    isError: isBenchmarkError,
    data: benchmarkData,
    error,
  } = useBenchmarkDetail(match.params.id);

  if (isBenchmarkLoading) {
    return <span>Loading....</span>;
  }

  if (isBenchmarkError) {
    if (error) {
      return <span>Error: {error.message}</span>;
    }
  }

  if (isLastSubmissionLoading) {
    lastSubmission = 'Loading...';
  }

  if (isLastSubmissionError) {
    if (errorLastSubmission) {
      lastSubmission = "print('Welcome to Codebench !')";
    }
  }
  if (lastSubmissionData) {
    lastSubmission = lastSubmissionData.code;
  }

  function openLeaderboardPanel() {
    setOpen(true);
  }

  return (
    <Page>
      {/*Leaderboard side panel*/}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 overflow-hidden"
          open={open}
          onClose={setOpen}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="relative w-screen md:w-auto">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                      <button
                        className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => setOpen(false)}
                      >
                        <span className="sr-only">Close panel</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-hidden">
                    <div className="relative flex-1 px-4 sm:px-6">
                      <Leaderboard
                        benchmarkId={benchmarkData?.id ? benchmarkData.id : ''}
                      />
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <Header
        title={benchmarkData?.title || 'Failed to load benchmark'}
        button="back"
        navTo="/benchmarks"
      />
      <div className="flex p-4 overflow-hidden ">
        <div className="grid w-2/5">
          <div className="pl-8 pr-8 border-4 border-dashed border-gray-200 rounded-lg h-96 p-4">
            <div className="flex justify-between">
              <h1 className="text-2xl pb-3 dark:text-white">Subject</h1>
              <div className="">
                <Listbox value={selected} onChange={setSelected}>
                  {({ open }) => (
                    <>
                      <Listbox.Label className="block dark:text-white text-sm font-medium text-gray-700">
                        Languages
                      </Listbox.Label>
                      <div className="mt-1 relative">
                        <Listbox.Button className="dark:text-white dark:bg-gray-800 relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                          <span className="flex items-center">
                            <img
                              src={selected.avatar}
                              alt=""
                              className="flex-shrink-0 h-6 w-6 rounded-full"
                            />
                            <span className="ml-3 block truncate">
                              {selected.name}
                            </span>
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
                            className="dark:text-white dark:bg-gray-800 absolute z-10 mt-1 w-full bg-white shadow-lg max-h-96 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                          >
                            {languages.map((language) => (
                              <Listbox.Option
                                key={language.id}
                                className={({ active }) =>
                                  classNames(
                                    active
                                      ? 'text-white bg-indigo-600'
                                      : 'text-gray-900 dark:text-white',
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
                                            : 'font-normal' +
                                              'ml-3 block truncate'
                                        }
                                      >
                                        {language.name}
                                      </span>
                                    </div>

                                    {selected ? (
                                      <span
                                        className={classNames(
                                          active
                                            ? 'text-white'
                                            : 'text-indigo-600 dark:text-white',
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
            </div>
            <ReactMarkdown className="dark:text-white">
              {benchmarkData?.subject || ''}
            </ReactMarkdown>
            <div className="flex">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 py-2 px-4 rounded-full"
                onClick={openLeaderboardPanel}
              >
                Leaderboard 📈
              </button>
            </div>
          </div>
        </div>
        <div className="grid w-3/5">
          <div className="bg-gray-500 h-96">
            <Editor
              onMount={handleEditorDidMount}
              height="100%"
              theme={editorTheme}
              value={lastSubmission && lastSubmission}
              language={selected.name}
            />
          </div>
          <div className="grid justify-items-end">
            <div className="flex">
              <button
                className="justify-self-end bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 py-2 px-4 rounded"
                onClick={() => {
                  mutate({
                    code: editorRef.current.getValue(),
                    benchmarkId:
                      benchmarkData?.id !== undefined ? benchmarkData.id : '',
                    language: selected.name,
                  });
                }}
              >
                Run code 🚀
              </button>
            </div>
          </div>
        </div>

        {/*<Leaderboard benchmarkId={benchmarkData?.id ? benchmarkData.id : ''} />*/}
      </div>
      <div className="justify-self-start ml-10">{result && result}</div>
    </Page>
  );
};

export default BenchmarkDetail;
