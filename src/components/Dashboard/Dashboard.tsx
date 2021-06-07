import Editor from '@monaco-editor/react';
import React, { useRef } from 'react';
import useProcessInterval from '../../hooks/submissions';
import Header from '../Page/Header';
import Page from '../Page/Page';
import Result from './Result';

export default function Example() {
  // Get monaco instance to access code later
  const editorRef: any = useRef<null>(null);
  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
  }

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
        stdout={jobData.stdout}
        stderr={jobData.stderr}
      ></Result>
    );
  }

  return (
    <Page>
      <Header title="Dashboard" />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
              <Editor
                onMount={handleEditorDidMount}
                height="30vh"
                defaultLanguage="python"
                defaultValue={`print('hey!')`}
              />
            </div>
          </div>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition ease-in-out duration-150"
            onClick={() => {
              mutate(editorRef.current.getValue());
            }}
          >
            Run code
          </button>

          {result && result}
        </div>
      </main>
    </Page>
  );
}
