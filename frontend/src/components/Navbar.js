const { Link } = require("react-router-dom");

const Navbar = () => {
  return (
    <header>
      <div className="mb-2">
        <Link to="/">
          <h1 className="text-3xl font-extrabold bg-white py-8 px-20">
            Ivan Workout
          </h1>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
