import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import OtpInput from "react-otp-input";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authSuccess } from "../redux/slices/userSlice";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [resendSuccess, setResendSuccess] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      return setErrorMessage("Plese fill the otp");
    }

    try {
      setErrorMessage(null);
      const res = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: otp }),
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

  const handleResend = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/resend-code", {
        method: "POST",
      });

      const data = await res.json();

      if (data.success === false) {
        return setErrorMessage(data.message);
      }

      if (res.ok) {
        setResendSuccess(data);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-[90vh] max-w-2xl w-full mx-auto p-6">
      <div className="sm:px-16 md:px-24 mt-20 mb-5">
        <div>
          <h2 className="text-3xl text-gray-800 font-semibold">Verify Email</h2>
          <p className="text-md text-gray-500 mt-3">
            Please enter your opt here
          </p>
        </div>

        {errorMessage && (
          <div className="bg-red-300 text-gray-900 my-4 py-3 text-center rounded-lg">
            <span>{errorMessage}</span>
          </div>
        )}

        {resendSuccess && (
          <div className="bg-green-300 text-gray-900 my-4 py-3 text-center rounded-lg">
            <span>{resendSuccess}</span>
          </div>
        )}

        <form
          className="mt-10 flex flex-col items-center gap-8"
          onSubmit={handleSubmit}
        >
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderInput={(props) => <input {...props} />}
            containerStyle={{
              display: "flex",
              gap: "10px",
            }}
            inputStyle={{
              backgroundColor: "#e4e4e7",
              height: "45px",
              width: "45px",
              borderRadius: "10px",
            }}
          />
          <Button type="submit" className="bg-green-500 text-white w-full">
            Verify Email
          </Button>
        </form>
        <div className="w-full text-center mt-3">
          <span>
            Not receive code?{" "}
            <button
              className="text-green-600 hover:text-green-800"
              onClick={handleResend}
            >
              Resend otp
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
