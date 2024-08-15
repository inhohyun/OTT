import { create } from 'zustand';

const bookmarkClothes = create((set) => ({
  bookmarkedClothes: [],

  //선택된 옷을 ai 옷장에서 제거하는 함수
  removeBookmarkedClothes: (clothesToRemove) =>
    set((state) => ({
      bookmarkedClothes: state.bookmarkedClothes.filter(
        (clothes) => !clothesToRemove.includes(clothes)
      ),
    })),
  // 선택된 옷을 ai 옷장에 추가하는 함수
  setBookmarkedClothes: (newClothes) =>
    set((state) => ({
      bookmarkedClothes: [...state.bookmarkedClothes, ...newClothes],
    })),
}));

export default bookmarkClothes;
