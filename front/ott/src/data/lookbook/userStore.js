import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      userId: null,
      setUserId: (id) => set({ userId: id }),

      showModal: false,
      setShowModal: (show) => set({ showModal: show }),
    }),
    {
      name: 'user-store',
      getStorage: () => sessionStorage,
    }
  )
);

export default useUserStore;
