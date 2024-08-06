import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

const ClothesDetailModal = ({
  isOpen,
  onClose,
  clothingItem,
  onEdit,
  onDelete,
  categories,
}) => {
  const [itemDetails, setItemDetails] = useState(clothingItem);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const getGenderText = (gender) => {
    switch (gender) {
      case 'MAN':
        return '남성';
      case 'WOMAN':
        return '여성';
      case 'COMMON':
        return '남녀공용';
      default:
        return '지정되지 않음';
    }
  };

  const getPublicStatusText = (publicStatus) => {
    switch (publicStatus) {
      case 'PUBLIC':
        return '공개';
      case 'PRIVATE':
        return '비공개';
      default:
        return '지정되지 않음';
    }
  };

  const getSalesStatusText = (salesStatus) => {
    switch (salesStatus) {
      case 'ON_SALE':
        return 'O';
      case 'NOT_SALE':
        return 'X';
      default:
        return '지정되지 않음';
    }
  };

  useEffect(() => {
    const fetchItemDetails = async () => {
      if (clothingItem) {
        try {
          const response = await axios.get(
            `http://192.168.100.89:8080/api/clothes/${clothingItem.clothesId}`
          );
          setItemDetails(response.data);
          console.log(response.data);
        } catch (error) {
          console.error('Failed to fetch item details:', error);
        }
      }
    };

    fetchItemDetails();
  }, [clothingItem]);

  if (!isOpen || !itemDetails) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <div className="absolute top-3 right-3 flex space-x-2">
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
                          (currentImageIndex -
                            1 +
                            itemDetails.imageUrls.length) %
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
                          (currentImageIndex + 1) % itemDetails.imageUrls.length
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
          <p>카테고리: {itemDetails.categories || '지정되지 않음'}</p>
          <p>브랜드: {itemDetails.brand || '지정되지 않음'}</p>
          <p>사이즈: {itemDetails.size || '지정되지 않음'}</p>
          <p>색상: {itemDetails.color || '지정되지 않음'}</p>
          <p>구매처: {itemDetails.purchase || '지정되지 않음'}</p>
          <p>성별: {getGenderText(itemDetails.gender)}</p>
          <p>판매 여부: {getSalesStatusText(itemDetails.salesStatus)}</p>
          <p>공개 여부: {getPublicStatusText(itemDetails.publicStatus)}</p>
          <p>즐겨찾기: {itemDetails.isLiked ? '예' : '아니오'}</p>
          <div className="flex justify-center mt-4 space-x-4">
            <button
              onClick={() => onEdit(itemDetails)}
              className="bg-violet-300 text-white px-4 py-2 rounded-lg"
            >
              수정
            </button>
            <button
              onClick={() => onDelete(itemDetails.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClothesDetailModal;
