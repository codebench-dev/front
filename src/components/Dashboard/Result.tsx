import React from 'react';

interface LayoutProps {
  status: string;
  message: string;
  error: string;
  stdout?: string;
  stderr?: string;
  execDuration?: number;
}

const Result: React.FC<LayoutProps> = ({
  status,
  message,
  error,
  stdout,
  stderr,
  execDuration,
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
    </div>
  );
};

export default Result;
