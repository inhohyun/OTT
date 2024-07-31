import React from 'react';
import leftArrow from '../../assets/icons/left_arrow_icon.png';
import rightArrow from '../../assets/icons/right_arrow_icon.png';
import bingle from '../../assets/icons/bingle_bingle_icon.png';

const DetailViewer = ({
  images,
  toggleSide,
  currentSide,
  allImages,
  currentImageIndex,
  handlePreviousImage,
  handleNextImage,
}) => {
  const currentImage = images[currentImageIndex - 1]; // -1 because the first image is the thumbnail

  // Ensure currentImage is defined and has necessary properties
  if (!currentImage || !currentImage.clothesId || !currentImage.imagePath) {
    return (
      <div className="relative w-[150px] h-[150px]">
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 p-1 w-6 h-6"
          style={{ zIndex: 1, background: 'none' }}
          onClick={handlePreviousImage}
        >
          <img className="w-6 h-6" src={leftArrow} alt="previous" />
        </button>
        <img
          src={allImages[0]} // Thumbnail image
          alt="Thumbnail"
          className="w-full h-auto object-cover rounded-lg"
        />
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 p-1 w-6 h-6"
          style={{ zIndex: 1, background: 'none' }}
          onClick={handleNextImage}
        >
          <img className="w-6 h-6" src={rightArrow} alt="next" />
        </button>
      </div>
    );
  }

  // Determine whether to show front or back image
  const displayedImagePath =
    currentSide === 'FRONT'
      ? images.find(
          (img) =>
            img.clothesId === currentImage.clothesId &&
            img.imagePath.itemStatus === 'FRONT'
        )?.imagePath.path
      : images.find(
          (img) =>
            img.clothesId === currentImage.clothesId &&
            img.imagePath.itemStatus === 'BACK'
        )?.imagePath.path;

  return (
    <div className="relative w-[150px] h-[150px]">
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 p-1 w-6 h-6"
        style={{ zIndex: 1, background: 'none' }}
        onClick={handlePreviousImage}
      >
        <img className="w-6 h-6" src={leftArrow} alt="previous" />
      </button>
      <img
        src={displayedImagePath || allImages[0]}
        alt={`Lookbook image ${currentImageIndex}`}
        className="w-full h-auto object-cover rounded-lg"
        onClick={toggleSide}
      />
      {images.some(
        (img) =>
          img.clothesId === currentImage.clothesId &&
          img.imagePath.itemStatus === 'BACK'
      ) && (
        <button
          className="absolute top-0 right-0 transform -translate-x-1/2 p-1 w-6 h-6"
          style={{ zIndex: 2, background: 'none' }}
          onClick={toggleSide}
        >
          <img src={bingle} alt="" className="w-6 h-6" />
        </button>
      )}
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 p-1 w-6 h-6"
        style={{ zIndex: 1, background: 'none' }}
        onClick={handleNextImage}
      >
        <img className="w-6 h-6" src={rightArrow} alt="next" />
      </button>
    </div>
  );
};

export default DetailViewer;
