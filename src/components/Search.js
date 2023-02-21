import React from "react";
import { BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";
// let dark = useSelector((state) => state.darkMode.value);

const Search = () => {
  let dark = useSelector((state) => state.darkMode.value);

  return (
    <div>
      <div className='relative  boxShadow-search xl:mt-[5px]'>
        <input
          type="text"
          placeholder="Search..."
          className={`shadow-md rounded-[29px] py-[10px] xl:py-[15px] pl-[60px] pr-[30px]  font-nunito text-base font-normal  w-full ${
            dark
              ? "bg-white text-black border xl:border-0 border-white"
              : "bg-bl_opacity text-white border-white border"
          }`}
        />
        <button>
          <BsSearch
            className={`absolute top-[50%] left-[20px] text-[20px] translate-y-[-50%] ${
              dark ? "text-black" : "text-white"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default Search;
