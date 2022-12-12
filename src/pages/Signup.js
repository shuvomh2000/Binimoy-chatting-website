import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const Signup = () => {
  let [email, setEmail] = useState("");
  let [name, setName] = useState("");
  let [password, setPassword] = useState("");
  let [view, setView] = useState(true);

  let [emailerr, setEmailerr] = useState("");

  let handleView = () => {
    if (!view) {
      setView(true);
    } else {
      setView(false);
    }
    console.log(view);
  };

  let handleSubmit = () => {
    if (!email) {
      console.log("email Required");
    }
    if (!name) {
      console.log("name Required");
    }
    if (!password) {
      console.log("password Required");
    }
  };

  return (
    <div className="signup">
      <div
        className="w-screen h-screen"
        style={{
          backgroundImage: 'url("images/signBG.png")',
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-[1100px] pt-[60px] mx-auto flex  drop-shadow-2xl">
          <div className="w-1/2 bg-[#5F35F5]">
            <div>
              <img src="images/demo2.png" />
            </div>
          </div>
          <div className="w-1/2 p-[50px] bg-white">
            <h2 className="text-4xl font-bold text-heading font-nunito uppercase">
              register
            </h2>
            <p className="font-nunito text-heading text-sm font-normal">
              Get started with easily register
            </p>
            <div className="mt-[50px]">
              <input
                className="w-full border-b-2 border-[#e7e7e7] text-[20px] font-medium font-nunito text-heading  
                placeholder:text-sm placeholder:font-normal placeholder:text-heading placeholder:font-nunito pb-[10px] mb-[30px]"
                type="email"
                placeholder="Email Adress"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="w-full border-b-2 border-[#e7e7e7] text-[20px] font-medium font-nunito text-heading  
                placeholder:text-sm placeholder:font-normal placeholder:text-heading placeholder:font-nunito pb-[10px] mb-[30px]"
                type="text"
                placeholder="Full Name"
                onChange={(e) => setName(e.target.value)}
              />
              <div className="relative"> 
                <input
                  className="w-full border-b-2 border-[#e7e7e7] text-[20px] font-medium font-nunito text-heading  
                placeholder:text-sm placeholder:font-normal placeholder:text-heading placeholder:font-nunito pb-[10px]"
                  type={view ? "password" : "text"}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className="absolute right-0 top-[50%] translate-y-[-50%] text-[18px] text-heading" onClick={handleView}>
                  {view ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
              </div>
              <button
                className="w-full text-[20px] font-medium font-nunito py-[15px] bg-primary text-white capitalize rounded-[50px] mt-[30px]"
                onClick={handleSubmit}
              >
                sign up
              </button>
            </div>
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
