import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faEdit, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const ClothesDetailModal = ({ isOpen, onClose, clothingItem, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableItem, setEditableItem] = useState(clothingItem);
  const [frontImage, setFrontImage] = useState(clothingItem.frontImage);
  const [backImage, setBackImage] = useState(clothingItem.backImage);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (clothingItem) {
      setEditableItem(clothingItem);
      setFrontImage(clothingItem.frontImage);
      setBackImage(clothingItem.backImage);
    }
  }, [clothingItem]);

  useEffect(() => {
    if (!isOpen) {
      setIsEditing(false);
      setCurrentImageIndex(0);
    }
  }, [isOpen]);

  if (!isOpen || !clothingItem) return null;

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Data to be sent to the backend
    const updatedData = {
      size: editableItem.size,
      brand: editableItem.brand,
      purchase: editableItem.purchase,
      public_status: editableItem.public_status,
      image_path: [frontImage, backImage],
      color: editableItem.color,
      gender: editableItem.gender,
    };

    // Log the data that would be sent to the backend
    console.log('Sending updated data to the backend:', updatedData);

    // Commented out axios request
    /*
    try {
      const response = await axios.put(`/clothes/${editableItem.id}`, updatedData);

      if (response.status === 200) {
        onEdit(editableItem); // Notify the parent component of the update
        setIsEditing(false); // Exit edit mode
        onClose(); // Close the modal
      }
    } catch (error) {
      console.error("Failed to update clothing item:", error);
    }
    */

    // Simulate a successful request by directly calling onEdit with the updated item
    onEdit({ ...editableItem, frontImage, backImage });
    setIsEditing(false); // Exit edit mode
    onClose(); // Close the modal
  };

  const handleDeleteClick = () => {
    // Log the deletion
    console.log('Deleting item with ID:', editableItem.id);

    // Commented out axios request for deletion
    /*
    try {
      const response = await axios.delete(`/clothes/${editableItem.id}`);
      
      if (response.status === 200) {
        onDelete(editableItem.id); // Notify the parent component of the deletion
        onClose(); // Close the modal
      }
    } catch (error) {
      console.error("Failed to delete clothing item:", error);
    }
    */

    // Simulate a successful delete by directly calling onDelete with the item ID
    onDelete(editableItem.id);
    onClose(); // Close the modal
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableItem({ ...editableItem, [name]: value });
  };

  const handleImageChange = (e, setImage) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 2);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + 2) % 2);
  };

  const getCurrentImage = () => {
    return currentImageIndex === 0 ? frontImage : backImage;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <div className="absolute top-3 right-3 flex space-x-2">
          {!isEditing && (
            <div
              onClick={handleEditClick}
              className="text-gray-600 hover:text-gray-800 cursor-pointer"
            >
              <FontAwesomeIcon icon={faEdit} size="lg" />
            </div>
          )}
          <div
            onClick={() => {
              setIsEditing(false);
              onClose();
            }}
            className="text-gray-600 hover:text-gray-800 cursor-pointer"
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </div>
        </div>
        <div className="overflow-y-auto max-h-[75vh] p-4">
          <div className="relative flex justify-center mb-4 mt-6">
            {(frontImage || backImage) && (
              <>
                {backImage && frontImage && (
                  <>
                    <button
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-200 rounded-full"
                      onClick={handlePreviousImage}
                    >
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-200 rounded-full"
                      onClick={handleNextImage}
                    >
                      <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                  </>
                )}
                <div className="w-40 h-50 rounded-lg overflow-hidden relative">
                  {isEditing ? (
                    <>
                      <img
                        src={getCurrentImage()}
                        alt="Clothing"
                        className="object-cover w-full h-full"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) =>
                          currentImageIndex === 0
                            ? handleImageChange(e, setFrontImage)
                            : handleImageChange(e, setBackImage)
                        }
                      />
                    </>
                  ) : (
                    <img
                      src={getCurrentImage()}
                      alt="Clothing"
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
              </>
            )}
            {isEditing && !frontImage && (
              <div className="w-40 h-50 rounded-lg border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer">
                <label className="text-gray-700">Add Front Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) => handleImageChange(e, setFrontImage)}
                />
              </div>
            )}
            {isEditing && !backImage && (
              <div className="w-40 h-50 rounded-lg border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer mt-4">
                <label className="text-gray-700">Add Back Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) => handleImageChange(e, setBackImage)}
                />
              </div>
            )}
          </div>
          <div className="mb-4">
            {isEditing ? (
              <div className="flex items-center mb-2">
                <label className="text-gray-700 mr-2 w-24">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={editableItem.brand}
                  onChange={handleChange}
                  className="flex-grow p-2 border rounded-lg"
                />
              </div>
            ) : (
              <p>
                <strong>Brand:</strong> {editableItem.brand}
              </p>
            )}
            {isEditing ? (
              <div className="flex items-center mb-2">
                <label className="text-gray-700 mr-2 w-24">Size</label>
                <input
                  type="text"
                  name="size"
                  value={editableItem.size}
                  onChange={handleChange}
                  className="flex-grow p-2 border rounded-lg"
                />
              </div>
            ) : (
              <p>
                <strong>Size:</strong> {editableItem.size}
              </p>
            )}
            {isEditing ? (
              <div className="flex items-center mb-2">
                <label className="text-gray-700 mr-2 w-24">Color</label>
                <input
                  type="text"
                  name="color"
                  value={editableItem.color}
                  onChange={handleChange}
                  className="flex-grow p-2 border rounded-lg"
                />
              </div>
            ) : (
              <p>
                <strong>Color:</strong> {editableItem.color}
              </p>
            )}
            {isEditing ? (
              <div className="flex items-center mb-2">
                <label className="text-gray-700 mr-2 w-24">Purchase Location</label>
                <input
                  type="text"
                  name="purchase"
                  value={editableItem.purchase}
                  onChange={handleChange}
                  className="flex-grow p-2 border rounded-lg"
                />
              </div>
            ) : (
              <p>
                <strong>Purchase Location:</strong>{' '}
                <a
                  href={editableItem.purchase}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {editableItem.purchase}
                </a>
              </p>
            )}
            {isEditing ? (
              <div className="flex items-center mb-2">
                <label className="text-gray-700 mr-2 w-24">Public Status</label>
                <select
                  name="public_status"
                  value={editableItem.public_status}
                  onChange={handleChange}
                  className="flex-grow p-2 border rounded-lg"
                >
                  <option value="y">Public</option>
                  <option value="n">Private</option>
                </select>
              </div>
            ) : (
              <p>
                <strong>Public Status:</strong>{' '}
                {editableItem.public_status === 'y' ? 'Public' : 'Private'}
              </p>
            )}
            {isEditing ? (
              <div className="flex items-center mb-2">
                <label className="text-gray-700 mr-2 w-24">Gender</label>
                <select
                  name="gender"
                  value={editableItem.gender}
                  onChange={handleChange}
                  className="flex-grow p-2 border rounded-lg"
                >
                  <option value="m">Male</option>
                  <option value="f">Female</option>
                </select>
              </div>
            ) : (
              <p>
                <strong>Gender:</strong>{' '}
                {editableItem.gender === 'm' ? 'Male' : 'Female'}
              </p>
            )}
          </div>
          {isEditing && (
            <div className="flex justify-center mt-4 space-x-4">
              <button
                onClick={handleSaveClick}
                className="bg-violet-300 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                저장
              </button>
              <button
                onClick={handleDeleteClick}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                삭제
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClothesDetailModal;
