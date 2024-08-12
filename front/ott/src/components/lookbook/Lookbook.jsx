// import LookbookDetail from './LookbookDetail';
// import hearticon from '../../assets/icons/hearticon.png';
// import fillhearticon from '../../assets/icons/fillhearticon.png';
// import commenticon from '../../assets/icons/commenticon.png';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import detailStore from '../../data/lookbook/detailStore';
// import useUserStore from '../../data/lookbook/userStore';

// const Lookbook = ({ data, onDelete, onClose }) => {
//   const [isDetailVisible, setIsDetailVisible] = useState(false); // 컴포넌트 내부 상태로 관리
//   const nav = useNavigate();
//   const { showDetail, hideDetail, selectedLookbook } = detailStore();
//   const userId = useUserStore((state) => state.userId);

//   const handleShowDetail = () => {
//     showDetail(data);
//     setIsDetailVisible(true); // 디테일 모달 열기
//   };

//   const handleCloseDetail = () => {
//     hideDetail();
//     setIsDetailVisible(false); // 디테일 모달 닫기
//   };

//   const calcTimeAgo = (createdAt) => {
//     if (!createdAt) return 'Invalid date';
//     const now = new Date();
//     const createdDate = new Date(createdAt.replace(' ', 'T'));
//     const diffInSeconds = (now - createdDate) / 1000;

//     const diffInMinutes = diffInSeconds / 60;
//     const diffInHours = diffInMinutes / 60;
//     const diffInDays = diffInHours / 24;
//     const diffInMonths = diffInDays / 30;
//     const diffInYears = diffInDays / 365;

//     if (diffInSeconds < 60) {
//       return `${Math.floor(diffInSeconds)}초 전`;
//     } else if (diffInMinutes < 60) {
//       return `${Math.floor(diffInMinutes)}분 전`;
//     } else if (diffInHours < 24) {
//       return `${Math.floor(diffInHours)}시간 전`;
//     } else if (diffInDays < 30) {
//       return `${Math.floor(diffInDays)}일 전`;
//     } else if (diffInMonths < 12) {
//       return `${Math.floor(diffInMonths)}달 전`;
//     } else {
//       return `${Math.floor(diffInYears)}년 전`;
//     }
//   };

//   const handleEditLookbook = () => {
//     hideDetail();
//     setIsDetailVisible(false);
//     nav(`/update-lookbook/${selectedLookbook.lookbookId}`, {
//       state: { lookbook: selectedLookbook },
//     });
//   };

//   return (
//     <>
//       <div
//         onClick={handleShowDetail}
//         className="w-[120px] h-[160px] rounded-[5px] overflow-hidden shadow-lg bg-white m-2 flex-shrink-0 cursor-pointer"
//       >
//         <div className="px-2 py-1 flex justify-between items-center">
//           <div className="font-bold text-xs mb-1 text-[15px]">
//             {data.nickname}
//           </div>
//           <p className="text-stone-300 text-xs text-[8px]">
//             {calcTimeAgo(data.createdAt)}
//           </p>
//         </div>
//         <div className="px-3 py-1 mb-1">
//           <img
//             className="w-full h-20 object-cover"
//             src={data.img}
//             alt={data.name}
//           />
//         </div>
//         <div className="px-3 pb-1 flex justify-end items-center">
//           <div className="flex items-center space-x-1">
//             <div className="flex items-center">
//               <img
//                 src={data.favorite ? fillhearticon : hearticon}
//                 className="w-4 mr-1 mt-1"
//               />
//               <span className="text-gray-600 text-[10px] mt-1">
//                 {data.cntFavorite}
//               </span>
//             </div>
//             <div className="flex items-center">
//               <img
//                 src={commenticon}
//                 alt="commenticon"
//                 className="w-4 mr-1 mt-1"
//               />
//               <span className="text-gray-600 text-[10px] mt-1">
//                 {data.cntComment}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//       {isDetailVisible && selectedLookbook && (
//         <LookbookDetail
//           currentLookbook={selectedLookbook}
//           onClose={onClose}
//           onEdit={handleEditLookbook}
//           lookbookId={selectedLookbook.lookbookId}
//           onDelete={() => onDelete(selectedLookbook.lookbookId)}
//         />
//       )}
//     </>
//   );
// };

// export default Lookbook;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import detailStore from '../../data/lookbook/detailStore';
import useUserStore from '../../data/lookbook/userStore';
import LookbookDetail from './LookbookDetail';
import hearticon from '../../assets/icons/hearticon.png';
import fillhearticon from '../../assets/icons/fillhearticon.png';
import commenticon from '../../assets/icons/commenticon.png';

const Lookbook = ({ data, onDelete, onClose }) => {
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const nav = useNavigate();
  const { showDetail, hideDetail, selectedLookbook } = detailStore();
  const userId = useUserStore((state) => state.userId);

  const handleShowDetail = () => {
    showDetail(data);
    setIsDetailVisible(true);
  };

  const handleCloseDetail = () => {
    hideDetail();
    setIsDetailVisible(false);
  };

  const calcTimeAgo = (createdAt) => {
    if (!createdAt) return 'Invalid date';
    const now = new Date();
    const createdDate = new Date(createdAt.replace(' ', 'T'));
    const diffInSeconds = (now - createdDate) / 1000;

    const diffInMinutes = diffInSeconds / 60;
    const diffInHours = diffInMinutes / 60;
    const diffInDays = diffInHours / 24;
    const diffInMonths = diffInDays / 30;
    const diffInYears = diffInDays / 365;

    if (diffInSeconds < 60) {
      return `${Math.floor(diffInSeconds)}초 전`;
    } else if (diffInMinutes < 60) {
      return `${Math.floor(diffInMinutes)}분 전`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}시간 전`;
    } else if (diffInDays < 30) {
      return `${Math.floor(diffInDays)}일 전`;
    } else if (diffInMonths < 12) {
      return `${Math.floor(diffInMonths)}달 전`;
    } else {
      return `${Math.floor(diffInYears)}년 전`;
    }
  };

  return (
    <>
      <div
        onClick={handleShowDetail}
        className="flex-none w-56 p-2 rounded-lg relative flex flex-col items-center cursor-pointer m-2"
        style={{ minWidth: '180px', height: '250px' }}
      >
        <div className="bg-stone-200 p-4 rounded-lg shadow-md w-full h-full relative">
          <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
            <p className="text-[20px] text-gray-500">{data.nickname}</p>
            <p className="text-xs text-stone-500">
              {calcTimeAgo(data.createdAt)}
            </p>
          </div>
          <div className="flex flex-col items-center mt-4 mb-4">
            <div className="w-[165px] h-[165px] mt-1">
              <img
                className="w-full h-full object-cover"
                src={data.img}
                alt={data.name}
              />
            </div>
          </div>
          <div className="absolute bottom-2 right-2 flex w-full justify-end">
            <span className="text-xs text-gray-500 ml-2">
              {data.favorite ? '❤️' : '🤍'}
              {data.cntFavorite}
            </span>
            <span className="text-xs text-gray-500 ml-2">
              💬 {data.cntComment}
            </span>
          </div>
        </div>
      </div>
      {isDetailVisible && selectedLookbook && (
        <LookbookDetail
          currentLookbook={selectedLookbook}
          onClose={onClose}
          lookbookId={selectedLookbook.lookbookId}
          onDelete={() => onDelete(selectedLookbook.lookbookId)}
        />
      )}
    </>
  );
};

export default Lookbook;
