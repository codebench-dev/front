import React from 'react';

interface LayoutProps {
  status: string;
  output?: string;
}

const Result: React.FC<LayoutProps> = ({ status, output }) => {
  return (
    <div>
      <h2>{status}</h2>
      <pre>{output}</pre>
    </div>
  );
};

export default Result;
