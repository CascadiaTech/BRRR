import "tailwindcss-elevation";
import { useWeb3React } from "@web3-react/core";
import Swal from "sweetalert2";
import { Accordion } from "flowbite-react";
import { useCallback, useEffect, useState } from "react";
import Web3 from "web3";
import {
  ExternalProvider,
  JsonRpcFetchFunc,
  Web3Provider,
} from "@ethersproject/providers";
import { formatEther, parseEther } from "@ethersproject/units";
import { ethers } from 'ethers';
import { Contract } from "@ethersproject/contracts";
import { abiObject } from "../../contracts/abi/abi.mjs";
import Image from "next/image.js";
import BigNumber from "bignumber.js";
import ClaimedGraphic from "../../assets/images/ClaimedGraphic.png";
import UnclaimedGraphic from "../../assets/images/UnclaimedGraphic.png";
import BalanceGraphic from "../../assets/images/BalanceGraphic.png";
import BRRHead from "../../assets/images/BRRRHead.png";
import { Web3ReactProvider } from "@web3-react/core";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import ScrollpositionAnimation from "../../hooks/OnScroll";

export default function ClaimComponent() {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const { account } = useWeb3React();
  const showConnectAWallet = Boolean(!account);
  const context = useWeb3React();
  const [loading, setLoading] = useState(false);
  const [claim, setcanclaim] = useState(Boolean);
  const { library } = context;
  const [uniswaprovider, setuniswapprivder] = useState();
  const [tokenid, settokenid] = useState(Number);
  const [pendingreflections, setpendingreflections] = useState(Number);
  const [totalburned, settotalburned] = useState(String);
  const [totaldistributed, settotaldistributed] = useState(String);
  const [balance, setbalance] = useState(Number);
  const [burnamount, setburnamount] = useState(Number);
  const [burn, setcanburn] = useState(Boolean);
  const [claimedbyuser, setclaimedbyuser] = useState(Number);
  const [marketCap, setmarketCap] = useState(Number);
  //const MarketCap = [(JpegPrice / EthPrice) * 10000000] // essentially jpegusd price divided by total supply

  if (typeof window !== "undefined") {
    useEffect(() => {
      // Update the document title using the browser API
      ScrollpositionAnimation();
    }, [window.scrollY]);
  }

  useEffect(() => {
    async function Fetchbalance() {
      if (!account) {
        return;
      }

      try {
        setLoading(true);
        const abi = abiObject;
        const provider = new Web3Provider(
          library?.provider as ExternalProvider | JsonRpcFetchFunc
        );
        const contractaddress = "0x552754cBd16264C5141cB5fdAF34246553a10C49";
        const contract = new Contract(contractaddress, abi, provider);
        const balance = await new contract.balanceOf(account); 
        const Claimtxid = await balance;
        const finalbalance = Number(balance);
        const Fixeddecimals = finalbalance.toFixed(2);
        const Numberify = Number(Fixeddecimals);
        setbalance(Numberify);
        console.log(Numberify);

        return Claimtxid;
        /////
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
    

    async function PendingReflections() {
      try {
        setLoading(true);
        const abi = abiObject;
        const provider = new Web3Provider(
          library?.provider as ExternalProvider | JsonRpcFetchFunc
        );
        const contractaddress = "0x552754cBd16264C5141cB5fdAF34246553a10C49"; // "clienttokenaddress"
        const contract = new Contract(contractaddress, abi, provider);
        const Reflections = await contract.withdrawableDividendOf(account); //.claim()
        console.log(Reflections)
        const finalnumber = Reflections.toString()
        setpendingreflections(Number(finalnumber));
        console.log(Reflections);
        console.log(finalnumber);
        return finalnumber;
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }

    
    async function TotalClaimedByUser() {
      if (!account) {
        return;
      }
      try {
        setLoading(true);
        const abi = abiObject;
        const provider = new Web3Provider(
          library?.provider as ExternalProvider | JsonRpcFetchFunc
        );
        const contractaddress = "0x552754cBd16264C5141cB5fdAF34246553a10C49"; // "clienttokenaddress"
        const contract = new Contract(contractaddress, abi, provider);
        const Reflections = await contract.ClaimedByUser(account); 
        const finalnumber = formatEther(Reflections.toString());
        const fixnum = Number(finalnumber)
        setclaimedbyuser(fixnum)
        console.log(fixnum);
        console.log(finalnumber);
        return fixnum;
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

    async function FetchDistributed() {
      try {
        setLoading(true);
        const abi = abiObject;
        const provider = new Web3Provider(
          library?.provider as ExternalProvider | JsonRpcFetchFunc
        );
        const contractaddress = "0x552754cBd16264C5141cB5fdAF34246553a10C49"; // "clienttokenaddress"
        const contract = new Contract(contractaddress, abi, provider);
        const rewardToken = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";
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

    // async function formattedDistributed() {
    //    const totaldistributed = await FetchDistributed();
    //    const formattedDistributed = parseFloat(totaldistributed.toFixed(18));
    //    console.log(formattedDistributed);
    // }
    // formattedDistributed()

    TotalClaimedByUser;
    totalBurned();
    PendingReflections();
    Fetchbalance();
    FetchDistributed();
  }, [account]);

  const Claimtoken = useCallback(async () => {
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
      const contractaddress = "0x552754cBd16264C5141cB5fdAF34246553a10C49"; // "clienttokenaddress"
      const provider = new Web3Provider(
        library?.provider as ExternalProvider | JsonRpcFetchFunc
      );
      //const provider = getDefaultProvider()
      const signer = provider.getSigner();
      const contract = new Contract(contractaddress, abi, signer);
      console.log(contract);
      const ClaimTokens = await contract.claim(); //.claim()
      const signtransaction = await signer.signTransaction(ClaimTokens);
      const Claimtxid = signtransaction;
      Swal.fire({
        icon: "success",
        title: "Congratulations you have Claimed all of your rewards",
        text: "Go see them in your wallet, and stick around for the next drop",
      });
      return Claimtxid;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [account, library?.provider, claim]);

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
/*    async function CanClaim() {
      if (!account) {
        console.log({
          message: "Hold On there Partner, there seems to be an Account err!",
        });
        return;
      }
      try {
        //setLoading(true)
        const provider = new Web3Provider(
          library?.provider as ExternalProvider | JsonRpcFetchFunc
        );
        const abi = abiObject;
        const contractaddress = "0x552754cBd16264C5141cB5fdAF34246553a10C49";
        const contract = new Contract(contractaddress, abi, provider);
        //const FinalResult = await UserTokenBalance.toString()
        if (!account) {
          return Swal.fire({
            icon: "error",
            title: "Connect your wallet to claim",
            text: "you must connect your wallet to claim",
          });
        } else {
          const usersclaimperiod = await contract.NFTSPeriodId(account);
          const currentperiod = await contract.currentRewardPeriodId();
          (await usersclaimperiod) && (await currentperiod);
          console.log(usersclaimperiod);
          console.log(currentperiod);
          if (usersclaimperiod <= currentperiod) {
            setcanclaim(true);
          } else {
            setcanclaim(false);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        let claim = null;
        console.log(claim);
      }
    }
    CanClaim();
    */
    setProvider().then((result) => setuniswapprivder(result as any));
  }, [account]);

  
  function numberWithCommas(num: any) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function insertDecimal(num: any) {
    return Number((num / 1000000).toFixed(3));
  }
  console.log(insertDecimal(pendingreflections));


  const Decimal_balance = insertDecimal(balance / 1000000000000);
  const formatted_balance = numberWithCommas(Decimal_balance);

  const decimalpendingreflections  = insertDecimal(pendingreflections / 1000000000000);
  const formattedReflections = numberWithCommas(decimalpendingreflections);
  
  const claimedbyuserBalance = insertDecimal(claimedbyuser / 1000000000000);
  const formatted_claim = numberWithCommas(claimedbyuserBalance);



  const Burntoken = useCallback(async () => {
    if (!account) {
      Swal.fire({
        icon: "error",
        title: "Connect Your Wallet To Burn",
        timer: 5000,
      });
    }

    try {
      setLoading(true);
      const data = abiObject;
      const abi = data;
      const contractaddress = "0x552754cBd16264C5141cB5fdAF34246553a10C49"; // "clienttokenaddress"
      const provider = new Web3Provider(
        library?.provider as ExternalProvider | JsonRpcFetchFunc
      );
      //const provider = getDefaultProvider()
      const signer = provider.getSigner();
      const contract = new Contract(contractaddress, abi, signer);
      console.log(contract);
      const finalburn = ethers.utils.parseUnits(burnamount.toString(), 18);
      const BurnTokens = await contract.burn(finalburn); //.burn()
      const signtransaction = await signer.signTransaction(BurnTokens);
      const FinalBurn = Number(signtransaction);
      //const StringFinalBurn = FinalBurn
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

  return (
    <>
    <h1 className={'text-pink-500 text-4xl text-center sm:text-5xl'} style={{fontFamily: 'BebasNeue'}}>$BRRR Claim </h1>
      <div className={"flex flex-col mx-auto justify-center mt-8 w-full"}>
        <div className={"flex flex-col md:flex-row mx-auto"}>
          <div
            style={{ backgroundColor: "#212121" }}
            className="text-white w-52 h-40 font-bold hover:text-white border transition-all duration-600 border-pink-600 rounded-lg px-3 py-3 text-center mr-2 mb-2"
          >
            <div className={"flex flex-row"}>
              <p>Balance</p>
              <Image src={BalanceGraphic}></Image>
            </div>
            <p className={"text-left"}>{formatted_balance}</p>
          </div>
          <div
            style={{ backgroundColor: "#212121" }}
            className="text-white w-52 h-40 font-bold hover:text-white border transition-all duration-600 border-pink-600 rounded-lg px-3 py-3 text-center mr-2 mb-2"
          >
            <div className={"flex flex-row"}>
              <p>Claimed</p>
              <Image src={ClaimedGraphic}></Image>
            </div>
            <p className={"text-left"}>{claimedbyuser}</p>
          </div>
          <div
            style={{ backgroundColor: "#212121" }}
            className="text-white w-52 h-40 font-bold hover:text-white border transition-all duration-600 border-pink-600 rounded-lg px-3 py-3 text-center mr-2 mb-2"
          >
            <div className={"flex flex-row"}>
              <p>Unclaimed</p>
              <Image src={UnclaimedGraphic}></Image>
            </div>
            <p className={"text-left"}>{formattedReflections}</p>
          </div>
        </div>
      </div>

    
      <div className="flex flex-col mx-auto w-full justify-center px-6 sm:px-10 md:px-20 lg:px-48 xl:px-64">
        {loading ? (
          <Spin indicator={antIcon} className="add-spinner" />
        ) : (
          <>
            <div className="mx-auto ">
            <button
            onClick={() => Claimtoken()}
            style={{fontFamily: 'BebasNeue'}}
            className={
              "bg-pink-500 hover:bg-pink-700 focus:ring tracking-wider focus:ring-2 focus:ring-white text-3xl justify-center px-16 md:px-36 my-6 text-white py-4 font-bold rounded-md"
            }
          >
            Claim
          </button>
            </div>
          </>
        )}
        <hr className="my-4 mx-auto w-48 h-1 bg-pink-500 rounded border-0 md:my-10" />
        <div
          style={{ backgroundColor: "#171717" }}
          className={
            "w-fit self-center text-center flex flex-col justify-center my-10 text-center h-fit mx-auto px-10 rounded-xl py-4"
          }
        >
          <p className={"text-center text-pink-500 text-xl font-bold my-10"}>
            $BRR COMMUNITY INCINERATOR
          </p>

          {loading ? (
          <Spin indicator={antIcon} className="add-spinner" />
        ) : (
          <>
          <input
            className={"border border-gray-200 my-2 px-4 py-2 text-black"}
            onChange={(e) => setburnamount(Number(e.target.value))}
            type="text"
            name="Burn"
            placeholder="Number of tokens to burn"
          ></input>
          <button
            onClick={() => Burntoken()}
            style={{fontFamily: 'BebasNeue'}}
            className={
              "bg-pink-500 hover:bg-pink-700 tracking-wider focus:ring focus:ring-2 focus:ring-white text-2xl justify-center px-12 my-6 text-white py-4 font-bold rounded-md"
            }
          >
            Burn
          </button>
          </>
        )}


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
          <Image
            className={"justify-center mx-auto"}
            src={BRRHead}
          ></Image>
        </div>
      </div>
    </>
  );
}

//<div className="md:grid grid-cols-2 flex flex-col border-2 border-black rounded-xl">
//<div className={"rounded-xl text-black text-xl px-4 py-2 m-3"}>
//  <p className={"text-xl font-bold text-gray-300"}>
//    Pending ETH Rewards:
//  </p>
//</div>
//<div className={"rounded-xl text-black text-xl px-4 py-2 m-3"}>
//  <p className={"text-xl text-gray-300 "}>{pendingreflections} ETH</p>
//</div>
//<div className={"rounded-xl text-black  text-xl px-4 py-2 m-3"}>
//  <p className={"text-xl font-bold text-gray-300"}>
//    Total ETH Distributed
//  </p>
//</div>
//<div className={"rounded-xl text-black text-xl px-4 py-2 m-3"}>
//  <p className={"text-xl text-gray-300"}>{totaldistributed} ETH</p>
//</div>
//<div className={"rounded-xl text-black  text-xl px-4 py-2 m-3"}>
//  <p className={"text-xl font-bold text-gray-300"}>Total burned</p>
//</div>
//<div className={"rounded-xl text-black text-xl px-4 py-2 m-3"}>
//  <p className={"text-xl text-gray-300"}>{totalburned} $BRRR</p>
//</div>
//</div>

//
//<div className={"rounded-xl text-black text-xl px-4 py-2 m-3"}>
//<p className={"text-xl font-bold text-gray-300"}>Market Cap</p>
//</div>
//<div className={"rounded-xl text-black text-xl px-4 py-2 m-3"}>
//<p className={"text-xl text-gray-300"}>{marketCap} USD</p>
//</div>
//<div className={"rounded-xl text-black text-xl px-4 py-2 m-3"}>
//<p className={"text-xl font-bold text-gray-300"}>Holders:</p>
//</div>
//<div className={"rounded-xl text-black text-xl px-4 py-2 m-3"}>
//<p className={"text-xl text-gray-300"}>{holdersCount}</p>
//</div>
