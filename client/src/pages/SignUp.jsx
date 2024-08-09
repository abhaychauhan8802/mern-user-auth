import React, { useState } from "react";
import { Input, Button, Link } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authSuccess } from "../redux/slices/userSlice";

const SignUp = () => {
  const [formField, setFormField] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormField({ ...formField, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = formField;

    if (!name || !email || !password) {
      return setErrorMessage("All fields are required");
    }

    try {
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formField),
      });

      const data = await res.json();

      if (data.success === false) {
        return setErrorMessage(data.message);
      }

      if (res.ok) {
        dispatch(authSuccess(data));
        navigate("/verify-email");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-[90vh] max-w-2xl w-full mx-auto p-6">
      <div className="sm:px-16 md:px-24 mt-20 mb-5">
        <div>
          <h2 className="text-3xl text-gray-800 font-semibold">Sign Up</h2>
          <p className="text-md text-gray-500 mt-3">Make a new account</p>
        </div>

        {errorMessage && (
          <div className="bg-red-300 text-gray-900 my-4 py-3 text-center rounded-lg">
            <span>{errorMessage}</span>
          </div>
        )}

        <form className="mt-10 flex flex-col gap-8" onSubmit={handleSubmit}>
          <Input
            type="text"
            label="Name"
            id="name"
            labelPlacement="outside"
            placeholder="Enter your name"
            value={formField.name}
            onChange={handleChange}
          />
          <Input
            type="email"
            label="Email"
            id="email"
            labelPlacement="outside"
            placeholder="Enter your email"
            value={formField.email}
            onChange={handleChange}
          />
          <Input
            type="password"
            label="Password"
            id="password"
            labelPlacement="outside"
            placeholder="Enter your password"
            value={formField.password}
            onChange={handleChange}
          />
          <Button type="submit" className="bg-green-500 text-white">
            Sign Up
          </Button>
        </form>
        <div className="mt-4 text-center">
          <span>
            Already have an account?{" "}
            <Link href="/sign-in" className="text-green-600">
              Sign In
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
