import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate를 import 합니다
import mainIcon from "../../assets/icons/main.logo.png";
import Posts from "@/components/userPage/Posts";
import Followers from "@/components/userPage/Followers";
import Following from "@/components/userPage/Following";
import backgroundImage from "../../assets/images/background_image_main.png";
import lockIcon from "../../assets/icons/lockicon.png";
import settingIcon from "../../assets/icons/Setting_icon.png";

const NavBar = ({ activeComponent, setActiveComponent }) => {
  const postNumber = 100;
  const follwerNumber = 100;
  const followingNumber = 100;

  return (
    <nav className="w-full text-center flex justify-around text-lg mt- font-dohyeon">
      <button
        className={`bg-transparent border-none text-[rgba(0,0,0,0.5)] py-2 px-5 cursor-pointer rounded-full ${
          activeComponent === "posts" ? "bg-violet-200" : ""
        }`}
        onClick={() => setActiveComponent("posts")}
        aria-label="게시글"
        style={{ fontFamily: "dohyeon" }}
      >
        {postNumber} 게시글
      </button>
      <button
        className={`bg-transparent border-none text-[rgba(0,0,0,0.5)] py-2 px-5 cursor-pointer rounded-full ${
          activeComponent === "followers" ? "bg-violet-200" : ""
        }`}
        onClick={() => setActiveComponent("followers")}
        aria-label="팔로워"
        style={{ fontFamily: "dohyeon" }}
      >
        {follwerNumber} 팔로워
      </button>
      <button
        className={`bg-transparent border-none text-[rgba(0,0,0,0.5)] py-2 px-5 cursor-pointer rounded-full ${
          activeComponent === "following" ? "bg-violet-200" : ""
        }`}
        onClick={() => setActiveComponent("following")}
        aria-label="팔로잉"
        style={{ fontFamily: "dohyeon" }}
      >
        {followingNumber} 팔로잉
      </button>
    </nav>
  );
};

const UserProfile = () => {
  const [activeComponent, setActiveComponent] = useState("posts");
  const navigate = useNavigate(); // useNavigate를 사용하여 navigate 함수를 정의합니다
  const tags = [
    "한여름의 도시남",
    "댄디남",
    "훈남",
    "여자들이 좋아하는",
    "소개팅",
  ];

  let renderComponent;
  switch (activeComponent) {
    case "posts":
      renderComponent = <Posts />;
      break;
    case "followers":
      renderComponent = <Followers />;
      break;
    case "following":
      renderComponent = <Following />;
      break;
    default:
      renderComponent = null;
  }

  return (
    <div className="w-full h-full flex items-center justify-center font-dohyeon">
      <div
        className="w-full h-full relative flex flex-col items-center justify-start bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="w-full flex justify-center mt-8">
          <img
            className="w-[70px] h-[70px] rounded-full"
            alt="User Icon"
            src={mainIcon}
          />
        </div>
        <div className="w-full flex items-center justify-center mt-6">
          <img src={lockIcon} alt="잠금표시" className="w-6 h-6 mr-2" />
          <p className="text-lg font-dohyeon text-[rgba(0,0,0,0.5)]">
            mediamodifier
          </p>
          <img
            src={settingIcon}
            alt="수정"
            className="w-6 h-6 ml-2 cursor-pointer"
            onClick={() => navigate("/updateProfile")}
          />
        </div>
        <div
          className={`w-full flex justify-center mt-6 ${
            tags.length > 3 ? "flex-wrap" : ""
          } space-x-2`}
        >
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-violet-200 text-[rgba(0,0,0,0.5)] py-1 px-3 rounded-full text-sm mb-2"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="w-full mt-6 flex flex-col items-center">
          <NavBar
            activeComponent={activeComponent}
            setActiveComponent={setActiveComponent}
          />
          <div
            className="mt-4 text-[rgba(0,0,0,0.5)] w-full flex justify-center"
            style={{ height: "400px" }}
          >
            {renderComponent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
