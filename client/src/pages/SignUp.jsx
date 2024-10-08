import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  return (
    <div className=" p-3 max-w-lg mx-auto">
      <h1 className=" text-2xl text-center my-2 font-medium">Sign Up</h1>
      <form onSubmit={handleSubmit} className=" flex flex-col gap-4 ">
        <input
          type="text"
          placeholder="User Name"
          id="username"
          className=" bg-slate-100 p-3 rounded-md"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className=" bg-slate-100 p-3 rounded-md"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className=" bg-slate-100 p-3 rounded-md"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className=" bg-slate-800 text-white p-3 rounded-md hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign up"}
        </button>
        <OAuth />
      </form>
      <div className="flex mt-3 gap-3">
        <p>Have an account ? </p>
        <Link to="/sign-in">
          <span className=" text-blue-500 font-medium">Sign in</span>
        </Link>
      </div>
      <p className=" text-red-700 m">{error && "Something went wrong"} </p>
    </div>
  );
}
