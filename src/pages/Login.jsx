import { useState } from "react";
import { login } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (user) {
      navigate("/", { replace: true });
    }
  };
  return (
    <form
      className="max-w-xl mx-auto grid gap-y-4 py-4"
      onSubmit={handleSubmit}
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <div className="mt-1">
          <input
            type="text"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-900 rounded-md"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="mt-1 rounded-md">
          <input
            type="password"
            className="shadow-sm focus:ring-indigo-500 border focus:border-indigo-500 block w-full sm:text-sm border-gray-900 h-10 rounded-md"
            placeholder="*******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div>
        <button
          disabled={!email || !password}
          type="submit"
          className="inline-flex disabled:opacity-40 items-center justify-center px-4 py-2 border border-transparent bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 cursor-pointer focus:ring-offset-2 focus:ring-indigo-500 text-white font-medium"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;