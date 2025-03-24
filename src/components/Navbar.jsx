import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await axios.post('https://backend-iota-tan-15.vercel.app/api/auth/logout', {}, { withCredentials: true });
    navigate('/login');
  };

  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      <Link to="/" className="text-white text-xl font-bold">Post App</Link>
      <div>
        <Link to="/login" className="text-white px-3">Login</Link>
        <Link to="/signup" className="text-white px-3">Signup</Link>
        <button onClick={handleLogout} className="text-white bg-red-500 px-3 py-1 rounded">Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
