import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const ClothesDetailsView = ({ itemDetails, onEdit, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const getGenderText = (gender) => {
    const genderMap = {
      MAN: '남성',
      WOMAN: '여성',
      COMMON: '남녀공용',
    };
    return genderMap[gender] || '지정되지 않음';
  };

  const getPublicStatusText = (publicStatus) => {
    const statusMap = {
      PUBLIC: '공개',
      PRIVATE: '비공개',
    };
    return statusMap[publicStatus] || '지정되지 않음';
  };

  const getSalesStatusText = (salesStatus) => {
    return salesStatus === 'ON_SALE' ? 'O' : 'X';
  };

  return (
    <>
      <div className="absolute top-3 right-3 flex space-x-2">
        <div
          onClick={onEdit}
          className="text-gray-600 hover:text-gray-800 cursor-pointer"
        >
          <FontAwesomeIcon icon={faEdit} size="lg" />
        </div>
        <div
          onClick={onClose}
          className="text-gray-600 hover:text-gray-800 cursor-pointer"
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </div>
      </div>

      <div className="overflow-y-auto max-h-[75vh] p-4">
        <h2 className="text-xl font-bold">
          {itemDetails.name || '상세 정보'}
        </h2>
        <div className="relative mb-4">
          {itemDetails.imageUrls && itemDetails.imageUrls.length > 0 ? (
            <div>
              <img
                src={itemDetails.imageUrls[currentImageIndex]}
                alt={`옷 이미지 ${currentImageIndex + 1}`}
                className="w-full my-2"
              />
              {itemDetails.imageUrls.length > 1 && (
                <>
                  <div
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
                    onClick={() =>
                      setCurrentImageIndex(
                        (currentImageIndex - 1 + itemDetails.imageUrls.length) %
                          itemDetails.imageUrls.length
                      )
                    }
                  >
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </div>
                  <div
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
                    onClick={() =>
                      setCurrentImageIndex(
                        (currentImageIndex + 1) %
                          itemDetails.imageUrls.length
                      )
                    }
                  >
                    <FontAwesomeIcon icon={faChevronRight} />
                  </div>
                </>
              )}
            </div>
          ) : (
            <p>이미지가 없습니다.</p>
          )}
        </div>
        <p>카테고리: {itemDetails.category || '지정되지 않음'}</p>
        <p>브랜드: {itemDetails.brand || '지정되지 않음'}</p>
        <p>사이즈: {itemDetails.size || '지정되지 않음'}</p>
        <p>색상: {itemDetails.color || '지정되지 않음'}</p>
        <p>구매처: {itemDetails.purchase || '지정되지 않음'}</p>
        <p>성별: {getGenderText(itemDetails.gender)}</p>
        <p>판매 여부: {getSalesStatusText(itemDetails.salesStatus)}</p>
        <p>공개 여부: {getPublicStatusText(itemDetails.publicStatus)}</p>
        <p>즐겨찾기: {itemDetails.isLiked ? '예' : '아니오'}</p>
      </div>
    </>
  );
};

export default ClothesDetailsView;
