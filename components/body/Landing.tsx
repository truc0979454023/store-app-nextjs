import Image from "next/image";
import React from "react";
import iphone from "../../assets/iphone.png";
import Button from "../common/Button";

const Landing = () => {
  return (
    <section className="fixed top-[72px] mx-auto flex h-screen max-w-[1350px]  items-center justify-between px-8">
      <div className="space-y-8">
        <h1 className="space-y-3 text-5xl font-semibold tracking-wide lg:text-6xl">
          <span className="block bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
            Powered
          </span>
          <span className="block">By Intellect</span>
          <span className="block">Driven By Values</span>
        </h1>
        <div className="flex items-center justify-start gap-x-8">
          <Button title="Buy now" />
          <a className="link">Learn more</a>
        </div>
      </div>

      <div className="relative  hidden h-[450px] w-[450px] transition-all duration-500 md:block lg:h-[650px] lg:w-[600px] ">
        <Image
          src={iphone}
          alt="banner"
          className="h-auto w-full object-contain"
          width={450}
          height={450}
        />
      </div>
    </section>
  );
};

export default Landing;
