import { create } from 'zustand';
import defaultImage from '@/assets/images/default_picture.png';

const useStore = create((set, get) => ({
  // interval ID를 상태에 저장
  intervalId: null,
  // 피팅 진행도
  percentage: 0,
  // 타겟 퍼센티지와 인크리먼트 설정
  targetPercentage: 99,
  duration: 50,
  increment: 99 / 50,
  interval: 1000, // 1초마다 업데이트

  // 현재 페이지
  currentStep: 'InitialScreen',
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
  resultImages: null,

  // 상태를 설정하는 메소드들
  setCurrentStep: (step) => set({ currentStep: step }),
  setIsModalVisible: (isVisible) => set({ isModalVisible: isVisible }),
  setSelectedClothing: (clothing) => set({ selectedClothing: clothing }),
  setFilter: (filter) => set({ filter }),
  setSample: (sample) => set({ sample }),
  setModelImage: (modelImage) => set({ modelImage }),
  setSelectedImage: (selectedImage) => set({ selectedImage }),
  setModelPicture: (modelPicture) => set({ modelPicture }),
  setSelectedClothesURL: (selectedClothesURL) => set({ selectedClothesURL }),
  setResultImages: (resultImages) => set({ resultImages }),

  // 인터벌을 시작하는 메소드
  startInterval: () => {
    const state = get();
    if (state.intervalId) return; // 이미 interval이 실행 중이면 무시

    const id = setInterval(() => {
      set((state) => {
        const nextPercentage = state.percentage + state.increment;
        if (nextPercentage >= state.targetPercentage) {
          clearInterval(state.intervalId);
          return { percentage: 99, intervalId: null };
        }
        return { percentage: nextPercentage };
      });
    }, state.interval);

    set({ intervalId: id });
  },

  // 인터벌을 클리어하는 메소드
  clearInterval: () => {
    const state = get();
    clearInterval(state.intervalId);
    set({ intervalId: null });
  },

  // 수동으로 퍼센티지 상태를 리셋할 수 있는 메소드
  resetPercentage: () => {
    set({ percentage: 0 });
  },

  // 새로운 메서드: 프로그래스를 직접 업데이트
  updateProgress: (value) => {
    const state = get();
    if (state.percentage + value >= state.targetPercentage) {
      set({ percentage: state.targetPercentage, intervalId: null });
      clearInterval(state.intervalId);
    } else {
      set({ percentage: state.percentage + value });
    }
  },
}));

export default useStore;
