import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      {'Home ✨'}
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Home;
