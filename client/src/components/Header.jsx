import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log("currentUser" + currentUser);
  return (
    <div className=" bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className=" font-semibold text-xl">Authentication App</h1>
        </Link>
        <ul className=" flex text-base">
          <Link to="/">
            <li className=" hover:bg-slate-300 py-1 px-2 rounded-md">Home</li>
          </Link>
          <Link to="/about">
            <li className=" hover:bg-slate-300 py-1 px-2 rounded-md">About</li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt="profilePicture"
                className=" size-7 rounded-full object-cover"
              />
            ) : (
              <li className=" hover:bg-slate-300 py-1 px-2 rounded-md">
                Sign In
              </li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
