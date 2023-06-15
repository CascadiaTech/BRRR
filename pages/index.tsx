import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import HeaderComponent from "../components/Header/HeaderComponent";
import "tailwindcss-elevation";
import FooterComponent from "../components/Footer/FooterComponent";
import DualCardComponent from "../components/DualCards/DualCardComponent";
import ScrollpositionAnimation from "../hooks/OnScroll";
import { useCallback, useEffect, useRef, useState } from "react";
import "@uniswap/widgets/fonts.css";
import goonsHomepage from "../assets/images/GoonsHomepage.jpg";
import goonsLogoMobile from "../assets/images/goonsLogoMobile.jpg";
import KomaInuLogo from "../assets/images/KomaInuLogo.png";
import { useWeb3React } from "@web3-react/core";
import {
  ExternalProvider,
  JsonRpcFetchFunc,
  Web3Provider,
} from "@ethersproject/providers";
import Graphic from "../assets/images/Graphic.png";
import BurnedGraphic from "../assets/images/BurnedGraphic.png";
import CalcGraphic from "../assets/images/CalcGraphic.png";
import DropGraphic from "../assets/images/DropGraphic.png";
import MCapGraphic from "../assets/images/MCapGraphic.png";
import LiqGraphic from "../assets/images/LiqGraphic.png";
import BRRMEME from "../assets/images/BRRmeme.png";
import Image from "next/image";
import ClaimComponent from "../components/Claim/ClaimComponent";
import MintCardComponent from "../components/Cards/MintCard";
//import DropdownComponent from "../components/Dropdown/dropdownmenu";
import { ConnectWallet } from "../components/Web3Modal/WalletConnect";
import { SwapWidget, Theme, darkTheme } from "@uniswap/widgets";
import Swal from "sweetalert2";
import { Contract } from "@ethersproject/contracts";
import { abiObject } from "../contracts/abi/abi.mjs";
const Home: NextPage = () => {
  const { account, chainId, active } = useWeb3React();
  const showConnectAWallet = Boolean(!account);
  const context = useWeb3React();
  const [burn, setcanburn] = useState(Boolean);
  const [loading, setLoading] = useState(false);
  const [uniswaprovider, setuniswapprivder] = useState();
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
    ScrollpositionAnimation();
  });

  const Burntoken = useCallback(async () => {
    if (!account) {
      Swal.fire({
        icon: "error",
        title: "Connect Your Wallet To Claim",
        timer: 5000,
      });
    }

    try {
      setLoading(true);
      const data = abiObject;
      const abi = data;
      const contractaddress = "0x5F5ba036Bd464782894499Fb21aa137d3eA9d757"; // "clienttokenaddress"
      const provider = new Web3Provider(
        library?.provider as ExternalProvider | JsonRpcFetchFunc
      );
      //const provider = getDefaultProvider()
      const signer = provider.getSigner();
      const contract = new Contract(contractaddress, abi, signer);
      console.log(contract);
      const BurnTokens = await contract.burn(); //.burn()
      const signtransaction = await signer.signTransaction(BurnTokens);
      const FinalBurn = await signtransaction;
      Swal.fire({
        icon: "success",
        title: "Congratulations you have Burned all of your tokens",
        text: "We shall see you next time when you wish to burn more!",
      });
      return FinalBurn;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [account, library?.provider, burn]);

  useEffect(() => {
    async function setProvider() {
      if (account) {
        const provider = new Web3Provider(
          library?.provider as ExternalProvider | JsonRpcFetchFunc
        );

        return provider;
      } else {
        return;
      }
    }

    setProvider().then((result) => setuniswapprivder(result as any));
  }, [account]);

  const jsonRpcUrlMap = {
    1: ["https://mainnet.infura.io/v3/fc5d70bd4f49467289b3babe3d8edd97"],
    3: ["https://ropsten.infura.io/v3/<YOUR_INFURA_PROJECT_ID>"],
  };

  const theme: Theme = {
    borderRadius: 0,
    fontFamily: '"Mandalore"',
  };
  const MY_TOKEN_LIST = [
    {
      name: "Cosmic Odyssey",
      address: "0xb99405b00eF8D0Cf17aEf9D46a8d3cB9f3b72e57",
      symbol: "COSMIC",
      decimals: 18,
      chainId: 1,
    },
  ];

  const addTokenToMM = async () => {
    try {
      const { ethereum }: any = window;
      await ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: "0xb99405b00eF8D0Cf17aEf9D46a8d3cB9f3b72e57", // ERC20 token address
            symbol: `COSMIC`,
            decimals: 18,
          },
        },
      });
    } catch (ex) {
      // We don't handle that error for now
      // Might be a different wallet than Metmask
      // or user declined
      console.error(ex);
    }
  };

  return (
    <div className="scroll-smooth flex-col">
      <main className={styles.main}>
        <header>
          {" "}
          <HeaderComponent></HeaderComponent>
        </header>
        <div className="sm:w-1/2 py-6 mx-auto justify-center flex flex-col lg:w-fit lg:flex-row mt-20 py-5 rounded-2xl">
          <div className={"flex flex-col mx-0 lg:mx-10"}>
            <div
              className={
                "flex flex-col mx-auto justify-center lg:flex-row px-10 py-4 rounded-2xl h-fit w-fit"
              }
              style={{ backgroundColor: "#171717" }}
            >
              <h1 className={"text-2xl text-left text-pink-500 w-fit"}>
                Pillar functions
              </h1>
              <div className={"flex flex-col mx-5"}>
                <Image width={100} height={150} src={Graphic}></Image>
                <p className={"text-center"}>TBA</p>
                <button
                  style={{ backgroundColor: "#040024" }}
                  className={"rounded-xl px-10 py-3"}
                >
                  Buyback
                </button>
              </div>
              <div className={"flex flex-col mx-5"}>
                <Image width={100} height={150} src={BurnedGraphic}></Image>
                <p className={"text-center"}>TBA</p>
                <button
                  style={{ backgroundColor: "#040024" }}
                  className={"rounded-xl px-10 py-3"}
                >
                  Burrrrned
                </button>
              </div>
              <div className={"flex flex-col mx-5"}>
                <Image width={100} height={150} src={DropGraphic}></Image>
                <p className={"text-center"}>TBA</p>
                <button
                  style={{ backgroundColor: "#040024" }}
                  className={" rounded-xl px-10 py-3"}
                >
                  Brrrrdrop
                </button>
              </div>
            </div>

            <div
              className={
                "flex flex-col mx-auto my-10 justify-center lg:flex-row px-6 py-4 rounded-2xl h-fit w-fit"
              }
              style={{ backgroundColor: "#171717" }}
            >
              <div className={"flex flex-row"}>
                <h1 className={"text-2xl text-left text-pink-500"}>
                  $BRRR Tokenomics
                </h1>
              </div>
              <div
                style={{ backgroundColor: "#212121" }}
                className={"rounded-2xl my-2 mx-5 h-fit py-4 px-4"}
              >
                <div className={"flex flex-row"}>
                  <Image width={35} height={35} src={CalcGraphic}></Image>
                  <p className={"text-pink-500"}>Supply</p>
                </div>
                <p>32,000,000,000,000</p>
              </div>
              <div
                style={{ backgroundColor: "#212121" }}
                className={"rounded-2xl my-2 mx-5 h-fit py-4 px-4"}
              >
                <div className={"flex flex-row"}>
                  <Image width={35} height={35} src={MCapGraphic}></Image>
                  <p className={"text-pink-500"}>Market Cap</p>
                </div>
                <p>TBA</p>
              </div>
              <div
                style={{ backgroundColor: "#212121" }}
                className={"rounded-2xl my-2 mx-5 h-fit py-4 px-4"}
              >
                <div className={"flex flex-row"}>
                  <Image width={35} height={35} src={LiqGraphic}></Image>
                  <p className={"text-pink-500"}>Liquidity Pool</p>
                </div>
                <p>1.5 ETH</p>
              </div>
            </div>
          </div>

          <div className={"flex flex-col mx-auto justify-center"}>
            <SwapWidget
              tokenList={MY_TOKEN_LIST}
              theme={theme && darkTheme}
              provider={uniswaprovider}
            />
            {account ? (
              <>
                <button
                  onClick={addTokenToMM}
                  className="bg-purple-600 my-1 rounded-xl h-fit hover:bg-purple-500 text-white font-bold py-2 px-4 border-b-4 border-purple-500 hover:border-purple-700"
                >
                  Add $BRRR to Metammask
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
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
        <div className={"flex flex-row w-screen object-center justify-center"}>
        <Image
            width={350}
            height={550}
            className={"hidden md:visible lg:visible self-center"}
            src={BRRMEME}
          ></Image>
          <div
            style={{ backgroundColor: "#171717" }}
            className={
              "w-fit self-center text-center flex flex-col justify-center text-center h-fit mx-40 px-10 rounded-xl py-4"
            }
          >
            <p className={"text-center text-pink-500 text-xl font-bold my-10"}>
              $BRR COMMUNITY INCINERATOR
            </p>
            <input
              className={"border border-gray-200 my-2 px-4 py-2"}
              placeholder="Amount to burn"
            ></input>
            <button
              onClick={() => Burntoken()}
              className={
                "bg-pink-400 hover:bg-pink-600 focus:ring focus:ring-2 focus:ring-white text-xl justify-center px-12 my-6 text-white py-4 font-bold rounded-md"
              }
            >
              Burn
            </button>
          </div>
          </div>
          </div>


        <p className={"my-5"}></p>
        <hr className="my-4 mx-auto w-48 h-1 bg-pink-500 rounded border-0 md:my-10" />

        <div className={"justify-center flex flex-col"}>
          <ClaimComponent></ClaimComponent>
        </div>
      </main>
      <FooterComponent></FooterComponent>
    </div>
  );
};

export default Home;

//
//<div
//style={{
//  display: "flex",
//  flexDirection: "column",
//  justifyContent: "center",
//}}
//className={
//  "mx-auto self-center content-center items-center justify-center"
//}
//>
//<div
//  className={"flex flex-row w-screen object-center justify-center"}
//>
//  <button
//    onClick={() => window.open("https://komatoken.io/")}
//    type="button"
//    className="text-pink-500 font-bold hover:text-white border transition-all duration-600 border-pink-600 hover:bg-pink-600 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg text-2xl md:text-3xl px-5 py-3 text-center mr-2 mb-2"
//  >
//    Website
//  </button>
//  <button
//    onClick={() =>
//      window.open(
//        "https://app.uniswap.org/#/swap?inputCurrency=0x5F5ba036Bd464782894499Fb21aa137d3eA9d757&outputCurrency=ETH"
//      )
//    }
//    type="button"
//    className="text-pink-500 font-bold hover:text-white border transition-all duration-600 border-pink-600 hover:bg-pink-600 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg text-2xl md:text-3xl px-5 py-3 text-center mr-2 mb-2"
//  >
//    {" "}
//    Buy
//  </button>
//  <button
//    onClick={() =>
//      window.open(
//        "https://etherscan.io/address/0x5f5ba036bd464782894499fb21aa137d3ea9d757"
//      )
//    }
//    type="button"
//    className="text-pink-500 font-bold hover:text-white border transition-all duration-600 border-pink-600 hover:bg-pink-600 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg text-2xl md:text-3xl px-5 py-3 text-center mr-2 mb-2"
//  >
//    Token
//  </button>
//</div>
//</div>
