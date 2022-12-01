import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import {
  SearchIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { RootState } from "../../redux/store";

const Header: React.FC = () => {
  const [session, setSession] = useState<boolean>(false);
  const { cart } = useSelector((state: RootState) => state);

  return (
    <header className="fixed top-0 z-30 flex w-full items-center justify-between bg-[#E7ECEE] p-4">
      <div className="flex items-center justify-center md:w-1/5">
        <Link href="/">
          <div className="relative h-10 w-5 cursor-pointer opacity-75 transition hover:opacity-100">
            <Image
              src="https://rb.gy/vsvv2o"
              alt="logo"
              width={20}
              height={40}
              objectFit="contain"
              className="h-full w-full object-contain"
            />
          </div>
        </Link>
      </div>
      <div className=" hidden flex-1 items-center justify-center gap-8 md:flex">
        <a href="" className="headerLink">
          Product
        </a>
        <a href="" className="headerLink">
          Explore
        </a>
        <a href="" className="headerLink">
          Support
        </a>
        <a href="" className="headerLink">
          Business
        </a>
      </div>

      <div className=" flex items-center justify-center gap-x-4 md:w-1/5">
        <SearchIcon className="headerIcon" />
        <Link href="/checkout">
          <div className="relative cursor-pointer">
            {cart.items.length > 0 && (
              <span className="absolute -right-2 -top-1 z-50 box-content flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 p-0.5 text-[12px] font-medium  text-white">
                {cart.items.length}
              </span>
            )}
            <ShoppingBagIcon className="headerIcon" />
          </div>
        </Link>

        {session ? (
          <Image
            src="https://res.cloudinary.com/nomame/image/upload/v1665487995/t-network/quackb58qa7cr29fyzis.jpg"
            alt="avatar"
            className="h-8 w-8 cursor-pointer rounded-full"
            width={32}
            height={34}
          />
        ) : (
          <UserIcon className="headerIcon" />
        )}
      </div>
    </header>
  );
};

export default Header;
