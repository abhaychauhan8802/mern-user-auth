import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Link,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import SignOutModel from "./SignOutModel";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { currentUser } = useSelector((state) => state.user);

  const location = useLocation();

  const handleClose = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <Navbar onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle className="md:hidden" />

          <NavbarBrand>
            <span className="text-2xl font-bold">Auth</span>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent justify="center" className="hidden md:flex gap-7">
          <NavbarItem>
            <Link
              href="/"
              className={`font-semibold ${
                location.pathname === "/" ? "text-green-600" : "text-foreground"
              }`}
            >
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              href="/about"
              className={`font-semibold ${
                location.pathname === "/about"
                  ? "text-green-600"
                  : "text-foreground"
              }`}
            >
              About
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              href="/contact-us"
              className={`font-semibold ${
                location.pathname === "/contact-us"
                  ? "text-green-600"
                  : "text-foreground"
              }`}
            >
              Contact Us
            </Link>
          </NavbarItem>
        </NavbarContent>

        {currentUser ? (
          <NavbarContent justify="end">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  name={currentUser.name}
                  className="cursor-pointer"
                  classNames={{
                    base: "bg-green-100",
                    name: "font-semibold select-none",
                  }}
                />
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem textValue="profile">
                  <Link href="/dashboard" className="w-full" color="foreground">
                    Profile
                  </Link>
                </DropdownItem>
                <DropdownItem
                  className="text-danger"
                  color="danger"
                  onPress={() => onOpen()}
                >
                  Sign Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
        ) : (
          <NavbarContent justify="end">
            <NavbarItem className="hidden sm:block">
              <Button
                as={Link}
                href="/sign-in"
                variant="bordered"
                className="border-green-500"
              >
                Sign In
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                href="/sign-up"
                className="bg-green-500 text-white"
              >
                Sign Up
              </Button>
            </NavbarItem>
          </NavbarContent>
        )}

        <NavbarMenu>
          <NavbarMenuItem>
            <Link
              href="/"
              className={`font-semibold ${
                location.pathname === "/" ? "text-green-600" : "text-foreground"
              }`}
              onPress={handleClose}
            >
              Home
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link
              href="/about"
              className={`font-semibold ${
                location.pathname === "/about"
                  ? "text-green-600"
                  : "text-foreground"
              }`}
              onPress={handleClose}
            >
              About
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link
              href="/contact-us"
              className={`font-semibold ${
                location.pathname === "/contact-us"
                  ? "text-green-600"
                  : "text-foreground"
              }`}
              onPress={handleClose}
            >
              Contact Us
            </Link>
          </NavbarMenuItem>
          {!currentUser && (
            <NavbarMenuItem>
              <Link
                href="/sign-in"
                className="text-green-600 font-semibold sm:hidden"
              >
                Sign In
              </Link>
            </NavbarMenuItem>
          )}
        </NavbarMenu>
      </Navbar>
      <SignOutModel isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Header;
