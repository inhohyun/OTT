import React, { useState, useEffect } from 'react';
import cancel from '../../assets/icons/blackdeleteicon.png';
import Comment from '../comment/Comment';
import SellComment from '../comment/SellComment';
import DetailViewer from './DetailViewer';
import Modal from './Modal';
import hearticon from '../../assets/icons/hearticon.png';
import fillhearticon from '../../assets/icons/fillhearticon.png';
import lookicon from '../../assets/icons/lookicon.png';
import {
  lookbookDislike,
  lookbookLike,
} from '../../api/lookbook/lookbookdetail';
import { lookbookComment } from '../../api/lookbook/comments';
import { lookbookDelete } from '../../api/lookbook/lookbook';
import useLookbookStore from '../../data/lookbook/detailStore';
import useUserStore from '../../data/lookbook/userStore';
import bingle from '../../assets/icons/bingle_bingle_icon.png';

const LookbookDetail = ({ onClose, onEdit, lookbook }) => {
  const [showSellComments, setShowSellComments] = useState(false);
  const [liked, setLiked] = useState(lookbook.favorite);
  const [cntFavorite, setCntFavorite] = useState(lookbook.cntFavorite);
  const [followed, setFollowed] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentSides, setCurrentSides] = useState({});
  const [comments, setComments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { deleteLookbook, hideDetail } = useLookbookStore();
  const userId = useUserStore((state) => state.userId);

  useEffect(() => {
    setLiked(lookbook.favorite);
    setCntFavorite(lookbook.cntFavorite);
  }, [lookbook]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const status = showSellComments ? 'DM' : 'comment';
        const commentsData = await lookbookComment(lookbook, status);
        setComments(commentsData);
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      }
    };

    fetchComments();
  }, [showSellComments, lookbook]);

  const tags = Array.isArray(lookbook?.tags) ? lookbook.tags : [];
  const salesClothes = Array.isArray(lookbook?.salesClothes)
    ? lookbook.salesClothes
    : [];
  const images = Array.isArray(lookbook?.images) ? lookbook.images : [];

  const allImages = [
    lookbook?.thumnail,
    ...(images ? images.map((item) => item.imagePath.path) : []),
  ];

  const currentUser = 'kimssafy';

  const toggleLike = () => {
    if (liked) {
      try {
        lookbookDislike(lookbook);
        setLiked(false);
        setCntFavorite((prevCntLike) => prevCntLike - 1);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        lookbookLike(lookbook);
        setLiked(true);
        setCntFavorite((prevCntLike) => prevCntLike + 1);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const toggleFollow = () => setFollowed(!followed);

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? allImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const toggleSide = () => {
    const currentImage = images[currentImageIndex];
    if (currentImage) {
      setCurrentSides((prevSides) => ({
        ...prevSides,
        [currentImage.clothesId]:
          prevSides[currentImage.clothesId] === 'FRONT' ? 'BACK' : 'FRONT',
      }));
    }
  };

  const handleDelete = () => {
    try {
      lookbookDelete(lookbook);
      hideDetail();
      deleteLookbook(lookbook.id);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  // salesClothes를 clothesId로 그룹화
  const groupedClothes = salesClothes.reduce((acc, item) => {
    const { clothesId } = item;
    if (!acc[clothesId]) {
      acc[clothesId] = [];
    }
    acc[clothesId].push(item);
    return acc;
  }, {});

  // 각 clothesId에 대한 현재 이미지 인덱스를 저장
  const [currentImageIndexes, setCurrentImageIndexes] = useState({});

  // 이미지 전환 함수
  const toggleImage = (clothesId) => {
    setCurrentImageIndexes((prevIndexes) => {
      const currentIndex = prevIndexes[clothesId] || 0;
      const nextIndex = (currentIndex + 1) % groupedClothes[clothesId].length;
      return {
        ...prevIndexes,
        [clothesId]: nextIndex,
      };
    });
  };

  return (
    <div
      className="fixed inset-0 bg-opacity-70 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        .nickname-wrap {
          display: inline-block;
          width: 100%;
          word-break: break-word;
        }
      `}</style>
      <div
        className="bg-white p-6 rounded-2xl shadow-lg max-w-xs w-full relative h-[75vh] mb-5 overflow-y-auto custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 p-0 bg-transparent border-none"
          onClick={onClose}
        >
          <img src={cancel} alt="cancel_icon" className="w-4 h-4" />
        </button>
        <div className="flex items-center mb-4">
          <div className="flex-grow">
            <h2 className={`text-xl font-bold`}>{lookbook.nickname}</h2>
            <p className="text-sm text-gray-500">
              {lookbook.createdAt.split('T')[0]}
            </p>
          </div>
          {currentUser !== lookbook.nickname && (
            <button
              className={`text-sm px-3 py-3 rounded-lg me-3 ${
                followed
                  ? 'bg-transparent border-2 border-solid border-violet-300 text-black'
                  : 'bg-violet-300 text-white'
              }`}
              style={{ fontFamily: 'dohyeon' }}
              onClick={toggleFollow}
            >
              {followed ? '팔로잉' : '팔로우'}
            </button>
          )}
          {currentUser === lookbook.nickname && (
            <div className="flex">
              <button
                className="text-sm py-3 px-3 me-3 rounded-lg bg-violet-300 text-white"
                style={{ fontFamily: 'dohyeon' }}
                onClick={() => setIsModalOpen(true)}
              >
                룩북관리
              </button>
            </div>
          )}
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onEdit={onEdit}
            onDelete={handleDelete}
          />
        </div>
        <div className="w-full border-solid border-t-2 border-slate-500 mt-4"></div>
        <div className="mb-4 flex mt-2 relative">
          <DetailViewer
            images={images}
            toggleSide={toggleSide}
            currentSide={
              currentSides[images[currentImageIndex]?.clothesId] || 'FRONT'
            }
            allImages={allImages}
            currentImageIndex={currentImageIndex}
            handlePreviousImage={handlePreviousImage}
            handleNextImage={handleNextImage}
          />
          <div className="flex flex-wrap flex-col items-start gap-1 mt-3 ml-3">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-black text-white text-xs rounded-md px-2 py-1 inline-block"
                style={{ fontSize: '10px', margin: '2px' }}
              >
                # {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="mb-4">
          {Object.keys(groupedClothes).length > 0 && (
            <h4 className="text-lg font-semibold">판매중인 옷</h4>
          )}
          <div className="flex flex-wrap gap-4">
            {Object.keys(groupedClothes).map((clothesId) => {
              const images = groupedClothes[clothesId];
              const currentIndex = currentImageIndexes[clothesId] || 0;
              const currentItem = images[currentIndex];

              return (
                <div
                  key={clothesId}
                  className="relative flex items-center space-x-2"
                >
                  <img
                    src={currentItem.imagePath.path}
                    alt={currentItem.clothesId}
                    className="w-12 h-12 object-contain rounded-lg"
                    style={{ objectPosition: 'center' }}
                  />
                  <button
                    className="absolute top-0 right-0 m-1"
                    style={{ background: 'none', zIndex: 10 }}
                    onClick={() => toggleImage(clothesId)}
                  >
                    <img className="w-4 h-4" src={bingle} alt="toggle icon" />
                  </button>
                  <p className="text-sm">{currentItem.name}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex items-center space-x-1 mb-4">
          <img
            src={liked ? fillhearticon : hearticon}
            className="w-4 h-4 cursor-pointer"
            onClick={toggleLike}
          />
          <div className="flex items-center space-x-4 text-[13px]">
            <span>{cntFavorite}</span>
            <img className="w-[20px] h-[20px]" src={lookicon} alt="" />
          </div>
          <span className="text-[13px]">{lookbook.viewCount}</span>
        </div>
        <div className="mb-4 text-[14px]" style={{ wordBreak: 'break-word' }}>
          <p>{lookbook.content}</p>
        </div>
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <p
              className={`text-lg cursor-pointer ${
                !showSellComments ? 'text-black font-bold' : 'text-slate-500'
              }`}
              onClick={() => setShowSellComments(false)}
            >
              댓글
            </p>
            <p
              className={`text-lg cursor-pointer ${
                showSellComments ? 'text-black font-bold' : 'text-slate-500'
              }`}
              onClick={() => setShowSellComments(true)}
            >
              판매용 댓글
            </p>
          </div>
          <div
            className="overflow-y-auto custom-scrollbar"
            style={{ maxHeight: '200px' }}
          >
            {showSellComments ? (
              <SellComment
                comments={comments}
                lookbookId={lookbook.id}
                lookbook={lookbook}
                userId={userId}
              />
            ) : (
              <Comment
                comments={comments}
                lookbookId={lookbook.id}
                lookbook={lookbook}
                userId={userId}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookbookDetail;
