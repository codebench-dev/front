import React from 'react';
import Loader from 'react-loader-spinner';
import { LintErrorDTO } from '../../api/dto/lint-error.dto';
interface LayoutProps {
  status: string;
  message: string;
  error: string;
  stdout?: string;
  stderr?: string;
  execDuration?: number;
  memUsage?: number;
  qualityScore?: number;
  cyclomaticComplexity?: number;
  lintScore?: number;
  lintErrors?: LintErrorDTO[];
  isLoading: boolean;
}

const Result: React.FC<LayoutProps> = ({
  status,
  message,
  error,
  stdout,
  stderr,
  execDuration,
  memUsage,
  qualityScore,
  lintScore,
  lintErrors,
  isLoading,
  cyclomaticComplexity,
}) => {
  if (status !== 'done' && status !== 'error') {
    return (
      <div className="flex justify-center dark:text-gray-100">
        <Loader
          type="ThreeDots"
          color="#0a75ab"
          height={100}
          width={100}
          timeout={10000}
        />
      </div>
    );
  } else {
    return (
      <div className="flex">
        <div className="w-2/5">
          <ScoresComponent
            status={status}
            qualityScore={qualityScore}
            lintScore={lintScore}
            memUsage={memUsage}
            execDuration={execDuration}
            cyclomaticComplexity={cyclomaticComplexity}
          />
        </div>
        <div className="w-3/5 pl-6">
          <OutputsComponent
            text={'Console output'}
            value={stdout}
            isLoading={isLoading}
          />
          <LinterOutput
            text={'Linter output'}
            lintErrors={lintErrors}
            isLoading={isLoading}
          />
          <OutputsComponent
            text={'Error'}
            value={error}
            isLoading={isLoading}
          />
          <OutputsComponent
            text={'Error output'}
            value={stderr}
            isLoading={isLoading}
          />
        </div>
      </div>
    );
  }
};

interface OutputsComponentProps {
  text?: string;
  value?: string;
  isLoading: boolean;
}

const OutputsComponent: React.FC<OutputsComponentProps> = ({ text, value }) => {
  if (value) {
    return (
      <div>
        <b className="dark:text-gray-100">{text}:</b>
        <div
          className={'h-auto p-4 mt-2 w-full bg-gray-800 rounded-lg text-white'}
        >
          {value}
        </div>
      </div>
    );
  } else {
    return <div />;
  }
};

interface LinterOutputProps {
  text?: string;
  lintErrors?: LintErrorDTO[];
  isLoading: boolean;
}

const LinterOutput: React.FC<LinterOutputProps> = ({ text, lintErrors }) => {
  if (lintErrors) {
    return (
      <div className="mt-4">
        <b className="dark:text-gray-100">{text}:</b>
        <div
          className={'h-auto p-4 mt-2 w-full bg-gray-800 rounded-lg text-white'}
        >
          {lintErrors.map((error, i) => (
            <p>
              {error.column}:{error.line}: {error.message}
            </p>
          ))}
        </div>
      </div>
    );
  } else {
    return <div />;
  }
};

interface ScoresComponentProps {
  status: string | undefined;
  qualityScore: number | undefined;
  lintScore: number | undefined;
  memUsage: number | undefined;
  execDuration: number | undefined;
  cyclomaticComplexity: number | undefined;
}

const ScoresComponent: React.FC<ScoresComponentProps> = ({
  status,
  qualityScore,
  lintScore,
  memUsage,
  execDuration,
  cyclomaticComplexity,
}) => {
  return (
    <div className="relative flex flex-col min-w-0 mb-4 lg:mb-0 break-words bg-gray-50 dark:bg-gray-800 w-full shadow-lg rounded">
      <div className="rounded-t mb-0 px-0 border-0">
        <div className="flex flex-wrap items-center px-4 py-2">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-50">
              Results
            </h2>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <tbody>
              <tr className="text-gray-700 dark:text-gray-100">
                <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-3 text-left">
                  Exit status
                </th>
                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-3">
                  <div className="flex items-center">
                    <span className="mr-2">
                      {status === 'done' ? '✅' : '❌'}
                    </span>
                  </div>
                </td>
              </tr>
              <tr className="text-gray-700 dark:text-gray-100">
                <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-3 text-left">
                  Quality score
                </th>
                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-3">
                  <div className="flex items-center">
                    <span className="mr-2">{qualityScore}</span>
                    <div className="relative w-full">
                      <div className="overflow-hidden h-2 text-sm flex rounded bg-blue-200">
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
                <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-3 text-left">
                  Lint score
                </th>
                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-3">
                  <div className="flex items-center">
                    <span className="mr-2">{lintScore}</span>
                    <div className="relative w-full">
                      <div className="overflow-hidden h-2 text-sm flex rounded bg-blue-200">
                        <div
                          style={{ width: `${lintScore}%` }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="text-gray-700 dark:text-gray-100">
                <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-3 text-left">
                  Execution duration
                </th>
                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-3">
                  <div className="flex items-center">
                    <span className="mr-2">{execDuration} μs</span>
                  </div>
                </td>
              </tr>
              <tr className="text-gray-700 dark:text-gray-100">
                <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-3 text-left">
                  Max. memory usage
                </th>
                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-3">
                  <div className="flex items-center">
                    <span className="mr-2">{memUsage} KB</span>
                  </div>
                </td>
              </tr>
              <tr className="text-gray-700 dark:text-gray-100">
                <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-3 text-left">
                  Cyclomatic complexity
                </th>
                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-3">
                  <div className="flex items-center">
                    <span className="mr-2">{cyclomaticComplexity}</span>
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
