import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import usePostData from "../hooks/usePostData";
import Button from "../components/reusableComponents/Button";
import Input from "../components/reusableComponents/Input";

const Registrare = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(null);

  const mutation = usePostData("register");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
    };

    try {
      await mutation.mutateAsync(payload);
      navigate("/logare");
    } catch (error) {
      console.error("Error", error);
        setError(error.message);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 pb-12">
      <div className="mt-12 flex flex-col items-center justify-center lg:py-0">
        <div className="w-fit bg-white rounded-lg shadow">
          <div className="p-6 space-y-4  sm:p-8">
            {error && (
              <p className="text-red-600 text-sm mb-2 text-right">{error}</p>
            )}

            <h2 className="text-2xl font-bold text-gray-900 text-right">
              <span className="text-sm font-light text-white">
                _________________________________
              </span>
              Create and account
            </h2>

            <form onSubmit={handleSubmit} action="#">
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-600 font-medium mb-2"
                >
                  Your email
                </label>

                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="FName"
                  className="block text-gray-600 font-medium mb-2"
                >
                  First Name
                </label>

                <Input
                  type="text"
                  name="FName"
                  id="FName"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="LName"
                  className="block text-gray-600 font-medium mb-2"
                >
                  Last Name
                </label>

                <Input
                  type="text"
                  name="LName"
                  id="LName"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-gray-600 font-medium mb-2"
                >
                  Phone Number
                </label>

                <Input
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                />
              </div>
              <div>
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
              </div>

              <Button
                text={mutation.isLoading ? "Create..." : "Create an account"}
                disabled={mutation.isLoading}
                type="submit"
              />

              <p className="text-center">
                Already have an account?{" "}
                <a href="/logare" className="text-blue-600 font-semibold">
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registrare;
