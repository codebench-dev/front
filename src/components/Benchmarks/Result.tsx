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
    <div>
      <b>Status: </b>
      {status}
      <br />
      <b>Message: </b>
      {message}
      <br />
      <b>Error: </b>
      {error}
      <br />
      <b>Stdout: </b>
      <pre>{stdout}</pre>
      <b>Stderr: </b>
      <pre>{stderr}</pre>
      <b>Execution duration (μs): </b>
      <pre>{execDuration}</pre>
      <b>Quality score: </b>
      <pre>{qualityScore}</pre>
      <b>Quality lint: </b>
      <pre>{lintScore}</pre>
    </div>
  );
};

export default Result;
