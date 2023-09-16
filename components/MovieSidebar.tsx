import Image from "next/image";
import React from "react";
import logoImg from "../public/logo.png";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

function MovieSidebar() {
  const sidebarItems = [
    {
      name: "home",
      title: "Home",
      icon: "/Home.png"
    },
    {
      name: "movies",
      title: "Movies",
      icon: "/Movie_Projector.png"
    },
    {
      name: "tv_series",
      title: "TV Series",
      icon: "/TV_Show.png"
    },
    {
      name: "upcoming",
      title: "Upcoming",
      icon: "/Calendar.png"
    },
  ];
  const selectedSidebar = "movies";

  return (
    <div className="hidden fixed top-0 left-0 w-[226px] h-screen sm:flex flex-col items-center justify-start py-4 pb-8 rounded-r-[45px] rounded-b-[30px] border-r-solid border-r-[1px] border-opacity-30 ">
      <Link
        href="/"
        className="w-full min-h-[70px] flex items-center gap-6 px-4"
      >
        <Image
          src={logoImg}
          className={"w-[25px] h-[25px] md:w-[35px] md:h-[35px] "}
          width={50}
          height={50}
          alt="image"
        />
        <p className="text-dark-100 font-ppB text-[13px] md:text-[16px] ">
          MovieBox
        </p>
      </Link>
      <div className="w-full h-full mt-7 mb-3 flex flex-col items-center justify-start">
        {sidebarItems.map((d) => (
          <button
            className={twMerge(
              "w-full py-5  hover:bg-red-100 hover:border-r-red-400 flex items-center justify-start gap-5 px-4 border-r-solid border-r-[4px] text-dark-100 hover:text-red-306 border-r-transparent ",
              selectedSidebar === d.name && "border-r-red-400 bg-red-100"
            )}
            key={d.name}
          >
            <Image
              src={d.icon}
              className={"w-[25px]"}
              width={25}
              height={25}
              alt="menu icon"
            />
            <span
              className={twMerge(
                " text-[18px] font-ppB text-white-400 ",
                selectedSidebar === d.name && "text-red-500"
              )}
            >
              {d.title}
            </span>
          </button>
        ))}
      </div>
      <div className="flex flex-col items-center p-4 py-5 gap-3 w-[170px] rounded-xl border border-pink-400 bg-pink-100 bg-opacity-40">
        <p className="text-gray-700 text-opacity-80 text-[15px] font-semibold">
          Play movie quizes and earn free tickets
        </p>
        <p className="text-[#666] text-xs font-medium">
          50k people are playing now
        </p>
        <button className="rounded-3xl bg-pink-400 bg-opacity-20 px-4 py-2 text-xs text-red-500 font-medium">
          Start Playing
        </button>
      </div>
      <div className="flex w-[124px] h-[30px] gap-4 mt-3 mb-1">
        <Image
          src="/Logout.png"
          className={"w-[25px]"}
          width={30}
          height={30}
          alt="logout icon"
        />
        <p className="text-[#666] text-lg font-semibold">Log out</p>
      </div>
    </div>
  );
}

export default MovieSidebar;