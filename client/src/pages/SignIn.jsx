import React, { useState } from "react";
import { Input, Button, Link } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authSuccess } from "../redux/slices/userSlice";

const SignIn = () => {
  const [formField, setFormField] = useState({
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

    const { email, password } = formField;

    if (!email || !password) {
      return setErrorMessage("All fields are required");
    }

    try {
      setErrorMessage(null);
      const res = await fetch("/api/auth/sign-in", {
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
        setErrorMessage(null);
        navigate("/dashboard");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-[91vh] max-w-2xl w-full mx-auto p-6">
      <div className="sm:px-16 md:px-24 mt-20 mb-5">
        <div>
          <h2 className="text-3xl text-gray-800 font-semibold">Sign In</h2>
          <p className="text-md text-gray-500 mt-3">Signin with your email</p>
        </div>

        {errorMessage && (
          <div className="bg-red-300 text-gray-900 my-4 py-3 text-center rounded-lg">
            <span>{errorMessage}</span>
          </div>
        )}

        <form className="mt-10 flex flex-col gap-8" onSubmit={handleSubmit}>
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
          <div className="w-full text-right -mt-5">
            <Link className="underline text-foreground" href="/forgot-password">
              Forget Password?
            </Link>
          </div>
          <Button type="submit" className="bg-green-500 text-white">
            Sign In
          </Button>
        </form>
        <div className="mt-4 text-center">
          <span>
            Don't have an account?{" "}
            <Link href="/sign-up" className="text-green-600">
              Sign Up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
