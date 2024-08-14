import { useState, useEffect } from 'react';
import ClothesDetailsView from '@/components/closet/ClothesDetailsView';
import {
  updateClothes,
  getClothesItemData,
  deleteClothes,
  getClothesList,
} from '../../api/closet/clothes';

const CustomClothesDetailModal = ({
  isOpen,
  onClose,
  clothingItem,
  onEdit,
  categories,
  setClothes,
  memberId,
}) => {
  const [itemDetails, setItemDetails] = useState(null);

  useEffect(() => {
    if (clothingItem) {
      const fetchItemDetails = async () => {
        try {
          console.log(clothingItem);
          const data = await getClothesItemData(clothingItem.clothesId);
          console.log(data);
          setItemDetails(data);
        } catch (error) {
          console.error('Failed to fetch item details:', error);
        }
      };
      fetchItemDetails();
    }
  }, [clothingItem]);

  const handleDelete = async () => {
    try {
      await deleteClothes(itemDetails.clothesId);
      setClothes((prevClothes) =>
        prevClothes.filter((item) => item.clothesId !== itemDetails.clothesId)
      );
      onClose();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  if (!isOpen || !itemDetails) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs w-full relative overflow-y-auto max-h-full">
        <ClothesDetailsView
          itemDetails={itemDetails}
          onClose={onClose}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default CustomClothesDetailModal;
