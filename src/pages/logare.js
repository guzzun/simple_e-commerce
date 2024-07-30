import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import usePostData from "../hooks/usePostData";
import Button from "../components/reusableComponents/Button";
import Input from "../components/reusableComponents/Input";

const Logare = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const loginMutation = usePostData("login");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && accessToken !== "") {
      navigate("/products");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const payload = {
      email: email,
      password: password,
    };

    try {
      const data = await loginMutation.mutateAsync(payload);
      localStorage.setItem("accessToken", data.accessToken);
      navigate("/products");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="w-full min-h-screen font-sans bg-gray-100">
      <div className="mt-12 w-full flex flex-col items-center">
        <form
          className="w-1/3 bg-white p-8 rounded-lg"
          onSubmit={(e) => handleLogin(e)}
        >
          {error && (
            <p className="text-red-600 text-sm mb-2 text-right">{error}</p>
          )}

          <h2 className="text-2xl font-bold mb-6 text-right">Login</h2>
          <label htmlFor="email" className="block text-gray-600 font-medium mb-2">
            Email
          </label>

          <Input
            type="email"
            name="email"
            id="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label
            htmlFor="password"
            className="block text-gray-600 font-medium mb-2"
          >
            Password
          </label>

          <Input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(null);
            }}
          />

          <Button
            text={loginMutation.isLoading ? "Authentication..." : "Login"}
            disabled={loginMutation.isLoading}
            type="submit"
          />

          <p className="text-center">
            Don&apos;t have an account?
            <Link to="/registrare">
              <span className="text-blue-600 font-semibold"> Register.</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Logare;
