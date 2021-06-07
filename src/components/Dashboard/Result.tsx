import React from 'react';

interface LayoutProps {
  status: string;
  stdout?: string;
  stderr?: string;
}

const Result: React.FC<LayoutProps> = ({ status, stdout, stderr }) => {
  return (
    <div>
      <b>Status: </b>
      {status}
      <br />
      <b>Stdout: </b>
      <pre>{stdout}</pre>
      <b>Stderr: </b>
      <pre>{stderr}</pre>
    </div>
  );
};

export default Result;
