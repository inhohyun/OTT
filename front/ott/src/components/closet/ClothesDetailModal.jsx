import { useState, useEffect } from 'react';
import ClothesDetailsView from './ClothesDetailsView';
import ClothesEditForm from './ClothesEditForm';
import { updateClothes, getClothesItemData } from '../../api/closet/clothes';


const ClothesDetailModal = ({
  isOpen,
  onClose,
  clothingItem,
  onEdit,
  onDelete,
}) => {
  const [itemDetails, setItemDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);


  useEffect(() => {
    if (clothingItem) {
      const fetchItemDetails = async () => {
        try {
          const data = await getClothesItemData(clothingItem.clothesId);
          console.log(data)
          setItemDetails(data);
        } catch (error) {
          console.error('Failed to fetch item details:', error);
        }
      };
      fetchItemDetails();
    }
  }, [clothingItem]);

  const handleToggleEdit = () => {
    console.log(itemDetails)
    setIsEditing(true); 
  };

  const handleSave = async () => {
    try {
      // formData 객체를 생성
      const formData = new FormData();
  
      // 필요한 모든 필드를 formData 객체에 추가
      formData.append('brand', itemDetails.brand);
      formData.append('purchase', itemDetails.purchase);
      formData.append('size', itemDetails.size);
      formData.append('color', itemDetails.color);
      formData.append('gender', itemDetails.gender);
      formData.append('category', itemDetails.category);
  
      if (itemDetails.frontImg) {
        formData.append('frontImg', itemDetails.frontImg);
      }
      if (itemDetails.backImg) {
        formData.append('backImg', itemDetails.backImg);
      }
  
      // updateClothes API를 호출하여 서버에 업데이트 요청
      await updateClothes(itemDetails.clothesId, formData);
  
      // onEdit 함수를 호출해 부모 컴포넌트 상태 업데이트
      onEdit(itemDetails);
  
      // 편집 모드 종료
      setIsEditing(false);
    } catch (error) {
      console.error('변경 사항 저장 중 오류 발생:', error);
    }
  };
  

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (!isOpen || !itemDetails) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs w-full relative overflow-y-auto max-h-full">
        {isEditing ? (
          <ClothesEditForm
            itemDetails={itemDetails}
            onSave={handleSave}
            onCancel={handleCancel}
            setItemDetails={setItemDetails}
          />
        ) : (
          <ClothesDetailsView
            itemDetails={itemDetails}
            onEdit={handleToggleEdit}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
};

export default ClothesDetailModal;
