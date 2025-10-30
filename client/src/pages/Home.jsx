import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex justify-center items-center flex-col h-[80vh] gap-8">
      <h1 className="text-4xl md:text-8xl font-concertOne text-white">
        Try something epic...
      </h1>
      <Link to={`/profile`} className="bg-primary font-ropaSans text-xl text-white px-3 py-2 rounded-full hover:bg-primaryLight transition-all duration-300 ease-in-out">
        Find great matches now!
      </Link>
    </div>
  );
};

export default Home;
