// import React, { useState } from 'react';
// import LookbookDetail from './LookbookDetail';
// import hearticon from '../../assets/icons/hearticon.png';
// import commenticon from '../../assets/icons/commenticon.png';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Lookbook = ({ data, onDelete }) => {
//   const [isDetailVisible, setIsDetailVisible] = useState(false);
//   const [selectedLookbook, setSelectedLookbook] = useState(null);
//   const nav = useNavigate();

//   const handleShowDetail = () => {
//     // setSelectedLookbook(data);
//     // setIsDetailVisible(true);
//     axios
//       .get(`http://192.168.100.89:8080/api/lookbook/${data.lookbookId}`)
//       .then((response) => {
//         console.log('룩북 상세보기', response.data);
//         console.log('룩북아이디', data.lookbookId);
//         setSelectedLookbook({ ...response.data, id: data.lookbookId });
//         setIsDetailVisible(true);
//       })
//       .catch((error) => {
//         console.log(error);
//         if (error.response) {
//           console.error('Response data:', error.response.data);
//           console.error('Response status:', error.response.status);
//           console.error('Response headers:', error.response.headers);
//         } else if (error.request) {
//           console.error('Request data:', error.request);
//         } else {
//           console.error('Error message:', error.message);
//         }
//       });
//   };

//   const handleCloseDetail = () => {
//     setIsDetailVisible(false);
//     setSelectedLookbook(null);
//   };

//   const calcTimeAgo = (createdAt) => {
//     if (!createdAt) return 'Invalid date';
//     const now = new Date();
//     const createdDate = new Date(createdAt.replace(' ', 'T'));
//     const diffInSeconds = (now - createdDate) / 1000; // Difference in seconds

//     const diffInMinutes = diffInSeconds / 60;
//     const diffInHours = diffInMinutes / 60;
//     const diffInDays = diffInHours / 24;
//     const diffInMonths = diffInDays / 30; // Approximate month
//     const diffInYears = diffInDays / 365; // Approximate year

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
//     console.log('선택된룩북', selectedLookbook);
//     setIsDetailVisible(false); // Close the modal
//     nav(`/update-lookbook/${selectedLookbook.id}`, {
//       state: { lookbook: selectedLookbook },
//     }); // Navigate with ID in the URL
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
//               <img src={hearticon} alt="hearticon" className="w-4 mr-1 mt-1" />
//               <span className="text-gray-600 text-[10px] mt-1">
//                 {data.cntLike}
//                 {/* 좋아요 수 */}
//               </span>
//             </div>
//             <div className="flex items-center">
//               <img
//                 src={commenticon}
//                 alt="commenticon"
//                 className="w-4 mr-1 mt-1"
//               />
//               <span className="text-gray-600 text-[10px] mt-1">
//                 {/* {data.comments.length} */}
//                 {data.cntComment}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//       {isDetailVisible && (
//         <LookbookDetail
//           lookbook={selectedLookbook}
//           onClose={handleCloseDetail}
//           onEdit={handleEditLookbook}
//           lookbookId={data.lookbookId}
//           onDelete={onDelete}
//         />
//       )}
//     </>
//   );
// };

// export default Lookbook;

// import React from 'react';
// import LookbookDetail from './LookbookDetail';
// import hearticon from '../../assets/icons/hearticon.png';
// import commenticon from '../../assets/icons/commenticon.png';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import detailStore from '../../data/lookbook/detailStore';

// const Lookbook = ({ data, onDelete }) => {
//   const nav = useNavigate();
//   const { showDetail, hideDetail, isDetailVisible, selectedLookbook } =
//     detailStore();

//   const handleShowDetail = () => {
//     axios
//       .get(`http://192.168.100.89:8080/api/lookbook/${data.lookbookId}`)
//       .then((response) => {
//         console.log('룩북 상세보기', response.data);
//         console.log('룩북아이디', data.lookbookId);
//         showDetail({ ...response.data, id: data.lookbookId });
//       })
//       .catch((error) => {
//         console.log(error);
//         if (error.response) {
//           console.error('Response data:', error.response.data);
//           console.error('Response status:', error.response.status);
//           console.error('Response headers:', error.response.headers);
//         } else if (error.request) {
//           console.error('Request data:', error.request);
//         } else {
//           console.error('Error message:', error.message);
//         }
//       });
//   };

//   const handleCloseDetail = () => {
//     hideDetail();
//   };

//   const calcTimeAgo = (createdAt) => {
//     if (!createdAt) return 'Invalid date';
//     const now = new Date();
//     const createdDate = new Date(createdAt.replace(' ', 'T'));
//     const diffInSeconds = (now - createdDate) / 1000; // Difference in seconds

