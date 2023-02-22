import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { getAuth, updateProfile, signOut } from "firebase/auth";
import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import { BsChatDots } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { CiImageOn } from "react-icons/ci";
import { TailSpin } from "react-loader-spinner";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { useSelector } from "react-redux";

import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const Sidebar = ({ active }) => {
  const storage = getStorage();
  const auth = getAuth();
  const navigate = useNavigate();
  let user = useSelector((state) => state.loginUser.value);

  let [loading, setLoading] = useState(false);
  let [show, setShow] = useState(false);
  let [fix,setFix] =useState(false)

  const [image, setImage] = useState();
  const [imgName, setImgName] = useState("");
  const [cropper, setCropper] = useState();

  let handleImageUpload = () => {
    setShow(!show);
  };

  let handleImage = (e) => {
    setImgName(e.target.files[0].name);
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    setLoading(true);
    if (typeof cropper !== "undefined") {
      const storageRef = ref(storage, imgName);
      const message4 = cropper.getCroppedCanvas().toDataURL();
      uploadString(storageRef, message4, "data_url").then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          })
            .then(() => {
              console.log("profile picture upload");
              setCropper("");
              setImgName("");
              setImage("");
              setLoading(false);
              setShow(false);
            })
            .catch((error) => {
              console.log(error);
            });
        });
      });
    }
  };

  let handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("loginInfo");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // const handleScroll =()=>{
  //   // console.log(window.scrollY ==max)
  //   if(window.scrollY > 0){
  //     setFix(true)
  //   }else{
  //     setFix(false)
  //   }
  // }

  // window.addEventListener('scroll',handleScroll)

  return (
    <>
      <div className="w-full xl:h-full xl:rounded-br-[20px] xl:rounded-tr-xl bg-primary fixed bottom-0 left-0 xl:static px-[10px] xl:px-[0px] hidden xl:block">
        <div className="xl:pt-[38px] flex xl:block justify-center">
          <div className="relative group w-[40px] h-[40px] xl:w-[100px] xl:h-[100px] rounded-[50px] overflow-hidden bg-white xl:mx-auto my-auto cursor-pointer mr-[10px] ">
            {user && (
              <picture>
                <img
                  className="object-cover"
                  // src="images/user.jpg"
                  src={user.photo}
                  loading="lazy"
                />
              </picture>
            )}
            <div
              onClick={handleImageUpload}
              className="w-[50px] hidden group-hover:block h-[50px] xl:w-[100px] xl:h-[100px] rounded-[50px] overflow-hidden bg-bl_opacity xl:mx-auto my-auto absolute top-0 left-0"
            >
              <CiImageOn className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-wh_opacity text-[30px]" />
            </div>
          </div>

          {/* {curentUser.displayName} */}
          {user && (
            <h3 className="w-[80%] mx-auto text-center text-xl font-bold text-white font-nunito capitalize mt-[15px] hidden lg:block">
              {user.name}
            </h3>
          )}
          <ul className="xl:mt-[40px] flex xl:flex-col items-center overflow-x-hidden gap-x-[25px] px-7 xl:px-0">
            <NavLink to="/">
              <li
                className={`${
                  active == "home" &&
                  "xl:py-[25px] relative z-10 xl:after:absolute xl:after:content-[''] xl:after:bg-white xl:after:top-0 xl:left-0 xl:xl:after:left-[-45px] xl:after:w-[155px] xl:after:h-full xl:after:z-[-1] xl:after:rounded-tl-[20px] xl:after:rounded-bl-[20px] xl:before:absolute xl:before:content-[''] xl:before:bg-primary xl:before:top-0 xl:before:right-[-84px] xl:before:w-[9px] xl:before:h-full xl:before:rounded-[20px]  after:absolute after:content-[''] after:w-[45px] after:h-[45px] after:bg-white after:top-[-8px] after:left-[-10px]  after:z-[-1] after:rounded-[50%] xl:after:rounded-[0%] "
                }`}
              >
                <AiOutlineHome
                  className={`${
                    active == "home"
                      ? "text-[25px] xl:text-[30px] text-primary"
                      : "text-[25px] xl:text-[30px] text-white my-[25px]"
                  }`}
                />
              </li>
            </NavLink>
            <NavLink to="/message">
              <li
                className={`${
                  active == "message" &&
                  "xl:py-[25px] relative z-10 xl:after:absolute xl:after:content-[''] xl:after:bg-white xl:after:top-0 xl:left-0 xl:xl:after:left-[-45px] xl:after:w-[155px] xl:after:h-full xl:after:z-[-1] xl:after:rounded-tl-[20px] xl:after:rounded-bl-[20px] xl:before:absolute xl:before:content-[''] xl:before:bg-primary xl:before:top-0 xl:before:right-[-84px] xl:before:w-[9px] xl:before:h-full xl:before:rounded-[20px]  after:absolute after:content-[''] after:w-[45px] after:h-[45px] after:bg-white after:top-[-8px] after:left-[-10px]  after:z-[-1] after:rounded-[50%] xl:after:rounded-[0%]"
                }`}
              >
                <BsChatDots
                  className={`${
                    active == "message"
                      ? "text-[25px] xl:text-[30px] text-primary"
                      : "text-[25px] xl:text-[30px] text-white my-[25px]"
                  }`}
                />
              </li>
            </NavLink>
            <NavLink>
            {/* to="/notification" */}
              <li
                className={`${
                  active == "notification" &&
                  "xl:py-[25px] relative z-10 xl:after:absolute xl:after:content-[''] xl:after:bg-white xl:after:top-0 xl:left-0 xl:xl:after:left-[-45px] xl:after:w-[155px] xl:after:h-full xl:after:z-[-1] xl:after:rounded-tl-[20px] xl:after:rounded-bl-[20px] xl:before:absolute xl:before:content-[''] xl:before:bg-primary xl:before:top-0 xl:before:right-[-84px] xl:before:w-[9px] xl:before:h-full xl:before:rounded-[20px]  after:absolute after:content-[''] after:w-[45px] after:h-[45px] after:bg-white after:top-[-8px] after:left-[-10px]  after:z-[-1] after:rounded-[50%] xl:after:rounded-[0%]"
                }`}
              >
                <IoMdNotificationsOutline
                  className={`${
                    active == "notification"
                      ? "text-[25px] xl:text-[30px] text-primary"
                      : "text-[25px] xl:text-[30px] text-white my-[25px]"
                  }`}
                />
              </li>
            </NavLink>
            <NavLink to="/setting">
              <li
                className={`${
                  active == "setting" &&
                  "xl:py-[25px] relative z-10 xl:after:absolute xl:after:content-[''] xl:after:bg-white xl:after:top-0 xl:left-0 xl:xl:after:left-[-45px] xl:after:w-[155px] xl:after:h-full xl:after:z-[-1] xl:after:rounded-tl-[20px] xl:after:rounded-bl-[20px] xl:before:absolute xl:before:content-[''] xl:before:bg-primary xl:before:top-0 xl:before:right-[-84px] xl:before:w-[9px] xl:before:h-full xl:before:rounded-[20px]  after:absolute after:content-[''] after:w-[45px] after:h-[45px] after:bg-white after:top-[-8px] after:left-[-10px]  after:z-[-1] after:rounded-[50%] xl:after:rounded-[0%]"

                  // "py-[25px] relative z-10 after:absolute after:content-[''] after:bg-white after:top-0 after:left-[-45px] after:w-[155px] after:h-full after:z-[-1]  after:rounded-tl-[20px] after:rounded-bl-[20px] before:absolute before:content-[''] before:bg-primary before:top-0 before:right-[-84px] before:w-[9px] before:h-full before:rounded-[20px]"
                }`}
              >
                <AiOutlineSetting
                  className={`${
                    active == "setting"
                      ? "text-[25px] xl:text-[30px] text-primary"
                      : "text-[25px] xl:text-[30px] text-white my-[25px]"
                  }`}
                />
              </li>
            </NavLink>
            <li onClick={handleLogout} className="cursor-pointer">
              <FiLogOut className="text-[30px] text-white my-[25px]" />
            </li>
          </ul>
          {/* <div className="xl:mt-[50px] flex justify-center items-center">
            <FiLogOut className="text-[30px] text-white" />
          </div> */}
        </div>
      </div>

      {show && (
        <>
          <div className="w-screen h-screen bg-dark_opacity fixed top-0 left-0 z-[9999] flex justify-center items-center">
            <div className="p-[30px]  bg-white rounded-md">
              <h2 className="text-center text-4xl font-bold text-primary font-nunito capitalize mb-[40px]">
                image upload
              </h2>
              <div>
                {image && (
                  <div className="flex justify-around">
                    <div className="max-w-[250px] max-h-[250px]">
                      <Cropper
                        style={{ height: 150, width: "50%" }}
                        zoomTo={0.5}
                        initialAspectRatio={1}
                        preview=".img-preview"
                        src={image}
                        viewMode={1}
                        minCropBoxHeight={10}
                        minCropBoxWidth={10}
                        background={false}
                        responsive={true}
                        autoCropArea={1}
                        checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                        onInitialized={(instance) => {
                          setCropper(instance);
                        }}
                        guides={true}
                      />
                    </div>
                    <div className="flex items-center">
                      <div className="image w-[100px] h-[100px] rounded-[50%] overflow-hidden border-[5px] border-solid border-primary">
                        <div className="img-preview w-full h-full"></div>
                      </div>
                    </div>
                  </div>
                )}
                <input
                  onChange={handleImage}
                  type="file"
                  className="w-full border-b-2 border-[#e7e7e7] text-[20px] font-medium font-nunito text-heading  
         placeholder:text-sm placeholder:font-normal placeholder:text-heading placeholder:font-nunito pb-[10px] mb-[10px] mt-[20px]"
                />
              </div>

              {loading ? (
                <>
                  <div className="flex gap-x-2.5">
                    <div className="w-1/2 mt-[30px] py-[12px] mx-auto text-black flex justify-center items-center bg-primary">
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
                    <button className="w-1/2 text-[20px] font-medium font-nunito py-[12px] px-[6px] bg-red text-white capitalize mt-[30px]">
                      cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex gap-x-2.5">
                    <button
                      onClick={getCropData}
                      className="w-1/2 text-[20px] font-medium font-nunito py-[12px] px-[6px] bg-primary text-white capitalize mt-[30px]"
                    >
                      upload
                    </button>
                    <button
                      onClick={handleImageUpload}
                      className="w-1/2 text-[20px] font-medium font-nunito py-[12px] px-[6px] bg-red text-white capitalize mt-[30px]"
                    >
                      cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
      <div className="block xl:hidden w-full bg-primary py-4">
        <ul className="flex justify-center items-center gap-x-4 text-white text-[20px]">
          <li className="w-[35px] h-[35px] rounded-[50%] bg-black overflow-hidden">
          {user && (
              <picture>
                <img
                  className="object-cover"
                  // src="images/user.jpg"
                  src={user.photo}
                  loading="lazy"
                />
              </picture>
            )}
          </li>
          <NavLink to="/">
            <li className={`p-[7px] rounded-[50%] flex justify-center items-center ${active == "home" && "bg-white text-primary"}`}>
              <AiOutlineHome />
            </li>
          </NavLink>
          <NavLink to="/message">
            <li className={`p-[7px] rounded-[50%] flex justify-center items-center ${active == "message" && "bg-white text-primary"}`}>
              <BsChatDots />
            </li>
          </NavLink>
          {/* to="/notification" */}
          <NavLink >
            <li className={`p-[7px] rounded-[50%] flex justify-center items-center ${active == "notification" && "bg-white text-primary"}`}>
              <IoMdNotificationsOutline />
            </li>
          </NavLink>
          
          <NavLink to="/setting">
            <li className={`p-[7px] rounded-[50%] flex justify-center items-center ${active == "setting" && "bg-white text-primary"}`}>
              <AiOutlineSetting />
            </li>
          </NavLink>
          <li onClick={handleLogout}>
            <FiLogOut />
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
