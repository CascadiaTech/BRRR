import React from "react";
import Image from "next/image";
import GamingMario from "../../assets/images/GamingMario.png";
import styles from "../../styles/Home.module.css";
import FooterComponent from "../../components/Footer/FooterComponent";
import HeaderComponent from "../../components/Header/HeaderComponent";

export default function GamingPage() {
  return (
    <>
       <div className="scroll-smooth flex-col">
      <main className={styles.main}>
        <header>
          {" "}
          <HeaderComponent></HeaderComponent>
        </header>
       
        <p className={'mt-20'}></p>
      <Image src={GamingMario}></Image>

      </main>
      <FooterComponent></FooterComponent>
    </div>
    </>
  );
}
