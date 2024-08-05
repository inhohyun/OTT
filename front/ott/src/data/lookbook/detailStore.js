import { create } from 'zustand';

const detailStore = create((set) => ({
  lookbooks: [],
  isDetailVisible: false,
  selectedLookbook: null,
  showDetail: (lookbook) =>
    set({ isDetailVisible: true, selectedLookbook: lookbook }),
  hideDetail: () => set({ isDetailVisible: false, selectedLookbook: null }),
  setLookbooks: (lookbooks) => set({ lookbooks }),
  deleteLookbook: (deletedLookbookId) =>
    set((state) => ({
      lookbooks: state.lookbooks.filter(
        (lookbook) => lookbook.id !== deletedLookbookId
      ),
    })),
}));

export default detailStore;
