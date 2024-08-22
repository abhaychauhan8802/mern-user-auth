import { Button, Link } from "@nextui-org/react";
import React from "react";

const Home = () => {
  return (
    <div className="max-w-2xl w-full p-6 mx-auto h-[90vh] flex justify-center items-center flex-col gap-9">
      <div className="mt-16">
        <h1 className="text-2xl sm:text-4xl font-bold text-center text-gray-800">
          Lorem ipsum dolor sit amet.
        </h1>
        <p className="text-md text-gray-600 text-center pt-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum porro
          odio perferendis praesentium voluptatibus voluptatum tempora aliquam a
          quaerat tenetur, itaque assumenda necessitatibus, eos vitae
          consequatur nesciunt commodi ab esse?
        </p>
      </div>
      <Button as={Link} href="/sign-in" className="bg-green-500 text-white">
        Get started
      </Button>
    </div>
  );
};

export default Home;
