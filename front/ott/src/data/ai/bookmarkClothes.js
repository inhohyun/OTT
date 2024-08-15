import { create } from 'zustand';

const bookmarkClothes = create((set) => ({
  bookmarkedClothes: [],

  // AI 옷장에서 선택된 옷을 제거하는 함수
  removeBookmarkedClothes: (clothesToRemove) => {
    console.log('제거할 옷의 ID:', clothesToRemove.clothesId);
    set((state) => {
      const updatedClothes = state.bookmarkedClothes.filter(
        (clothes) => clothes.clothesId !== clothesToRemove.clothesId
      );
      console.log('제거 후 북마크된 옷 목록:', updatedClothes);
      return { bookmarkedClothes: updatedClothes };
    });
  },

  // AI 옷장에 선택된 옷을 추가하는 함수
  setBookmarkedClothes: (newClothes) => {
    console.log('추가할 새 옷:', newClothes);
    set((state) => {
      const updatedClothes = [...state.bookmarkedClothes, newClothes];
      console.log('추가 후 북마크된 옷 목록:', updatedClothes);
      return { bookmarkedClothes: updatedClothes };
    });
  },
}));

export default bookmarkClothes;
