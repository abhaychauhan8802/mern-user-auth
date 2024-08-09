import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";

const SignUp = () => {
  const [formField, setFormField] = useState({
    name: "",
    email: "",
    password: "",
  });

  console.log(formField);

  const handleChange = (e) => {
    setFormField({ ...formField, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-[90vh] max-w-2xl w-full mx-auto p-6">
      <div className="sm:px-16 md:px-24 mt-20">
        <div>
          <h2 className="text-3xl text-gray-800 font-semibold">Sign Up</h2>
          <p className="text-md text-gray-500 mt-3">Make a new account</p>
        </div>

        <form className="mt-12 flex flex-col gap-8" onSubmit={handleSubmit}>
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
            Sing Up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
