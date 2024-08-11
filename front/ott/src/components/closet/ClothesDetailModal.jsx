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
  categories,
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
      const formData = new FormData();
      formData.append('brand', itemDetails.brand);
      formData.append('purchase', itemDetails.purchase);
      formData.append('size', itemDetails.size);
      formData.append('color', itemDetails.color);
      formData.append('gender', itemDetails.gender || '');
      formData.append('categoryId', itemDetails.categoryId || '');
      formData.append('publicStatus', itemDetails.publicStatus || 'PUBLIC');
      formData.append('salesStatus', itemDetails.salesStatus || 'NOT_SALE');
      formData.append('memberId', 1);
      
      if (itemDetails.frontImg) {
        formData.append('frontImg', itemDetails.frontImg);
      }
      if (itemDetails.backImg) {
        formData.append('backImg', itemDetails.backImg);
      }
  
      await updateClothes(itemDetails.clothesId, formData);
  
      onEdit(itemDetails);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving changes:', error);
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
            categories={categories}
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
