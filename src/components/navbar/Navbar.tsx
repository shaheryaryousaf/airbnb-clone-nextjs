"use client";

import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { safeUser } from "@/app/types";

import Categories from "./Categories";

interface NavbarProps {
  currentUser?: safeUser | null;
}

const Navbar = ({ currentUser }: NavbarProps) => {
  return (
    <div className="fixed w-full z-10 bg-white shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};

export default Navbar;
