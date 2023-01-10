import React from "react";
import { getDatabase, ref, onValue,set,push,remove } from "firebase/database";
import { getAuth } from "firebase/auth";

const Friends = () => {
  return (
    <div className="shadow-md mt-[30px] p-[20px] rounded-[20px]">
      <div>
        <div className="flex justify-between ">
          <h3 className="font-poppins text-black text-xl font-semibold capitalize">
            friends
          </h3>
          <button>...</button>
        </div>
       
        <div className=" overflow-y-auto max-h-[295px]">
            {/*  */}
        <div className="flex justify-between py-[10px] border-b border-solid">
          <div className="flex">
            <div className="w-[55px] h-[55px] rounded-[50%]">
              <picture>
                <img src="images/user1.png" />
              </picture>
            </div>
            <div className="ml-[10px] mt-[7px]">
              <h4 className="font-poppins text-black text-sm font-semibold capitalize">
                Raghav
              </h4>
              <p className="font-poppins text-msg text-sm font-normal">
                Dinner
              </p>
            </div>
          </div>
          <p className="font-poppins text-msg text-[10px] font-medium mt-[12px]">
            Today, 8:56pm
          </p>
        </div>
        {/*  */}
        </div>
      </div>
    </div>
  );
};

export default Friends;
