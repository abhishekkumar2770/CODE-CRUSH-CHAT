import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const { setProgress, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setProgress(0);
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      toast.error("Invalid email");
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
        email,
        password,
      });
      const data = await res.data;
      setUser(data.data);
      localStorage.setItem("token", data.token);
      setProgress(100);
      if (data.success === true) {
        toast.success(data.message);
        e.target.reset();
        navigate("/profile");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
      setProgress(100);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage:
          "url('https://tinder.com/static/build/8ad4e4299ef5e377d2ef00ba5c94c44c.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-gray-800/80 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h4 className="font-bold text-3xl text-white text-center">Login</h4>
        <form onSubmit={handleLogin} className="mt-6">
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="email" className="text-white">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="p-2 border border-gray-700 rounded-md bg-white/20 text-white placeholder-white"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="password" className="text-white">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              required
              className="p-2 border border-gray-700 rounded-md bg-white/20 text-white placeholder-white"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4">
            <button
              type="submit"
              className="w-full sm:w-auto p-3 bg-primary text-white rounded-md hover:bg-primaryDark transition"
            >
              Login
            </button>
            <Link to="/signup" className="text-white text-sm underline">
              Don't have an account? Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
