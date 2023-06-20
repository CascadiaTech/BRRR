import React from "react";
import Image from "next/image";
import Gambling from "../../assets/images/Gambling.png";

export default function GamingPage() {
  return (
    <>
      <Image src={Gambling}></Image>
      <h1>Coming Soon!</h1>
    </>
  );
}
