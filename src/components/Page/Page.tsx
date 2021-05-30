import { ReactElement } from 'react';
import Navbar from './Navbar';

interface PageProps {
  children: React.ReactElement | ReactElement[];
}

const Page: React.FC<PageProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default Page;
