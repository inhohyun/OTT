import React, { useState } from 'react';
import cancel from '../../assets/icons/blackdeleteicon.png';
import Comment from '../comment/Comment';
import SellComment from '../comment/SellComment';
import DetailViewer from './DetailViewer';
import hearticon from '../../assets/icons/hearticon.png';
import fillhearticon from '../../assets/icons/fillhearticon.png';
import lookicon from '../../assets/icons/lookicon.png';

const LookbookDetail = ({ lookbook, onClose, onEdit }) => {
  const [showSellComments, setShowSellComments] = useState(false);
  const [liked, setLiked] = useState(false);
  const [followed, setFollowed] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentSides, setCurrentSides] = useState({});

  if (!lookbook) return null;

  const tags = Array.isArray(lookbook.tags) ? lookbook.tags : [];
  const salesClothes = Array.isArray(lookbook.salesClothes)
    ? lookbook.salesClothes
    : [];
  const comments = Array.isArray(lookbook.comments) ? lookbook.comments : [];

  const allImages = [
    lookbook.thumnail,
    ...lookbook.images.map((item) => item.imagePath.path),
  ];

  const currentUser = 'Kimssafy';

  const toggleLike = () => setLiked(!liked);
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
    const currentImage = lookbook.images[currentImageIndex];
    if (currentImage) {
      setCurrentSides((prevSides) => ({
        ...prevSides,
        [currentImage.clothesId]:
          prevSides[currentImage.clothesId] === 'FRONT' ? 'BACK' : 'FRONT',
      }));
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
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
            <h2 className="text-xl font-bold">{lookbook.nickname}</h2>
            <p className="text-sm text-gray-500">{lookbook.createdAt}</p>
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
            <button
              className="text-sm px-3 py-3 rounded-lg me-3 bg-violet-300 text-white"
              style={{ fontFamily: 'dohyeon' }}
              onClick={onEdit}
            >
              룩북 삭제
            </button>
          )}
        </div>
        <div className="w-full border-solid border-t-2 border-slate-500 mt-4"></div>
        <div className="mb-4 flex mt-2 relative">
          <DetailViewer
            images={lookbook.images}
            toggleSide={toggleSide}
            currentSide={
              currentSides[lookbook.images[currentImageIndex]?.clothesId] ||
              'FRONT'
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
          <h4 className="text-lg font-semibold">판매중인 옷</h4>
          <div className="flex flex-wrap gap-4">
            {salesClothes.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <img
                  src={item.imagePath.path}
                  alt={item.clothesId}
                  className="w-12 h-12 object-cover rounded-lg"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                />
                <p className="text-sm">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-1 mb-4">
          <img
            src={liked ? fillhearticon : hearticon}
            className="w-4 h-4 cursor-pointer"
            onClick={toggleLike}
          />
          <div className="flex items-center space-x-4 text-[13px]">
            <span>{lookbook.cntLike}</span>
            {/* <span>좋아요 수</span> */}
            <img className="w-[20px] h-[20px]" src={lookicon} alt="" />
          </div>
          <span className="text-[13px]">{lookbook.viewCount}</span>
        </div>
        <div className="mb-4 text-[14px]" style={{ wordBreak: 'break-word' }}>
          <p>{lookbook.content}</p>
        </div>
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-3">
            <p
              className={`text-lg cursor-pointer ${!showSellComments ? 'text-black font-bold' : 'text-slate-500'}`}
              onClick={() => setShowSellComments(false)}
            >
              댓글
            </p>
            <p
              className={`text-lg cursor-pointer ${showSellComments ? 'text-black font-bold' : 'text-slate-500'}`}
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
              <SellComment comments={comments} />
            ) : (
              <Comment comments={comments} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookbookDetail;
