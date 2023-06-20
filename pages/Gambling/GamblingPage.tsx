import React from "react";
import Image from "next/image";
import Gambling from "../../assets/images/Gambling.png";
import styles from "../../styles/Home.module.css";
import FooterComponent from "../../components/Footer/FooterComponent";
import HeaderComponent from "../../components/Header/HeaderComponent";

export default function GamblingPage() {
    return (
        <>
           <div className="scroll-smooth flex-col">
          <main className={styles.main}>
            <header>
              {" "}
              <HeaderComponent></HeaderComponent>
            </header>
           <p className={'mt-20'}></p>
          <Image src={Gambling}></Image>
          <h1 className={'text-2xl text-center'}>Coming Soon!</h1>
    
          </main>
          <FooterComponent></FooterComponent>
        </div>
        </>
      );
}
