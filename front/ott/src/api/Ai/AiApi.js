import axios from 'axios';

export const sendImagesToServer = async (defaultImage, selectedImage) => {
  const formData = new FormData();
  formData.append('defaultImage', defaultImage);
  formData.append('selectedImage', selectedImage);

  try {
    const response = await axios.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading images:', error);
    throw error;
  }
};
