
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const Navbar = () => {
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logout successful");
    navigate("/login");
    setUser(null);
  };

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return; // No token, skip

      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/checkAuth`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setUser(res.data.data);
      }
    } catch (error) {
      // Handle 401 Unauthorized
      if (error.response && error.response.status === 401) {
        console.log("Unauthorized, clearing token");
        localStorage.removeItem("token");
        setUser(null);
      } else {
        console.error("Error checking auth:", error);
      }
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
<div className="bg-gradient-to-b from-[#f857a6] to-[#ff5858] flex p-5 flex-col md:flex-row justify-between items-center">
      <div className="flex gap-3">
        <img
          src={user?.profile}
          alt={user?.name}
          width={40}
          height={30}
          className={`rounded-full shadow-inner ${
            user?.profile ? "block" : "hidden"
          }`}
        />
        <h2 className="text-3xl font-concertOne text-white">code-crush</h2>
      </div>
      {!user?.name ? (
        <ul className="flex gap-3 text-white font-ropaSans text-2xl">
          <li className="hover:underline cursor-pointer transition-all duration-300 ease-in-out">
            About
          </li>
          <li className="hover:underline cursor-pointer transition-all duration-300 ease-in-out">
            Download
          </li>
          <li className="hover:underline cursor-pointer transition-all duration-300 ease-in-out">
            Privacy
          </li>
        </ul>
      ) : (
        <ul className="flex gap-3 text-white font-ropaSans text-2xl">
          <Link
            to="/profile"
            className="hover:underline cursor-pointer transition-all duration-300 ease-in-out"
          >
            Feed
          </Link>
          <Link
            to="/profile/chats"
            className="hover:underline cursor-pointer transition-all duration-300 ease-in-out mr-15 ml-10"
          >
            Chats
          </Link>
          <li className="hover:underline cursor-pointer transition-all duration-300 ease-in-out">
            
          </li>
        </ul>
      )}

      <div>
        {user?.name ? (
          <button
            onClick={handleLogout}
            className="font-ropaSans text-2xl text-black px-5 py-1 rounded-full bg-white hover:bg-black hover:text-white transition-all duration-300 ease-in-out"
          >
            Log Out
          </button>
        ) : (
          <Link
            to="/login"
            className="font-ropaSans text-2xl text-black px-5 py-1 rounded-full bg-white hover:bg-black hover:text-white transition-all duration-300 ease-in-out"
          >
            Log In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;

