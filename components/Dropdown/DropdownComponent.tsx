import "tailwindcss-elevation";
import Image from "next/image";
import React, { useState } from "react";

export default function DropdownComponent() {
  const [hidden, sethidden] = useState(true);
  const [hidden2, sethidden2] = useState(true);
  const [trait1, settrait1] = useState(1);
  const [trait2, settrait2] = useState(1);
  const [trait3, settrait3] = useState(1);
  const [trait4, settrait4] = useState(1);

  const TraitBackgroundUrl = `/Traits/Backgrounds/${trait1}.png`;
  const TraitTemplateUrl = `/Traits/MainTemplate/${trait2}.png`;
  const TraitSkinUrl = `/Traits/ApeSkin/${trait3}.png`;
  const TraitShirtUrl = `/Traits/ShirtJackets/${trait4}.png`;

  if (typeof window !== "undefined") {
    window.onclick = function (event) {
      if (
        document
          .getElementsByClassName("dropdown1")[0]
          .contains(event?.target as Node | null) ||
        document
          .getElementsByClassName("dropdown2")[0]
          .contains(event?.target as Node | null)
      ) {
        sethidden2(!hidden2);
        sethidden(hidden);
        // inside
      } else {
        // outside
        sethidden2(hidden2);
        sethidden(!hidden);
      }
    };
  }

  //need to insert if statement to see if any others are not hidden at the moment and if they are turn them to hidden
  return (
    <>
      <p className={"-mt-40"}></p>
      <div className={"flex flex-row"}>
        <div className={"flex flex-col justify-left position-left object-left"}>
          <div className={"z-30 absolute"}>
            <Image height={600} width={600} src={TraitShirtUrl}></Image>
          </div>
          <div className={"z-20 absolute"}>
            <Image height={600} width={600} src={TraitSkinUrl}></Image>
          </div>
          <div className={"z-10 absolute"}>
            <Image height={600} width={600} src={TraitTemplateUrl}></Image>
          </div>
          <div className={"z-0 absolute"}>
            <Image height={600} width={600} src={TraitBackgroundUrl}></Image>
          </div>
        </div>
        <p className={"mx-60 px-36 pt-60"}></p>
        <div>
          <div className="dropdown1">
            <div className="flex flex-row text-center items-center">
              <button className="text-gray-100 hover:text-black border transition-all duration-500 border-gray-200 hover:bg-teal-600 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg text-2xl md:text-3xl text-center mb-5">
                {" "}
                Background
              </button>
              <div
                className="elevation-10inline-block border-2 border-teal-200"
                style={{ visibility: hidden ? "hidden" : "visible" }}
              >
                <ul>
                  <button className="p-4" onClick={() => settrait1(1)}>
                    {" "}
                    Green Background
                  </button>
                  <button className="p-4" onClick={() => settrait1(2)}>
                    {" "}
                    Yellow Background
                  </button>
                  <button className="p-4" onClick={() => settrait1(3)}>
                    {" "}
                    Red Background
                  </button>
                  <button className="p-4" onClick={() => settrait1(4)}>
                    {" "}
                    Blue Background
                  </button>
                </ul>
              </div>
            </div>
          </div>

          <div className="dropdown2">
            <div className="flex flex-col text-center items-center">
              <button className="text-gray-100 hover:text-black border transition-all duration-500 border-gray-200 hover:bg-teal-600 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg text-2xl md:text-3xl text-center mb-5">
                {" "}
                Skin
              </button>
              <div
                className="elevation-10inline-block border-2 border-teal-200"
                style={{ visibility: hidden2 ? "hidden" : "visible" }}
              >
                <ul>
                  <button className="p-5" onClick={() => settrait3(0)}>
                    {" "}
                    NO Skin
                  </button>
                  <button className="p-5" onClick={() => settrait3(1)}>
                    {" "}
                    Magenta
                  </button>
                  <button className="p-5" onClick={() => settrait3(2)}>
                    {" "}
                    Purple Skin
                  </button>
                  <button className="p-5" onClick={() => settrait3(4)}>
                    {" "}
                    Red skin
                  </button>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
