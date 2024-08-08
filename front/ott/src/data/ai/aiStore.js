// zustand store 정의
import { create } from 'zustand';
import defaultImage from '@/assets/images/default_picture.png';
import dress1 from '@/assets/images/clothes/dress1.jpg';
import dress1Back from '@/assets/images/clothes/dress1-1.jpg';
import dress2 from '@/assets/images/clothes/dress2.jpg';
import dress3 from '@/assets/images/clothes/dress3.jpg';
import outer1 from '@/assets/images/clothes/outer1.jpg';
import outer1Back from '@/assets/images/clothes/outer1-1.jpg';
import outer2 from '@/assets/images/clothes/outer2.jpg';
import outer2Back from '@/assets/images/clothes/outer2-1.jpg';
import outer3 from '@/assets/images/clothes/outer3.jpg';
import outer3Back from '@/assets/images/clothes/outer3-1.jpg';
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

const useStore = create((set) => ({
  //현재 페이지
  currentStep: 'InitialScreen',
  // 피팅 진행도
  percentage: 0,
  // 모달 상태
  isModalVisible: false,
  //현재 옷이 선택되어 있는지 여부
  selectedClothing: null,
  //현재 필터 정보
  filter: '상의',
  //생성할 이미지 개수
  numImages: { value: '4장', label: '4장' },
  //선택된 옷 사진 url
  selectedImage: defaultImage,
  formData: null,
  clothes: [
    {
      id: 1,
      category: '하의',
      frontImage: pants1,
      backImage: pants1Back,
      isLiked: false,
    },
    {
      id: 2,
      category: '하의',
      frontImage: pants2,
      backImage: pants2Back,
      isLiked: false,
    },
    {
      id: 3,
      category: '하의',
      frontImage: pants3,
      backImage: pants3Back,
      isLiked: false,
    },
    {
      id: 4,
      category: '상의',
      frontImage: shirt1,
      backImage: shirt1Back,
      isLiked: false,
    },
    {
      id: 5,
      category: '상의',
      frontImage: shirt2,
      backImage: shirt2Back,
      isLiked: false,
    },
    {
      id: 6,
      category: '상의',
      frontImage: shirt3,
      backImage: shirt3Back,
      isLiked: false,
    },
  ],
  setCurrentStep: (step) => set({ currentStep: step }),
  setPercentage: (updater) =>
    set((state) => ({ percentage: updater(state.percentage) })),
  resetPercentage: () => set({ percentage: 0 }),
  setIsModalVisible: (isVisible) => set({ isModalVisible: isVisible }),
  setSelectedClothing: (clothing) => set({ selectedClothing: clothing }),
  setFilter: (filter) => set({ filter }),
  setNumImages: (numImages) => set({ numImages }),
  setSelectedImage: (selectedImage) => set({ selectedImage }),
  setFormData: (formData) => set({ formData }),
  toggleLike: (id) =>
    set((state) => ({
      clothes: state.clothes.map((item) =>
        item.id === id ? { ...item, isLiked: !item.isLiked } : item
      ),
    })),
}));

export default useStore;
