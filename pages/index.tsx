import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import HeaderComponent from "../components/Header/HeaderComponent";
import "tailwindcss-elevation";
import FooterComponent from "../components/Footer/FooterComponent";
import DualCardComponent from "../components/DualCards/DualCardComponent";
import ScrollpositionAnimation from "../hooks/OnScroll";
import { useEffect, useRef, useState } from "react";
import "@uniswap/widgets/fonts.css";
import goonsHomepage from "../assets/images/GoonsHomepage.jpg";
import goonsLogoMobile from "../assets/images/goonsLogoMobile.jpg";
import KomaInuLogo from "../assets/images/KomaInuLogo.png"
import { useWeb3React } from "@web3-react/core";
import ClaimComponent from "../components/Claim/ClaimComponent";
import MintCardComponent from "../components/Cards/MintCard";
import DropdownComponent from "../components/Dropdown/dropdownmenu";
const Home: NextPage = () => {
  const { account, chainId, active } = useWeb3React();
  const showConnectAWallet = Boolean(!account);
  const context = useWeb3React();
  const { library } = context;
  const [isended, setisended] = useState(false);

  useEffect(() => {
    async function ScrollpositionAnimation() {
      const targets = document.querySelectorAll(".js-show-on-scroll");
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach((entry) => {
          // Is the element in the viewport?
          if (entry.isIntersecting) {
            // Add the fadeIn class:
            entry.target.classList.add("motion-safe:animate-fadeIn");
          } else {
            // Otherwise remove the fadein class
            entry.target.classList.remove("motion-safe:animate-fadeIn");
          }
        });
      });
      // Loop through each of the target
      targets.forEach(function (target) {
        // Hide the element
        target.classList.add("opacity-0");

        // Add the element to the watcher
        observer.observe(target);
      });
      //ScrollpositionAnimation();
    }
    async function scrollpositionAnimationdown() {
      const targets = document.querySelectorAll(".js-show-on-scroll-down");
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach((entry) => {
          // Is the element in the viewport?
          if (entry.isIntersecting) {
            // Add the fadeIn class:
            entry.target.classList.add("motion-safe:animate-fadeindown");
          } else {
            // Otherwise remove the fadein class
            entry.target.classList.remove("motion-safe:animate-fadeindown");
          }
        });
      });
      // Loop through each of the target
      targets.forEach(function (target) {
        // Hide the element
        target.classList.add("opacity-0");

        // Add the element to the watcher
        observer.observe(target);
      });
      //ScrollpositionAnimation();
    }
    async function scrollpositionAnimationleft() {
      const targets = document.querySelectorAll(".js-show-on-scroll-left");
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach((entry) => {
          // Is the element in the viewport?
          if (entry.isIntersecting) {
            // Add the fadeIn class:
            entry.target.classList.add("motion-safe:animate-fadeinleft");
          } else {
            // Otherwise remove the fadein class
            entry.target.classList.remove("motion-safe:animate-fadeinleft");
          }
        });
      });
      // Loop through each of the target
      targets.forEach(function (target) {
        // Hide the element
        target.classList.add("opacity-0");

        // Add the element to the watcher
        observer.observe(target);
      });
      //ScrollpositionAnimation();
    }
    async function scrollpositionAnimationright() {
      const targets = document.querySelectorAll(".js-show-on-scroll-right");
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach((entry) => {
          // Is the element in the viewport?
          if (entry.isIntersecting) {
            // Add the fadeIn class:
            entry.target.classList.add("motion-safe:animate-fadeinright");
          } else {
            // Otherwise remove the fadein class
            entry.target.classList.remove("motion-safe:animate-fadeinright");
          }
        });
      });
      // Loop through each of the target
      targets.forEach(function (target) {
        // Hide the element
        target.classList.add("opacity-0");

        // Add the element to the watcher
        observer.observe(target);
      });
      //ScrollpositionAnimation();
    }
    async function scrollpositionAnimationscaleintopleft() {
      const targets = document.querySelectorAll(
        ".js-show-on-scroll-scaleintopleft"
      );
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach((entry) => {
          // Is the element in the viewport?
          if (entry.isIntersecting) {
            // Add the fadeIn class:
            entry.target.classList.add("motion-safe:animate-scaleintopleft");
          } else {
            // Otherwise remove the fadein class
            entry.target.classList.remove("motion-safe:animate-scaleintopleft");
          }
        });
      });
      // Loop through each of the target
      targets.forEach(function (target) {
        // Hide the element
        target.classList.add("opacity-0");

        // Add the element to the watcher
        observer.observe(target);
      });
      //ScrollpositionAnimation();
    }
    scrollpositionAnimationscaleintopleft();
    scrollpositionAnimationleft();
    scrollpositionAnimationright();
    scrollpositionAnimationdown();

    ScrollpositionAnimation();
  });

  function RenderButtons() {
    setisended(true);
  }

  // <div className={"mb-10 sm:mb-10 md:mb-10 lg:mb-10 xl:mb-0 flex flex-col"}>
  // <Image
  //   className="min-w-0 min-h-0 visible sm:visible md:visible lg:visible xl:min-w-0 xl:min-h-0 xl:invisible"
  //   src={goonsLogoMobile}
  // ></Image>
  // </div>

  return (
    <div className="scroll-smooth">
      <main className={styles.main}>
        <header>
          {" "}
          <HeaderComponent></HeaderComponent>
        </header>
          <h2 style={{fontFamily: 'Karasha'}} className={'text-5xl my-5 mt-10 text-center'}>Komainux</h2>
        <div className="w-1/2 h-1/2 lg:w-1/3 lg:h-1/3 flex flex-col mt-5 mx-auto justify-center">
        <Image src={KomaInuLogo}></Image>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          className={
            "mx-auto self-center content-center items-center justify-center"
          }
        >
          <p className={"my-4 sm:my-4 md:my-6 lg:my-6 xl:my-10"}></p>

          <div
            className={"flex flex-row w-screen object-center justify-center"}
          >
            <button
              style={{ fontFamily: "Karasha" }}
              onClick={() => window.open("https://komatoken.io/")}
              type="button"
              className="text-gray-600 hover:text-black border transition-all duration-600 border-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg text-2xl md:text-3xl px-5 py-3 text-center mr-2 mb-2"
            >
              Website
            </button>
            <button
              style={{ fontFamily: "Karasha" }}
              onClick={() => window.open("https://app.uniswap.org/#/swap?inputCurrency=0x5F5ba036Bd464782894499Fb21aa137d3eA9d757&outputCurrency=ETH")}
              type="button"
              className="text-gray-600 hover:text-black border transition-all duration-600 border-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg text-2xl md:text-3xl px-5 py-3 text-center mr-2 mb-2"
            >
              {" "}
              Buy
            </button>
            <button
              style={{ fontFamily: "Karasha" }}
              onClick={() => window.open("https://etherscan.io/address/0x5f5ba036bd464782894499fb21aa137d3ea9d757")}
              type="button"
              className="text-gray-600 hover:text-black border transition-all duration-600 border-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg text-2xl md:text-3xl px-5 py-3 text-center mr-2 mb-2"
            >
              Token
            </button>
          </div>
        </div>
        <p className={"my-5"}></p>
        <hr className="my-4 mx-auto w-48 h-1 bg-red-500 rounded border-0 md:my-10" />

        <div className={"justify-center flex flex-col"}>
          <ClaimComponent></ClaimComponent>
        </div>
      </main>
      <FooterComponent></FooterComponent>
    </div>
  );
};

export default Home;
