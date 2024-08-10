import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      return setErrorMessage("Password fields is required");
    }

    try {
      setErrorMessage(null);

      const token = location.pathname.split("/")[2];

      const res = await fetch(`/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: password }),
      });

      const data = await res.json();

      if (data.success === false) {
        return setErrorMessage(data.message);
      }

      if (res.ok) {
        setErrorMessage(null);
        navigate("/sign-in");
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
            Reset Password
          </h2>
          <p className="text-md text-gray-500 mt-3">Create a new password</p>
        </div>

        {errorMessage && (
          <div className="bg-red-300 text-gray-900 my-4 py-3 text-center rounded-lg">
            <span>{errorMessage}</span>
          </div>
        )}

        <form className="mt-10 flex flex-col gap-8" onSubmit={handleSubmit}>
          <Input
            type="password"
            label="Password"
            id="password"
            labelPlacement="outside"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" className="bg-green-500 text-white">
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
