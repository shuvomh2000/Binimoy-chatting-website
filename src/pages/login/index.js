import React, { useState } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { TailSpin } from "react-loader-spinner";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate()
  const provider = new GoogleAuthProvider();

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [success, setSuccess] = useState("");
  let [view, setView] = useState(true);

  let [emailerr, setEmailerr] = useState("");
  let [passworderr, setPassworderr] = useState("");
  let [ferr, setFerr] = useState("");

  let [loading, setLoading] = useState(false);

  const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    email
  );
  const strongPassword =
    /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/.test(
      password
    );

  let handleView = () => {
    if (!view) {
      setView(true);
    } else {
      setView(false);
    }
  };

  let handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailerr("");
  };
  let handlePassword = (e) => {
    setPassword(e.target.value);
    setPassworderr("");
  };

  let handleSubmit = () => {
    if (!email) {
      setEmailerr("email Required");
    } else if (!validEmail) {
      setEmailerr("Valid email Required");
    }

    if (!password) {
      setPassworderr("password Required");
    }
    //  else if (!/^(?=.*[a-z])/.test(password)) {
    //   setPassworderr("lowercase Required");
    // } else if (!/^(?=.*[A-Z])/.test(password)) {
    //   setPassworderr("uppercase Required");
    // } else if (!/^(?=.*[0-9])/.test(password)) {
    //   setPassworderr("number Required");
    // } else if (!/^(?=.*[!@#\$%\^&\*])/.test(password)) {
    //   setPassworderr("symbol Required");
    // } else if (!/^(?=.{8,})/.test(password)) {
    //   setPassworderr("minimum 8 cherecter Required");
    // }

    //&&strongPassword
    if (email && password && validEmail) {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setFerr("");
          setLoading(false);
          setSuccess("login successfull");
          setTimeout(()=>{
            navigate("/")
          },1500)
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode.includes("auth/user-not-found")) {
            setFerr("user not found");
            setLoading(false);
          } else if (errorCode.includes("auth/wrong-password")) {
            setFerr("password incorrect");
            setLoading(false);
          }
        });
    }
  };

  let handleGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setSuccess("login successfull");
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        setFerr(errorCode);
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  let handleImage = (e)=>{
    console.log(e.target.files)
  }

  return (
    <div className="login">
      <div
        className="w-screen h-screen flex justify-items-center items-center"
        style={{
          // background: "#5F34F5",
          background: "#807DC8",
          // backgroundImage: 'url("images/signBG.png")',
          // backgroundPosition: "center",
          // backgroundSize: "cover",
          // backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-[450px] pt-[60px] drop-shadow-2xl pt-[50px] px-[40px] pb-[30px] bg-white mx-auto md:rounded-md">
          <div>
            <h2 className="text-center text-4xl font-bold text-heading font-nunito uppercase mb-[10px]">
              login
            </h2>
            <p className="font-nunito text-center text-heading text-sm font-normal mb-[20px]">
              Get started with login
            </p>
            <div className="relative">
              <input
                className="w-full border-b-2 border-[#e7e7e7] text-[20px] font-normal font-poppins text-heading  
                placeholder:text-sm placeholder:font-normal placeholder:text-heading placeholder:font-poppins pb-[10px] mb-[20px]"
                type="email"
                placeholder="Email Adress"
                onChange={handleEmail}
              />
              {emailerr ? (
                <div className="bg-red px-[5px] py-[2px] rounded mt-[-25px] absolute left-0 bottom-0 w-full">
                  <h3 className="text-white font-normal font-poppins text-sm">
                    {emailerr}
                  </h3>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="relative">
              <input
                className="w-full border-b-2 border-[#e7e7e7] text-[20px] font-medium font-poppins text-heading  
                placeholder:text-sm placeholder:font-normal placeholder:text-heading placeholder:font-poppins pb-[10px]  mb-[10px]"
                type={view ? "password" : "text"}
                placeholder="Password"
                onChange={handlePassword}
              />
              {passworderr ? (
                <div className="bg-red px-[5px] py-[2px] rounded mt-[5px] absolute left-0 bottom-[-14px] w-full">
                  <h3 className="text-white font-normal font-poppins text-sm">
                    {passworderr}
                  </h3>
                </div>
              ) : (
                ""
              )}

              <button
                className="absolute right-[9px] top-[9px] text-[18px] text-heading"
                onClick={handleView}
              >
                {view ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
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
                login
              </button>
            )}

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
           <div className="text-center mt-[20px] cursor-pointer">
           <NavLink to="/forgetpassword">
              <h3 className="font-bold font-nunito text-sm text-primary capitalize">
                forget password
              </h3>
            </NavLink>
           </div>
            <div className="text-center ">
              <button
                className="p-[10px] rounded-[50px]  border text-[25px] mt-[10px]"
                onClick={handleGoogle}
              >
                <FcGoogle />
              </button>
            </div>
            <div className="text-center mt-[5px]">
              <p className="text-center font-nunito text-heading text-sm font-normal">
                Don't have an account ?{" "}
                <span className="text-[#EA6C00] cursor-pointer capitalize">
                  <NavLink to="/registration">register</NavLink>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
