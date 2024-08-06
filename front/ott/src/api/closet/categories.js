// 카테고리 조회
export const getCategories = async (userId, categoryId) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/clothes/${userId}/${categoryId}`
    );
    console.log('카테고리 조회 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('카테고리 조회 실패:', error);
    throw error;
  }
};