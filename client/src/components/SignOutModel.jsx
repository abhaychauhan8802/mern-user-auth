import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { authSuccess } from "../redux/slices/userSlice";

const SignOutModel = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    onClose();
    try {
      const res = await fetch("/api/auth/sign-out", {
        method: "POST",
      });

      if (res.ok) {
        dispatch(authSuccess(null));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Sign Out
              </ModalHeader>
              <ModalBody>
                <p>Are you sure, you want to sign out</p>
              </ModalBody>
              <ModalFooter>
                <Button color="" variant="ghost" onPress={onClose}>
                  Cancle
                </Button>
                <Button color="danger" onPress={handleSignOut}>
                  Sign Out
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SignOutModel;
