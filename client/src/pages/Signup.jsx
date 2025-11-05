
import { useState, useContext } from "react";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { useUpload } from "../hooks/useUpload";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [image, setImage] = useState(null);
  const { setProgress } = useContext(AppContext);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file.size > 1000000) {
      toast.error("Image size must be less than 1MB");
      return;
    }
    setImage(file);
  };

  const onUploadProgress = (progressEvent) => {
    const progress = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    setProgress(progress);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const name = e.target.name.value;
      const password = e.target.password.value;
      const email = e.target.email.value;

      if (!name || !email || !password || !image) {
        return toast.error("All fields are required");
      }
      if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
        return toast.error("All fields are required");
      }
      if (name.length < 3 || (!email.includes("@") && !email.includes("."))) {
        return toast.error("Please enter valid data");
      }

      const { public_id, url } = await useUpload({ image, onUploadProgress });
      if (!public_id || !url) {
        toast.error("Error uploading image");
        return;
      }

      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/signup `, {
        name,
        email,
        password,
        profile: url,
        publicId: public_id,
      });

      const data = await res.data;
      if (data.success === true) {
        toast.success(data.message);
        e.target.reset();
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
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
      <div className="bg-gray-800/80 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        <h2 className="font-bold text-2xl sm:text-3xl text-white text-center">
          Let's create your profile
        </h2>
        <form className="grid sm:grid-cols-2 gap-5 mt-6" onSubmit={handleSignup}>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-white">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="p-2 border border-gray-700 rounded-md bg-white/20 text-white placeholder-white"
              placeholder="Enter your name"
            />
          </div>
          <div className="flex flex-col gap-2">
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
          <div className="flex flex-col gap-2">
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
          <div className="flex flex-col gap-2">
            <label htmlFor="profile" className="text-white">Profile Image</label>
            <input
              type="file"
              name="profile"
              accept="image/*"
              id="profile"
              onChange={handleImageChange}
              required
              className="p-2 border border-gray-700 rounded-md text-white"
            />
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full p-3 bg-primary text-white rounded-md hover:bg-primaryDark transition"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
