import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className=" p-3 max-w-lg mx-auto">
      <h1 className=" text-2xl text-center my-2 font-medium">Sign Up</h1>
      <form className=" flex flex-col gap-4 ">
        <input
          type="text"
          placeholder="User Name"
          id="username"
          className=" bg-slate-100 p-3 rounded-md"
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className=" bg-slate-100 p-3 rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className=" bg-slate-100 p-3 rounded-md"
        />
        <button className=" bg-slate-800 text-white p-3 rounded-md hover:opacity-95 disabled:opacity-80">
          Sign up
        </button>
      </form>
      <div className="flex mt-3 gap-3">
        <p>Have an account ? </p>
        <Link to="sign-in">
          <span className=" text-blue-500 font-medium">Sign in</span>
        </Link>
      </div>
    </div>
  );
}
