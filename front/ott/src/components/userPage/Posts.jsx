import React, { useState } from "react";
import PublicPosts from "../userPage/PublicPosts";
import PrivatePosts from "../userPage/PrivatePosts";
import AddIcon from "../../assets/icons/add_icon.png";

const Posts = () => {
  const [activePostType, setActivePostType] = useState("public");

  const handleLookbookRegister = () => {
    console.log("룩북 등록 버튼이 클릭되었습니다!");
    // 추가적인 동작을 여기에 작성할 수 있습니다.
  };

  return (
    <div className="w-full text-center">
      <div className="flex justify-center space-x-2">
        <button
          className={`py-2 px-5 cursor-pointer rounded-full ${
            activePostType === "public"
              ? "bg-violet-200 text-black"
              : "text-gray-400"
          }`}
          onClick={() => setActivePostType("public")}
          style={{ fontFamily: "dohyeon" }}
        >
          공개
        </button>
        <button
          className={`py-2 px-5 cursor-pointer rounded-full ${
            activePostType === "private"
              ? "bg-violet-200 text-black"
              : "text-gray-400"
          }`}
          onClick={() => setActivePostType("private")}
          style={{ fontFamily: "dohyeon" }}
        >
          비공개
        </button>
      </div>
      <div className="mt-[-2]">
        {" "}
        {/* 간격을 줄이기 위해 margin-top을 2로 설정 */}
        {activePostType === "public" ? <PublicPosts /> : <PrivatePosts />}
      </div>
      <div className="flex justify-center mt-4">
        {" "}
        {/* 간격을 줄이기 위해 margin-top을 4로 설정 */}
        <button
          className="w-[220px] py-1 px-5 cursor-pointer rounded-full bg-violet-200 text-white flex items-center justify-center mb-40 relative"
          style={{ fontFamily: "dohyeon" }}
          onClick={handleLookbookRegister}
        >
          <span className="flex items-center">
            <img src={AddIcon} alt="룩북 아이콘" className="w-6 h-6 mr-2" />
            룩북 등록
          </span>
        </button>
      </div>
    </div>
  );
};

export default Posts;
