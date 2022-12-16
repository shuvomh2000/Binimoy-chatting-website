import React from "react";

const Groups = () => {
  return (
    <div className="shadow-md p-[20px] rounded-[20px]">
      <div>
        <div className="flex justify-between ">
          <h3 className="font-poppins text-black text-xl font-semibold capitalize">
            my groups
          </h3>
          <button>...</button>
        </div>

        <div className=" overflow-y-auto max-h-[380px]">
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

export default Groups;
