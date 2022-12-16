import React from "react";
import { BsSearch } from "react-icons/bs";

const Search = () => {
  return (
    <div>
      <div className="relative  boxShadow-search">
        <input type="text" placeholder="Search..." className="border border-bl_opacity xl:shadow-md rounded-[29px] py-[15px] pl-[60px] pr-[30px]  font-nunito text-black text-base font-normal  w-full " />
        <button>
          <BsSearch className="absolute top-[50%] left-[20px] text-black text-[20px] translate-y-[-50%]" />
        </button>
      </div>
    </div>
  );
};

export default Search;
