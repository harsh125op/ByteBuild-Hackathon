import React from "react";
import { Navbar } from "../components/index";

export const Home = () => {
  return (
    <>
      <section className="w-full h-[100vh] bg-pattern">
        <Navbar />
        <div className="max-w-[1350px] mx-auto h-[80vh] flex items-center justify-center text-[72px] text-center font-extrabold text-black drop-shadow-[2px_2px_0px_white] drop-shadow-[4px_4px_0px_white] relative">
          Dream Trip With <br />
          PDD Events 😘
          <div className="w-[200px] h-[60px] flex items-center justify-center text-[16px] font-semibold bg-black text-white rounded-[50px] cursor-pointer shadow-[4px_4px_0px_white] absolute top-[10%] left-[10%] rotate-[-10deg] ">
            AI Powered 🤗
          </div>
          <div className="w-[200px] h-[60px] flex items-center justify-center text-[16px] font-semibold bg-black text-white rounded-[50px] cursor-pointer shadow-[4px_4px_0px_white] absolute bottom-[10%] left-[10%] rotate-[10deg] ">
          Trip planner 🤭
          </div>
          <div className="w-[200px] h-[60px] flex items-center justify-center text-[16px] font-semibold bg-black text-white rounded-[50px] cursor-pointer shadow-[4px_4px_0px_white] absolute top-[10%] right-[10%] rotate-[10deg] ">
          Itinerary Builder 🤭
          </div>
          <div className="w-[200px] h-[60px] flex items-center justify-center text-[16px] font-semibold bg-black text-white rounded-[50px] cursor-pointer shadow-[4px_4px_0px_white] absolute  right-[10%] bottom-[10%] rotate-[-10deg] ">
          Real Time Data 🤔
          </div>

        </div>
      </section>
    </>
  );
};

export default Home;
