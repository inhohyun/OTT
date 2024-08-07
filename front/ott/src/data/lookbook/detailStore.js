import { create } from 'zustand';

const useLookbookStore = create((set) => ({
  lookbooks: [],
  setLookbooks: (lookbooks) => set({ lookbooks }),
  deleteLookbook: (deletedLookbookId) => {
    set((state) => ({
      lookbooks: state.lookbooks.filter(
        (lookbook) => lookbook.id !== deletedLookbookId
      ),
    }));
  },
  hideDetail: () => {
    set({ isDetailVisible: false, selectedLookbook: null });
  },
  showDetail: (lookbook) => {
    set({ isDetailVisible: true, selectedLookbook: lookbook });
  },
  isDetailVisible: false,
  selectedLookbook: null,
}));

export default useLookbookStore;
