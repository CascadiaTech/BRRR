import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import HeaderComponent from "../components/Header/HeaderComponent";
import "tailwindcss-elevation";
import FooterComponent from "../components/Footer/FooterComponent";
import { useCallback, useEffect, useRef, useState } from "react";
import "@uniswap/widgets/fonts.css";
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
import { formatEther } from "@ethersproject/units";
const Home: NextPage = () => {
  const { account, chainId, active } = useWeb3React();
  const showConnectAWallet = Boolean(!account);
  const context = useWeb3React();
  const [burn, setcanburn] = useState(Boolean);
  const [loading, setLoading] = useState(false);
  const [totalburned, settotalburned] = useState(String);
  const [totaldistributed, settotaldistributed] = useState(String);
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

    async function FetchDistributed() {
      try {
        setLoading(true);
        const abi = abiObject;
        const provider = new Web3Provider(
          library?.provider as ExternalProvider | JsonRpcFetchFunc
        );
        const contractaddress = "0x74686B863Efc70eFa059645B0cDB2F45b0B13B93"; // "clienttokenaddress"
        const contract = new Contract(contractaddress, abi, provider);
        const Reflections = await contract.getTotalDividendsDistributed();
        const formattedDistributed = formatEther(Reflections);
        settotaldistributed(formattedDistributed);
        console.log(formattedDistributed);

        return formattedDistributed;
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }

    async function totalBurned() {
      try {
        setLoading(true);
        const abi = abiObject;
        const provider = new Web3Provider(
          library?.provider as ExternalProvider | JsonRpcFetchFunc
        );
        const contractaddress = "0x74686B863Efc70eFa059645B0cDB2F45b0B13B93"; // "clienttokenaddress"
        const contract = new Contract(contractaddress, abi, provider);
        const burnAmount = await contract.TotalBurned();
        const finalNumber = formatEther(burnAmount);
        settotalburned(finalNumber);
        console.log(burnAmount);
        console.log(finalNumber);
        return finalNumber;
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
    totalBurned();
    FetchDistributed();
    setProvider().then((result) => setuniswapprivder(result as any));
  }, [account]);

  const jsonRpcUrlMap = {
    1: ["https://mainnet.infura.io/v3/fc5d70bd4f49467289b3babe3d8edd97"],
    3: ["https://ropsten.infura.io/v3/<YOUR_INFURA_PROJECT_ID>"],
  };

  const theme: Theme = {
    primary: "#ffffff", 
    secondary: "#ffffff", 
    interactive: "#c44ebc",
    container: "#c400b6", 
    module: "#61005a", 
    accent: "#c44ebc", 
    outline: "#fff",
    dialog: "#fff",
    borderRadius: 0.5,
  };

  const MY_TOKEN_LIST = [
    {
      name: "BRRR",
      address: "0xb99405b00eF8D0Cf17aEf9D46a8d3cB9f3b72e57",
      symbol: "BRRR",
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
            symbol: `BRRR`,
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
        <div className="sm:w-fit self-center py-6 mx-auto justify-center flex flex-col lg:w-fit lg:flex-row mt-20 rounded-2xl">
          <div className={"flex flex-col mx-0 lg:mx-20"}>
            <h1 style={{fontFamily: 'BebasNeue'}} className={"text-3xl text-center tracking-wider font-bold my-4 text-pink-500 w-full"}>
              Pillar functions
            </h1>
            <div
              className={
                "flex flex-col mx-auto self-center justify-center lg:flex-row px-20 lg:px-24 py-4 rounded-2xl h-fit w-fit"
              }
              style={{ backgroundColor: "#171717" }}
            >
              <div className={"flex flex-col mx-5"}>
                <Image width={100} height={150} src={Graphic}></Image>
                <p className={"text-center"}></p>
                <div
                  style={{ backgroundColor: "#040024" }}
                  className={"rounded-xl px-10 py-3"}
                >
                  Buyback
                </div>
              </div>
              <div className={"flex flex-col mx-5"}>
                <Image width={100} height={150} src={BurnedGraphic}></Image>
                <p className={"text-center"}>{totalburned}</p>
                <div
                  style={{ backgroundColor: "#040024" }}
                  className={"rounded-xl px-10 py-3"}
                >
                  Burrrrned
                </div>
              </div>
              <div className={"flex flex-col mx-5"}>
                <Image width={100} height={150} src={DropGraphic}></Image>
                <p className={"text-center"}>{totaldistributed}</p>
                <div
                  style={{ backgroundColor: "#040024" }}
                  className={" rounded-xl px-10 py-3"}
                >
                  Brrrdrop
                </div>
              </div>
            </div>

            <h1 style={{fontFamily: 'BebasNeue'}} className={"text-3xl tracking-wider font-bold text-center my-4 text-pink-500"}>
              $BRRR Tokenomics
            </h1>
            <div
              className={
                "flex flex-col mx-auto py-4 self-center justify-center lg:flex-row px-16 lg:px-24 py-4 rounded-2xl h-fit w-fit"
              }
              style={{ backgroundColor: "#171717" }}
            >
              <div
                style={{ backgroundColor: "#212121" }}
                className={"rounded-2xl my-2 mx-4 h-fit py-4 px-2"}
              >
                <div className={"flex flex-row"}>
                  <Image width={35} height={35} src={CalcGraphic}></Image>
                  <p className={"text-pink-500"}>Supply</p>
                </div>
                <p>32,000,000,000,000,000</p>
              </div>
              <div
                style={{ backgroundColor: "#212121" }}
                className={"rounded-2xl my-2 mx-4 h-fit py-4 px-2"}
              >
                <div className={"flex flex-row"}>
                  <Image width={35} height={35} src={MCapGraphic}></Image>
                  <p className={"text-pink-500"}>Market Cap</p>
                </div>
                <p>TBA</p>
              </div>
              <div
                style={{ backgroundColor: "#212121" }}
                className={"rounded-2xl my-2 mx-4 h-fit py-4 px-2"}
              >
                <div className={"flex flex-row"}>
                  <Image width={35} height={35} src={LiqGraphic}></Image>
                  <p className={"text-pink-500"}>Liquidity Pool</p>
                </div>
                <p>1.5 ETH</p>
              </div>
            </div>
          </div>

          <div className={"flex flex-col mx-auto my-10 justify-center"}>
            <SwapWidget
              tokenList={MY_TOKEN_LIST}
              theme={theme}
              provider={uniswaprovider}
            />
            {account ? (
              <>
                <div
                  onClick={addTokenToMM}
                  className="bg-purple-600 my-1 rounded-xl h-fit text-center cursor-pointer hover:bg-purple-500 text-white font-bold py-2 px-4 border-b-4 border-purple-500 hover:border-purple-700"
                >
                  Add $BRRR to Metamask
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className={"relative left-0 mx-60"}>
          <Image width={300} height={500} src={BRRMEME}></Image>
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
//  <div
//    onClick={() => window.open("https://komatoken.io/")}
//    type="div"
//    className="text-pink-500 font-bold hover:text-white border transition-all duration-600 border-pink-600 hover:bg-pink-600 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg text-2xl md:text-3xl px-5 py-3 text-center mr-2 mb-2"
//  >
//    Website
//  </div>
//  <div
//    onClick={() =>
//      window.open(
//        "https://app.uniswap.org/#/swap?inputCurrency=0x5F5ba036Bd464782894499Fb21aa137d3eA9d757&outputCurrency=ETH"
//      )
//    }
//    type="div"
//    className="text-pink-500 font-bold hover:text-white border transition-all duration-600 border-pink-600 hover:bg-pink-600 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg text-2xl md:text-3xl px-5 py-3 text-center mr-2 mb-2"
//  >
//    {" "}
//    Buy
//  </div>
//  <div
//    onClick={() =>
//      window.open(
//        "https://etherscan.io/address/0x5f5ba036bd464782894499fb21aa137d3ea9d757"
//      )
//    }
//    type="div"
//    className="text-pink-500 font-bold hover:text-white border transition-all duration-600 border-pink-600 hover:bg-pink-600 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg text-2xl md:text-3xl px-5 py-3 text-center mr-2 mb-2"
//  >
//    Token
//  </div>
//</div>
//</div>
