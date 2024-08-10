import React, { useState } from "react";
import { Input, Button, Link } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authSuccess } from "../redux/slices/userSlice";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [resData, setResData] = useState(null);

  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      return setErrorMessage("All fields are required");
    }

    try {
      setErrorMessage(null);
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success === false) {
        return setErrorMessage(data.message);
      }

      if (res.ok) {
        setErrorMessage(null);
        setResData(data);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-[90vh] max-w-2xl w-full mx-auto p-6">
      <div className="sm:px-16 md:px-24 mt-20 mb-5">
        <div>
          <h2 className="text-3xl text-gray-800 font-semibold">
            Forgot Password
          </h2>
          <p className="text-md text-gray-500 mt-3">Enter your email</p>
        </div>

        {errorMessage && (
          <div className="bg-red-300 text-gray-900 my-4 py-3 text-center rounded-lg">
            <span>{errorMessage}</span>
          </div>
        )}

        {resData ? (
          <>
            <div className="mt-10 flex flex-col gap-8">
              <h2>{resData}</h2>
              <Button variant="flat" as={Link} href="/sign-in">
                Go back to SignIn
              </Button>
            </div>
          </>
        ) : (
          <form className="mt-10 flex flex-col gap-8" onSubmit={handleSubmit}>
            <Input
              type="email"
              label="Email"
              id="email"
              labelPlacement="outside"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" className="bg-green-500 text-white">
              Forgot Password
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
