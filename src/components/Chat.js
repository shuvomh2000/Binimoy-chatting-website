import React from "react";
import { IoMdSend } from "react-icons/io";

const Chat = () => {
  return (
    <>
      <div className="relative">
        {/*  */}
        <div className="flex justify-between pb-[10px] border-b border-solid ">
          <div className="flex">
            <div className="w-[55px] h-[55px] rounded-[50%]">
              <picture>
                <img src="images/user1.png" />
              </picture>
            </div>
            <div className="ml-[10px] flex items-center">
              <div>
                <h4 className="font-poppins text-black text-sm font-semibold capitalize">
                  {/* {item.sender_name} */}
                  vdsv
                </h4>
                <p className="font-poppins text-msg text-sm font-normal">
                  online
                </p>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="w-full h-[70vh] overflow-y-auto px-[10px] my-[10px]">
            <div className="flex flex-col gap-y-[15px]">
              <div className="p-[10px] bg-[#D9D9D9] font-normal text-base font-poppins max-w-[70%] mr-auto rounded-lg">
                Contrary
              </div>
              <div className="p-[10px] bg-primary text-white text-base font-extralight font-poppins max-w-[70%] ml-auto rounded-lg">
                Contrary
              </div>
            </div>
            <div className="flex justify-between absolute bottom-[-55px] left-0 w-full">
              <input
                placeholder="type a message..."
                className="w-[90%] bg-[#D9D9D9] rounded-md px-[10px] py-[5px]"
              />
              <button className="bg-primary text-white w-[45px] h-[33px] rounded font-normal text-xl  capitalize flex justify-center items-center">
                <IoMdSend />
              </button>
            </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
