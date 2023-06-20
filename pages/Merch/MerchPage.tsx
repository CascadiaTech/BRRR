import React from "react";
import Image from "next/image";
import Merch from "../../assets/images/8e8.png";
import styles from "../../styles/Home.module.css";
import FooterComponent from "../../components/Footer/FooterComponent";
import HeaderComponent from "../../components/Header/HeaderComponent";

export default function MerchPage() {
    return (
        <>
           <div className="scroll-smooth flex-col">
          <main className={styles.main}>
            <header>
              {" "}
              <HeaderComponent></HeaderComponent>
            </header>
           
            <p className={'mt-20'}></p>
          <h1 className={'text-2xl text-center'}>Coming Soon!</h1>
          <Image src={Merch}></Image>
    
          </main>
          <FooterComponent></FooterComponent>
        </div>
        </>
      );
}
