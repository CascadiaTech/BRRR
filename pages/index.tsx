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
import BigNumber from "bignumber.js";
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
import { pairabiObject } from "../contracts/abi/pairabi.mjs";
import { formatEther } from "@ethersproject/units";
import { ethers } from "ethers";
const Home: NextPage = () => {
  const { account, chainId, active } = useWeb3React();
  const showConnectAWallet = Boolean(!account);
  const context = useWeb3React();
  const [burn, setcanburn] = useState(Boolean);
  const [loading, setLoading] = useState(false);
  const [totalburned, settotalburned] = useState(Number);
  const [totalbuybacks, settotalbuybacks] = useState(Number);
  const [totaldistributed, settotaldistributed] = useState(Number);
  const [totalsupply, settotalsupply] = useState(Number);
  const [uniswaprovider, setuniswapprivder] = useState();
  const [reserve, setreserve] = useState("")
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
        const contractaddress = "0x552754cBd16264C5141cB5fdAF34246553a10C49"; // "clienttokenaddress"
        const contract = new Contract(contractaddress, abi, provider);
        const Reflections = await contract.getTotalDividendsDistributed();
        const refinedDistributed = (Reflections);
        settotaldistributed(Number(refinedDistributed));

        return refinedDistributed;
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
        const contractaddress = "0x552754cBd16264C5141cB5fdAF34246553a10C49"; // "clienttokenaddress"
        const contract = new Contract(contractaddress, abi, provider);
        const burnAmount = await contract.totalBurned();
        const burnNumber = ethers.utils.formatEther(burnAmount);
        const fixedburnnum = parseFloat(burnNumber).toFixed(2);
        console.log(fixedburnnum);
        const burnBigNumber = ethers.utils.parseUnits(fixedburnnum, 18);
        settotalburned(Number(burnBigNumber));
        console.log(burnBigNumber);
        return burnBigNumber;
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }

    async function totalBuybacks() {
      try {
        setLoading(true);
        const abi = abiObject;
        const provider = new Web3Provider(
          library?.provider as ExternalProvider | JsonRpcFetchFunc
        );
        const contractaddress = "0x552754cBd16264C5141cB5fdAF34246553a10C49"; // "clienttokenaddress"
        const contract = new Contract(contractaddress, abi, provider);
        const buybackAmount = await contract.TotalBuyBacks();
        const finalNumber = ethers.utils.formatEther(buybackAmount);
        console.log(finalNumber);
        const fixedbuybacknum = parseFloat(finalNumber).toFixed(2);
        console.log(fixedbuybacknum);
        const buybackBigNumber = ethers.utils.parseUnits(fixedbuybacknum, 18);
        settotalbuybacks(Number(buybackBigNumber));
        console.log(buybackBigNumber);
        return buybackBigNumber;
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
    
    async function totalSupply() {
      try {
        setLoading(true);
        const abi = abiObject;
        const provider = new Web3Provider(
          library?.provider as ExternalProvider | JsonRpcFetchFunc
        );
        const contractaddress = "0x552754cBd16264C5141cB5fdAF34246553a10C49"; // "clienttokenaddress"
        const contract = new Contract(contractaddress, abi, provider);
        const supplyAmount = await contract.totalSupply();
        const supplyNumber = ethers.utils.formatEther(supplyAmount);
        const fixedsupplynum = parseFloat(supplyNumber).toFixed(1);
        console.log(fixedsupplynum);
        const supplyBigNumber = ethers.utils.parseUnits(fixedsupplynum, 18);
        settotalsupply(Number(supplyBigNumber));
        console.log(supplyBigNumber);
        return supplyBigNumber;
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }

    async function LiquidityPool() {
      try {
        setLoading(true);
        const abi = pairabiObject;
        const provider = new ethers.providers.Web3Provider(
          library?.provider as ExternalProvider | JsonRpcFetchFunc
        );
        const pairaddress = "0x17558f1b70c99ae609f07d36668101664c7ad059"; // "clienttokenaddress"
        const pairContract = new ethers.Contract(pairaddress, abi, provider);
        const reserves = await pairContract.getReserves();
        const reserve0 = ethers.BigNumber.from(reserves[0]); // Convert to BigNumber
        const reserve1 = ethers.BigNumber.from(reserves[1]); // Convert to BigNumber
        const token0Decimals = 18; // Set the number of decimals for the first token
        const token1Decimals = 18; // Set the number of decimals for the second token
        const formattedReserve0 = ethers.utils.formatUnits(reserve0, token0Decimals);
        const formattedReserve1 = ethers.utils.formatUnits(reserve1, token1Decimals);

        const liquidityPoolAmount = reserve0.add(reserve1);
        console.log('Liquidity Pool Amount:', liquidityPoolAmount.toString());
        const finalReserve1 = Number(formattedReserve1).toFixed(2)
        setreserve(finalReserve1)
        console.log('Reserve 0:', formattedReserve0);
        console.log('Reserve 1:', formattedReserve1);
        
        return;
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
    
    console.log('hey there')
    totalSupply();
    LiquidityPool();
    totalBuybacks();
    totalBurned();
    FetchDistributed();
    setProvider().then((result) => setuniswapprivder(result as any));
  }, [account]);

  function numberWithCommas(num: any) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function insertDecimal(num: any) {
    return Number((num / 1000000).toFixed(3));
  }


  const buybacksdecimals  = insertDecimal(totalbuybacks / 1000000000000);
  const formattedbuybacks = numberWithCommas(buybacksdecimals);

  const burndecimals = insertDecimal(totalburned / 1000000000000);
  const formattedburn = numberWithCommas(burndecimals);
  
  const supplydecimals = insertDecimal(totalsupply / 1000000000000);
  const formattedsuppply = numberWithCommas(supplydecimals);

  const airdropdecimals = insertDecimal(totaldistributed / 1000000000000);
  const formatteddistributed = numberWithCommas(airdropdecimals);

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
      address: "0x552754cBd16264C5141cB5fdAF34246553a10C49",
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
            address: "0x552754cBd16264C5141cB5fdAF34246553a10C49", // ERC20 token address
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
                <p className={"text-center"}>{formattedbuybacks}</p>
                <div
                  style={{ backgroundColor: "#040024" }}
                  className={"rounded-xl px-10 py-3"}
                >
                  Buyback
                </div>
              </div>
              <div className={"flex flex-col mx-5"}>
                <Image width={100} height={150} src={BurnedGraphic}></Image>
                <p className={"text-center"}>{formattedburn}</p>
                <div
                  style={{ backgroundColor: "#040024" }}
                  className={"rounded-xl px-10 py-3"}
                >
                  Burrrrned
                </div>
              </div>
              <div className={"flex flex-col mx-5"}>
                <Image width={100} height={150} src={DropGraphic}></Image>
                <p className={"text-center"}>{formatteddistributed}</p>
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
                <p>{formattedsuppply}</p>
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
                <p>{reserve} WETH</p>
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
