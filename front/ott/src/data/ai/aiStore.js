import { create } from 'zustand';
import defaultImage from '@/assets/images/default_picture.png';
import pants1 from '@/assets/images/clothes/pants1.jpg';
import pants1Back from '@/assets/images/clothes/pants1-1.jpg';
import pants2 from '@/assets/images/clothes/pants2.jpg';
import pants2Back from '@/assets/images/clothes/pants2-1.jpg';
import pants3 from '@/assets/images/clothes/pants3.jpg';
import pants3Back from '@/assets/images/clothes/pants3-1.jpg';
import shirt1 from '@/assets/images/clothes/shirt1.jpg';
import shirt1Back from '@/assets/images/clothes/shirt1-1.jpg';
import shirt2 from '@/assets/images/clothes/shirt2.jpg';
import shirt2Back from '@/assets/images/clothes/shirt2-1.jpg';
import shirt3 from '@/assets/images/clothes/shirt3.jpg';
import shirt3Back from '@/assets/images/clothes/shirt3-1.jpg';

const useStore = create((set, get) => ({
  // 현재 페이지
  currentStep: 'InitialScreen',
  // 피팅 진행도
  percentage: 0,
  // 모달 상태
  isModalVisible: false,
  // 현재 옷이 선택되어 있는지 여부
  selectedClothing: null,

  // 서버에 보낼 데이터
  modelPicture: defaultImage,
  modelImage: null,
  filter: '상의',
  sample: 4,
  selectedClothesURL: null,

  // 생성된 옷 이미지 데이터 저장
  resultImages: null,

  // 상태 설정 메서드들
  setCurrentStep: (step) => set({ currentStep: step }),
  setPercentage: (updater) =>
    set((state) => ({ percentage: updater(state.percentage) })),
  resetPercentage: () => set({ percentage: 0 }),
  setIsModalVisible: (isModalVisible) => set({ isModalVisible }),
  setSelectedClothing: (clothing) => set({ selectedClothing: clothing }),
  setFilter: (filter) => set({ filter }),
  setSample: (sample) => set({ sample }),
  setModelImage: (modelImage) => set({ modelImage }),
  setSelectedImage: (selectedImage) => set({ selectedImage }),
  setModelPicture: (modelPicture) => set({ modelPicture }),
  setSelectedClothesURL: (selectedClothesURL) => set({ selectedClothesURL }),
  setResultImages: (resultImages) => set({ resultImages }),
  toggleLike: (id) =>
    set((state) => ({
      clothes: state.clothes.map((item) =>
        item.id === id ? { ...item, isLiked: !item.isLiked } : item
      ),
    })),

  // 프로그래스 바 진행 관리 메서드들
  intervalId: null,
  startInterval: () => {
    const state = get();
    if (state.intervalId) return; // 이미 interval이 실행 중이면 무시

    const id = setInterval(() => {
      set((state) => {
        const nextPercentage = state.percentage + 99 / 50; // 인크리먼트 값은 99/50
        if (nextPercentage >= 99) {
          clearInterval(state.intervalId);
          return { percentage: 99, intervalId: null };
        }
        return { percentage: nextPercentage };
      });
    }, 1000); // 1초마다 업데이트

    set({ intervalId: id });
  },

  clearInterval: () => {
    const state = get();
    clearInterval(state.intervalId);
    set({ intervalId: null });
  },
}));

export default useStore;
