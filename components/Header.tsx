import React from "react";
import Image from "next/image";
import {
  HomeIcon,
  ChevronDownIcon,
  SearchIcon,
  MenuIcon,
} from "@heroicons/react/solid";
import {
  StarIcon,
  GlobeIcon,
  PlusIcon,
  SparklesIcon,
  SpeakerphoneIcon,
  VideoCameraIcon,
  BellIcon,
  ChatIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from 'next/link'

const Header = () => {
  const { data: session } = useSession();
  return (
    <div className="stiky top-0 flex z-50s bg-white items-center  px-4 py-2 shadow-md">
      <div className="relative h-10 w-20">
        <Link href="/">
          <Image
            src="https://links.papareact.com/fqy"
            objectFit="contain"
            layout="fill"
          />
        </Link>
      </div>

      <div className="flex mx-7 items-center xl:min-w-[300px]">
        <HomeIcon className="w-5 h-5" />
        <p className="flex-1 ml-2 hidden lg:inline">HOME</p>
        <ChevronDownIcon className="w-5 h-5" />
      </div>

      <form
        className="flex flex-1 items-center space-x-2 border rounded-2xl border-gray-200
          bg-gray-100 px-3 py-1"
      >
        <SearchIcon className="w-6 h-6 text-gray-400" />
        <input
          className="flex-1 bg-transparent ou"
          type="text"
          placeholder="Search Reddit"
        />
        <button type="submit" hidden />
      </form>

      <div className=" text-gray-500 mx-5 items-center space-x-2 hidden lg:inline-flex">
        <SparklesIcon className="icon" />
        <GlobeIcon className="icon" />
        <VideoCameraIcon className="icon" />
        <hr className="h-10 border border-gray-100" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <PlusIcon className="icon" />
        <SpeakerphoneIcon className="icon" />
      </div>
      <div className="ml-5 flex items-center lg:hidden">
        <MenuIcon className="icon" />
      </div>
      {session ? (
        <div
          onClick={() => signOut()}
          className="hidden lg:flex items-center space-x-2 cursor-pointer  border border-gray-100 p-2 "
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image
              src="https://links.papareact.com/23l"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="flex-1 text-xs">
            <p className="truncate text-gray-400">{session?.user?.name}</p>
            <p className="text-gray-400">1 Karma</p>
          </div>
          <ChevronDownIcon className="h-5 flex-shrink-0  text-gray-400" />
        </div>
      ) : (
        <div
          onClick={() => signIn()}
          className="hidden lg:flex items-center space-x-2 cursor-pointer  border border-gray-100 p-2 "
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image
              src="https://links.papareact.com/23l"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <p className="text-gray-400">Sign In</p>
        </div>
      )}
    </div>
  );
};

export default Header;
