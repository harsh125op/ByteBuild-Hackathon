import React from "react";
import { Navbar } from "../components/index";
import { IoSparklesSharp } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";

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

      <section className="relative w-full h-[100vh] flex items-center justify-center">
        <div className="absolute -inset-10 w-[150%] h-[100%] gradient-2 blur-[150px]"></div>

        <main className="relative z-10 flex flex-col items-center justify-center w-full h-[100vh]">
          <div className="px-[20px] py-[10px] rounded-[100px] gap-4 bg-black text-white flex items-center justify-center shadow-lg">
            powered by AI <IoSparklesSharp />
          </div>
          <div className="flex flex-col items-center gap-4">
            {/* Heading */}
            <h1 className="text-[32px] mt-[20px] font-bold text-black">
              Where is your next destination?
            </h1>

            {/* Search Input */}
            <div className="flex flex-col items-center w-[950px] bg-white rounded-[12px] shadow-md px-5 py-3">
              <div className="h-[100px] w-full flex items-center justify-between">
                <input
                  type="text"
                  placeholder="Type your destination..."
                  className="w-full bg-transparent outline-none text-lg"
                />
                <button className="ml-3 p-5 text-[18px] bg-gray-200 rounded-full">
                  <FaArrowRight className="text-gray-600" />
                </button>
              </div>

              <div className="flex gap-5 text-[#f06161] font-semibold text-[14px] w-full justify-start mt-3">
                <div className="flex gap-1  justify-center items-center">
                  {" "}
                  Create a trip now
                  <IoSparklesSharp />
                </div>
                <div className="flex gap-1 justify-center items-center">
                  {" "}
                  Get inspiration <IoSparklesSharp />
                </div>
                <div className="flex gap-1 justify-center items-center">
                  {" "}
                  Get advice <IoSparklesSharp />
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Home;
