// client/src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { authService } from "../services/api";
import { useContext, useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(authService.getCurrentUser());
  const navigate = useNavigate();
  const { dark, setDark } = useContext(ThemeContext);

  const logout = () => {
    authService.logout();
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    setUser(authService.getCurrentUser());
  }, []);

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow">
    <Link to="/" className="text-xl font-bold hover:text-blue-300">
        MERN Blog
    </Link>

    <div className="flex items-center space-x-6">
      <button
        onClick={() => setDark(!dark)}
        className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded"
      >
        {dark ? "Light" : "Dark"} Mode
      </button>
      <Link className="hover:text-blue-300" to="/">Home</Link>
      <Link className="hover:text-blue-300" to="/create">Create Post</Link>
      {user && <Link to="/categories">Categories</Link>}

      {!user && (
        <>
          <Link className="hover:text-blue-300" to="/login">Login</Link>
          <Link className="hover:text-blue-300" to="/register">Register</Link>
        </>
      )}

      {user && (
        <button
          onClick={logout}
          className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
        >
          Logout
        </button>
      )}
    </div>
    </nav>
  );
}
