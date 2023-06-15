import "tailwindcss-elevation";

import React from "react";
//import Image from "next/image";
import Link from "next/link";
import Image from "next/image";
import BRRRLogo from "../../assets/images/BRRRLogo.png";
import { ConnectWallet } from "../Web3Modal/WalletConnect";
import { Dropdown } from "flowbite-react";
export default function HeaderComponent() {
  //    backgroundImage: `url(${backgroundimage})`,

  return (
    <div>
      <nav style={{backgroundColor: '#141414'}} className="px-2 sm:px-4 py-2.5 fixed w-fit sm:w-full z-20 top-0 left-0 border-b border-pink-500">
        <div className="container flex flex-nowrap justify-left items-center mx-auto">
          <div className="md:order-4 justify-right self-right content-right object-right">
            <ConnectWallet></ConnectWallet>
          </div>
          <div className="sm:visible md:hidden">
            <Dropdown label="Navigation">
              <Dropdown.Header>
                <span
                  className="block text-md cursor-pointer block py-2 pr-4 pl-3 text-black rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                  style={{ fontFamily: "Karasha" }}
                >
                  Navigation
                </span>
              </Dropdown.Header>
              <Dropdown.Item>
                <Link href="/">
                  <p
                    className="cursor-pointer block py-2 pr-4 pl-3 text-black rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                    style={{ fontFamily: "Karasha" }}
                  >
                    Dashboard{" "}
                  </p>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <a onClick={() => window.open("https://komatoken.io/")}>
                  <p
                    className="cursor-pointer block py-2 pr-4 pl-3 text-black rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                    style={{ fontFamily: "Karasha" }}
                  >
                    Website
                  </p>
                </a>
              </Dropdown.Item>
              <Dropdown.Divider />
            </Dropdown>
          </div>
          <div
            className="h-0 justify-left self-center items-left text-left w-full md:flex md:h-fit md:w-auto order-1"
            id="navbar-sticky"
          >
            <ul className="invisible md:visible h-auto flex flex-row justify-left self-center text-left items-left p-4 mt-4 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-md md:md:border-0 dark:border-gray-700">
              <li>
                <Image
                  width={50}
                  height={50}
                  src={BRRRLogo}
                  alt="asa"
                ></Image>
              </li>
              <li className={'text-right justify-right content-right'}>
                {" "}
                <a onClick={() => window.open("https://komatoken.io/")}>
                    <p
                      className="text-xl font-bold cursor-pointer block self-center mt-3 py-2 pr-4 pl-3 text-pink-400 md:bg-transparent md:p-0"
                    >
                      Printshop{" "}
                    </p>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
