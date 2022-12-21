import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

const ForgetPassword = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  let [email, setEmail] = useState("");
  let [success, setSuccess] = useState("");

  let [emailerr, setEmailerr] = useState("");
  let [ferr, setFerr] = useState("");

  let [loading, setLoading] = useState(false);

  const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    email
  );

  let handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailerr("");
  };

  let handleSubmit = (e) => {
    if (!email) {
      setEmailerr("email Required");
    } else if (!validEmail) {
      setEmailerr("Valid email Required");
    }

    if (email && validEmail) {
      setLoading(true);
      sendPasswordResetEmail(auth, email)
        .then(() => {
          setSuccess("reset your password via mail");
          setFerr("");
          setLoading(false);
        //   setTimeout(() => {
        //     navigate("/login");
        //   }, 2000);
        })
        .catch((error) => {
          const errorCode = error.code;
          setLoading(false);
          if(errorCode.includes("auth/user-not-found")){
            setFerr("user not found");
          }
          
        });
    }
  };

  return (
    <div className="w-screen h-screen flex justify-items-center items-center">
      <div className="w-[450px] pt-[60px] drop-shadow-2xl pt-[50px] px-[40px] pb-[30px] bg-white mx-auto md:rounded-md">
        <div>
          <h2 className="text-center text-4xl font-bold text-heading font-nunito capitalize mb-[40px]">
            forget password
          </h2>
          <div className="relative">
            <input
              className="w-full border-b-2 border-[#e7e7e7] text-[20px] font-medium font-nunito text-heading  
                placeholder:text-sm placeholder:font-normal placeholder:text-heading placeholder:font-nunito pb-[10px] mb-[10px]"
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

          {success ? (
            <div className="bg-green px-[5px] py-[2px] rounded mt-[10px]  w-full">
              <h3 className="text-white font-normal font-nunito text-sm">
                {success}
              </h3>
            </div>
          ) : (
            ""
          )}
          {ferr ? (
            <div className="bg-red px-[5px] py-[2px] rounded mt-[10px]  w-full">
              <h3 className="text-white font-normal font-nunito text-sm">
                {ferr}
              </h3>
            </div>
          ) : (
            ""
          )}

          {loading ? (
            <div className="w-full md:rounded-[50px] mt-[30px] py-[12px] mx-auto text-black flex justify-center items-center bg-primary">
              <TailSpin
                height="30"
                width="30"
                color="#fff"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div>
          ) : (
            <button
              className="w-full text-[20px] font-medium font-nunito py-[12px] bg-primary text-white capitalize md:rounded-[50px] mt-[30px]"
              onClick={handleSubmit}
            >
              change
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
