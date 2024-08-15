import { create } from 'zustand';

const bookmarkClothes = create((set) => ({
  bookmarkedClothes: [],

  // 선택된 옷을 ai 옷장에서 제거하는 함수
  removeBookmarkedClothes: (clothesToRemove) =>
    set((state) => ({
      bookmarkedClothes: state.bookmarkedClothes.filter(
        (clothes) => clothes.clothesId !== clothesToRemove.clothesId
      ),
    })),

  // 선택된 옷을 ai 옷장에 추가하는 함수
  setBookmarkedClothes: (newClothes) =>
    set((state) => ({
      // 여기서 newClothes가 객체이므로, 배열에 직접 추가
      bookmarkedClothes: [...state.bookmarkedClothes, newClothes],
    })),
}));

export default bookmarkClothes;
