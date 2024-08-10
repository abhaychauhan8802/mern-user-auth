import React from "react";
import { useSelector } from "react-redux";
import { Avatar, Button, useDisclosure } from "@nextui-org/react";
import SignOutModel from "../components/SignOutModel";

const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.user);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="max-w-2xl w-full h-[90vh] mx-auto p-6 flex flex-col items-center gap-10">
      <div className="mt-28">
        <Avatar
          name={currentUser.name}
          className="w-24 h-24 text-2xl bg-green-200 select-none"
        />
      </div>
      <div className="flex flex-col gap-4 items-center">
        <span className="text-2xl font-semibold">
          {currentUser.name.toUpperCase()}
        </span>
        <span className="text-xl ">{currentUser.email}</span>
      </div>
      <Button color="danger" className="w-2/4" onPress={() => onOpen()}>
        Sign Out
      </Button>
      <SignOutModel isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default Dashboard;
