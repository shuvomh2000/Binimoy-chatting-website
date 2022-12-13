import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import LoginErr from "../components/alerts/LoginErr";

const Signup = () => {
  let [email, setEmail] = useState("");
  let [name, setName] = useState("");
  let [password, setPassword] = useState("");
  let [view, setView] = useState(true);

  let [emailerr, setEmailerr] = useState("");
  let [nameerr, setNameerr] = useState("");
  let [passworderr, setPassworderr] = useState("");

  let handleView = () => {
    if (!view) {
      setView(true);
    } else {
      setView(false);
    }
  };

  let handleEmail = (e)=>{
    setEmail(e.target.value)
    setEmailerr('')
  }
  let handleName = (e)=>{
    setName(e.target.value)
    setNameerr('')
  }
  let handlePassword = (e)=>{
    setPassword(e.target.value)
    setPassworderr('')
  }

  let handleSubmit = () => {
    if (!email) {
      setEmailerr("email Required");
    }
    if (!name) {
      setNameerr("name Required");
    }
    if (!password) {
      setPassworderr("password Required");
    }
  };

  return (
    <div className="signup">
      <div
        className="w-screen h-screen flex justify-items-center items-center"
        style={{
          background: "#5F34F5",
          // background: "#807DC8"
          // backgroundImage: 'url("images/signBG.png")',
          // backgroundPosition: "center",
          // backgroundSize: "cover",
          // backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-[450px] pt-[60px] drop-shadow-2xl p-[50px] bg-white mx-auto md:rounded-md">
          <div>
            <h2 className="text-center text-4xl font-bold text-heading font-nunito uppercase mb-[10px]">
              register
            </h2>
            <p className="font-nunito text-center text-heading text-sm font-normal mb-[20px]">
              Get started with easily register
            </p>
            <div className="relative">
            <input
              className="w-full border-b-2 border-[#e7e7e7] text-[20px] font-medium font-nunito text-heading  
                placeholder:text-sm placeholder:font-normal placeholder:text-heading placeholder:font-nunito pb-[10px] mb-[30px]"
              type="email"
              placeholder="Email Adress"
              onChange={handleEmail}
            />
            {emailerr ? (
                <div className="bg-red px-[5px] py-[2px] rounded mt-[-25px] absolute left-0 bottom-0 w-full">
                  <h3 className="text-white font-normal font-nunito text-sm">
                    {emailerr}
                  </h3>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="relative">
            <input
              className="w-full border-b-2 border-[#e7e7e7] text-[20px] font-medium font-nunito text-heading  
                placeholder:text-sm placeholder:font-normal placeholder:text-heading placeholder:font-nunito pb-[10px] mb-[30px]"
              type="text"
              placeholder="Full Name"
              onChange={handleName}
            />
            {nameerr ? (
                <div className="bg-red px-[5px] py-[2px] rounded mt-[-25px] absolute left-0 bottom-0 w-full">
                  <h3 className="text-white font-normal font-nunito text-sm">
                    {nameerr}
                  </h3>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="relative">
              <input
                className="w-full border-b-2 border-[#e7e7e7] text-[20px] font-medium font-nunito text-heading  
                placeholder:text-sm placeholder:font-normal placeholder:text-heading placeholder:font-nunito pb-[10px]  mb-[10px]"
                type={view ? "password" : "text"}
                placeholder="Password"
                onChange={handlePassword}
              />
              {passworderr ? (
                <div className="bg-red px-[5px] py-[2px] rounded mt-[5px] absolute left-0 bottom-[-19px] w-full">
                  <h3 className="text-white font-normal font-nunito text-sm">
                    {passworderr}
                  </h3>
                </div>
              ) : (
                ""
              )}

              <button
                className="absolute right-0 top-[50%] translate-y-[-50%] text-[18px] text-heading"
                onClick={handleView}
              >
                {view ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
            <button
              className="w-full text-[20px] font-medium font-nunito py-[12px] bg-primary text-white capitalize md:rounded-[50px] mt-[30px]"
              onClick={handleSubmit}
            >
              sign up
            </button>
            <div className="text-center mt-[20px]">
              <p className="text-center font-nunito text-heading text-sm font-normal">
                Already have an account ?{" "}
                <span className="text-[#EA6C00]">Sign In</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
