import React from 'react';

interface LayoutProps {
  status: string;
  stdout?: string;
  stderr?: string;
  execDuration?: number;
}

const Result: React.FC<LayoutProps> = ({
  status,
  stdout,
  stderr,
  execDuration,
}) => {
  return (
    <div>
      <b>Status: </b>
      {status}
      <br />
      <b>Stdout: </b>
      <pre>{stdout}</pre>
      <b>Stderr: </b>
      <pre>{stderr}</pre>
      <b>Execution duration (milliseconds): </b>
      <pre>{execDuration}</pre>
    </div>
  );
};

export default Result;
