import { create } from 'zustand';

const useStore = create((set) => ({
  currentStep: 'Modal', // 초기 상태는 Modal
  percentage: 0, // 프로그래스 바 초기값
  isModalVisible: false, // 모달 열림 상태
  setCurrentStep: (step) => set({ currentStep: step }),
  setPercentage: (updater) =>
    set((state) => ({ percentage: updater(state.percentage) })),
  resetPercentage: () => set({ percentage: 0 }), // 프로그래스 바를 초기화하는 함수 추가
  setIsModalVisible: (isVisible) => set({ isModalVisible: isVisible }), // 모달 열림 상태를 설정하는 함수 추가
}));

export default useStore;
