import create from "zustand";

interface PaginationState {
    currentPage: number;
    postPerPage: number;
  }
  export const usePaginationStore = create<PaginationState>(
    (set) => ({
      currentPage: 0,
      postPerPage: 20,
  
      setCurrentPage: () =>
        set((state) => ({ currentPage: state.currentPage + 1 })),
    })
  );