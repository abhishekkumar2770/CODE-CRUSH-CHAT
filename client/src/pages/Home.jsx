// import { Link } from "react-router-dom";

// const Home = () => {
//   return (
//     <div
//       className="flex justify-center items-center flex-col h-screen gap-8"
//       style={{
//         backgroundImage:
//           "url('https://tinder.com/static/build/8ad4e4299ef5e377d2ef00ba5c94c44c.webp')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       <h1 className="text-7xl md:text-9xl font-concertOne font-extrabold text-white text-center py">
//         Try something epic...
//       </h1>
//       <Link
//         to={`/signup`}
//         className="bg-primary font-ropaSans text-xl text-white px-6 py-3 rounded-full hover:bg-primaryLight transition-all duration-300 ease-in-out"
//       >
//         Create account
//       </Link>
//     </div>
//   );
// };

// export default Home;
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="flex justify-center items-center flex-col h-screen gap-8"
      style={{
        backgroundImage:
          "url('https://tinder.com/static/build/8ad4e4299ef5e377d2ef00ba5c94c44c.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="text-7xl md:text-9xl font-bebas font-extrabold text-center text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.7)]">
        Try something epic...
      </h1>
      <Link
        to={`/signup`}
        className="bg-primary font-ropaSans text-xl text-white px-6 py-3 rounded-full hover:bg-primaryLight transition-all duration-300 ease-in-out"
      >
        Create account
      </Link>
    </div>
  );
};

export default Home;
