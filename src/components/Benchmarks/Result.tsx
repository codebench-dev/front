import React from 'react';

interface LayoutProps {
  status: string;
  message: string;
  error: string;
  stdout?: string;
  stderr?: string;
  execDuration?: number;
  qualityScore?: number;
  lintScore?: number;
}

const Result: React.FC<LayoutProps> = ({
  status,
  message,
  error,
  stdout,
  stderr,
  execDuration,
  qualityScore,
  lintScore,
}) => {
  return (
    <div className="flex dark:text-white">
      <div className="w-1/3">
        <ScoresComponent qualityScore={qualityScore} lintScore={lintScore} />
      </div>
      <div className="w-2/3 ml-2">
        <b>Status: </b>
        {status}
        <div className="flex justify-between">
          <b>Execution duration (μs): </b>
          <div
            className={
              execDuration == null || execDuration === 0
                ? 'animate-pulse h w-48 bg-gray-800 rounded-lg text-white text-cente'
                : 'h w-48 bg-gray-800 rounded-lg text-white text-cente'
            }
          >
            {execDuration === 0 ? null : execDuration}
          </div>
        </div>
        <OutputsComponent text={'Message'} value={message} />
        <OutputsComponent text={'Error'} value={error} />
        <OutputsComponent text={'Stdout'} value={stdout} />
        <OutputsComponent text={'Stderr'} value={stderr} />
      </div>
    </div>
  );
};

interface OutputsComponentProps {
  text?: string;
  value?: string;
}

const OutputsComponent: React.FC<OutputsComponentProps> = ({ text, value }) => {
  return (
    <div>
      <b>{text}:</b>
      <div
        className={
          value == null
            ? 'animate-pulse h-10 w-full bg-gray-800 rounded-lg text-white'
            : 'h-10 w-full bg-gray-800 rounded-lg text-white'
        }
      >
        {value}
      </div>
    </div>
  );
};

interface ScoresComponentProps {
  qualityScore: number | undefined;
  lintScore: number | undefined;
}

const ScoresComponent: React.FC<ScoresComponentProps> = ({
  qualityScore,
  lintScore,
}) => {
  return (
    <div className="relative flex flex-col min-w-0 mb-4 lg:mb-0 break-words bg-gray-50 dark:bg-gray-800 w-full shadow-lg rounded">
      <div className="rounded-t mb-0 px-0 border-0">
        <div className="flex flex-wrap items-center px-4 py-2">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h2 className="font-semibold text-base text-gray-900 dark:text-gray-50">
              Results
            </h2>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <tbody>
              <tr className="text-gray-700 dark:text-gray-100">
                <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                  Quality score
                </th>
                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <div className="flex items-center">
                    <span className="mr-2">{qualityScore}</span>
                    <div className="relative w-full">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                        <div
                          style={{ width: `${qualityScore}%` }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                        />
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="text-gray-700 dark:text-gray-100">
                <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                  Lint score
                </th>
                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <div className="flex items-center">
                    <span className="mr-2">{lintScore}</span>
                    <div className="relative w-full">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                        <div
                          style={{ width: `${lintScore}%` }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Result;
