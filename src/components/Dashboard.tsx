import Editor from '@monaco-editor/react';
import React, { useRef } from 'react';
import useProcessInterval from '../api/submissions';
import Header from './Header';
import Page from './Page';
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
    result = <Result status={jobData.status} output={jobData.output}></Result>;
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
