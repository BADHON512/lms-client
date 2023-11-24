import Link from "next/link";
import React, { FC } from "react";

export const navItemsData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Courses",
    url: "/courses",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Policy",
    url: "/policy",
  },
  {
    name: "FAQ",
    url: "/faq",
  },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
};

const NavItem: FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      <div className="hidden 800px:flex">
        {navItemsData &&
          navItemsData.map((v, i) => (
            <Link
              href={`${v.url}`}
              key={i}
              passHref
              className={`${
                activeItem === i
                  ? "dark:text-[#37a39a] text-[crimson]"
                  : "dark:text-white text-black"
              } text-[18px] px-6 font-Poppins font-[400]`}
            >
              {v.name}
            </Link>
          ))}
      </div>

      {isMobile && (
        <div className="800px:hidden mt-5">
          <div className="w-full text-center my-6">
            <Link href={"/"} passHref>
              <span className="text-[25px] font-Poppins font-[500] dark:text-white">
                ELearning
              </span>
            </Link>
          </div>
          {navItemsData &&
            navItemsData.map((v, i) => (
              <Link key={i} href={"/"} passHref>
                <span
                  className={`${
                    activeItem === i
                      ? "dark:text-[#37a39a] text-[crimson]"
                      : "dark:text-white text-black"
                  } block py-6 text-[18px] px-6 font-Poppins font-[400]`}
                >
                  {v.name}
                </span>
              </Link>
            ))}
        </div>
      )}
    </>
  );
};

export default NavItem;
