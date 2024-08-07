import { useState, useEffect } from 'react';
import { getClothesItemData } from '../../api/closet/clothes';
import ClothesDetailsView from './ClothesDetailsView';
import ClothesEditForm from './ClothesEditForm';

const ClothesDetailModal = ({
  isOpen,
  onClose,
  clothingItem,
  onEdit,
  onDelete,
  categories,
}) => {
  const [itemDetails, setItemDetails] = useState(clothingItem);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (clothingItem) {
      const fetchItemDetails = async () => {
        try {
          const data = await getClothesItemData(clothingItem.clothesId);
          setItemDetails(data);
        } catch (error) {
          console.error('Failed to fetch item details:', error);
        }
      };
      fetchItemDetails();
    }
  }, [clothingItem]);

  useEffect(() => {
    setItemDetails(clothingItem);
  }, [clothingItem]);

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    onEdit(itemDetails);
    setIsEditing(false);
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
            categories={categories}
            setItemDetails={setItemDetails}
            errors={errors}
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
