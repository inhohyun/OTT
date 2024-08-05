import { create } from 'zustand';
import defaultImage from '@/assets/images/default_picture.png';


const useStore = create((set) => ({
  currentStep: 'InitialScreen', // 초기 상태는 InitialScreen
  percentage: 0, // 진행 바 초기 값
  isModalVisible: false, // Modal 표시 상태
  selectedClothing: null, // 선택된 옷 초기 상태
  filter: 'all', // 필터 초기 상태
  numImages: { value: '4장', label: '4장' }, // 이미지 개수 초기 상태
  selectedImage: defaultImage, // 선택된 이미지 초기 상태
  setCurrentStep: (step) => set({ currentStep: step }), // currentStep 설정 함수
  setPercentage: (updater) => set((state) => ({ percentage: updater(state.percentage) })), // percentage 업데이트 함수
  resetPercentage: () => set({ percentage: 0 }), // 진행 바 초기화 함수
  setIsModalVisible: (isVisible) => set({ isModalVisible: isVisible }), // Modal 표시 상태 설정 함수
  setSelectedClothing: (clothing) => set({ selectedClothing: clothing }), // 선택된 옷 설정 함수
  setFilter: (filter) => set({ filter }), // 필터 설정 함수
  setNumImages: (numImages) => set({ numImages }), // 이미지 개수 설정 함수
  setSelectedImage: (selectedImage) => set({ selectedImage }), // 선택된 이미지 설정 함수
}));

export default useStore;
