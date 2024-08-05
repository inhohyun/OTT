import { create } from 'zustand';
import axios from 'axios';

const detailStore = create((set, get) => ({
  lookbooks: [],
  isDetailVisible: false,
  selectedLookbook: null,
  showDetail: (lookbook) =>
    set({ isDetailVisible: true, selectedLookbook: lookbook }),
  hideDetail: () => set({ isDetailVisible: false, selectedLookbook: null }),
  setLookbooks: (lookbooks) => set({ lookbooks }),
  deleteLookbook: async (deletedLookbookId) => {
    set((state) => ({
      lookbooks: state.lookbooks.filter(
        (lookbook) => lookbook.id !== deletedLookbookId
      ),
    }));
    await get().fetchLookbooks(); // Fetch updated list after deletion
  },
  fetchLookbooks: async () => {
    try {
      const response = await axios.get(
        'http://192.168.100.89:8080/api/lookbook/mylookbook',
        {
          params: { uid: 1 },
        }
      );
      set({ lookbooks: response.data });
    } catch (error) {
      console.log(error);
    }
  },
}));

export default detailStore;
