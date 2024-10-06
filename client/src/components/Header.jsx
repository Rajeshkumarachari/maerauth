import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className=" bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className=" font-semibold text-xl">Authentication App</h1>
        </Link>
        <ul className=" flex text-lg font-medium">
          <Link to="/">
            <li className=" hover:bg-slate-300 py-1 px-2 rounded-md">Home</li>
          </Link>
          <Link to="about">
            <li className=" hover:bg-slate-300 py-1 px-2 rounded-md">About</li>
          </Link>
          <Link to="sign-in">
            <li className=" hover:bg-slate-300 py-1 px-2 rounded-md">
              Sign In
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