//     const diffInMinutes = diffInSeconds / 60;
//     const diffInHours = diffInMinutes / 60;
//     const diffInDays = diffInHours / 24;
//     const diffInMonths = diffInDays / 30; // Approximate month
//     const diffInYears = diffInDays / 365; // Approximate year

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
//     console.log('선택된룩북', selectedLookbook);
//     hideDetail(); // Close the modal
//     nav(`/update-lookbook/${selectedLookbook.id}`, {
//       state: { lookbook: selectedLookbook },
//     }); // Navigate with ID in the URL
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
//               <img src={hearticon} alt="hearticon" className="w-4 mr-1 mt-1" />
//               <span className="text-gray-600 text-[10px] mt-1">
//                 {data.cntLike}
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
//           lookbook={selectedLookbook}
//           onClose={handleCloseDetail}
//           onEdit={handleEditLookbook}
//           onDelete={() => {
//             hideDetail();
//             detailStore.getState().fetchLookbooks(); // Fetch the lookbooks again
//           }}
//           lookbookId={data.lookbookId}
//         />
//       )}
//     </>
//   );
// };

// export default Lookbook;

import LookbookDetail from './LookbookDetail';
import hearticon from '../../assets/icons/hearticon.png';
import fillhearticon from '../../assets/icons/fillhearticon.png';
import commenticon from '../../assets/icons/commenticon.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import detailStore from '../../data/lookbook/detailStore';

const Lookbook = ({ data, onDelete, onClose }) => {
  // Receive onDelete prop
  const nav = useNavigate();
  const {
    showDetail,
    hideDetail,
    isDetailVisible,
    selectedLookbook,
    // fetchLookbooks,
  } = detailStore();
  // const [liked, setLiked] = useState(data.like);

  const handleShowDetail = () => {
    axios
      .get(`http://192.168.100.89:8080/api/lookbook/${data.lookbookId}`, {
        params: { uid: 1 },
      })
      .then((response) => {
        console.log('룩북 상세보기', response.data);
        console.log('룩북아이디', data.lookbookId);
        showDetail({ ...response.data, id: data.lookbookId });
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        } else if (error.request) {
          console.error('Request data:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
      });
  };

  const calcTimeAgo = (createdAt) => {
    if (!createdAt) return 'Invalid date';
    const now = new Date();
    const createdDate = new Date(createdAt.replace(' ', 'T'));
    const diffInSeconds = (now - createdDate) / 1000; // Difference in seconds

    const diffInMinutes = diffInSeconds / 60;
    const diffInHours = diffInMinutes / 60;
    const diffInDays = diffInHours / 24;
    const diffInMonths = diffInDays / 30; // Approximate month
    const diffInYears = diffInDays / 365; // Approximate year

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

  const handleEditLookbook = () => {
    console.log('선택된룩북', selectedLookbook);
    hideDetail(); // Close the modal
    nav(`/update-lookbook/${selectedLookbook.id}`, {
      state: { lookbook: selectedLookbook },
    }); // Navigate with ID in the URL
  };

  return (
    <>
      <div
        onClick={handleShowDetail}
        className="w-[120px] h-[160px] rounded-[5px] overflow-hidden shadow-lg bg-white m-2 flex-shrink-0 cursor-pointer"
      >
        <div className="px-2 py-1 flex justify-between items-center">
          <div className="font-bold text-xs mb-1 text-[15px]">
            {data.nickname}
          </div>
          <p className="text-stone-300 text-xs text-[8px]">
            {calcTimeAgo(data.createdAt)}
          </p>
        </div>
        <div className="px-3 py-1 mb-1">
          <img
            className="w-full h-20 object-cover"
            src={data.img}
            alt={data.name}
          />
        </div>
        <div className="px-3 pb-1 flex justify-end items-center">
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              <img
                src={data.like ? fillhearticon : hearticon}
                className="w-4 mr-1 mt-1"
              />
              {/* <img src={hearticon} alt="hearticon" className="w-4 " /> */}
              <span className="text-gray-600 text-[10px] mt-1">
                {data.cntLike}
              </span>
            </div>
            <div className="flex items-center">
              <img
                src={commenticon}
                alt="commenticon"
                className="w-4 mr-1 mt-1"
              />
              <span className="text-gray-600 text-[10px] mt-1">
                {data.cntComment}
              </span>
            </div>
          </div>
        </div>
      </div>
      {isDetailVisible && selectedLookbook && (
        <LookbookDetail
          lookbook={selectedLookbook}
          onClose={onClose}
          onEdit={handleEditLookbook}
          lookbookId={selectedLookbook.id}
          onDelete={onDelete} // Pass onDelete to LookbookDetail
        />
      )}
    </>
  );
};

export default Lookbook;
