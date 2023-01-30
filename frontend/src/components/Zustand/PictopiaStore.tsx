import create from "zustand";
import { PicDto } from "../../Api/Pic/picDtos";

interface PictopiaState {
  gridStyle: number;
  pagination: {
    currentPage: number;
    postPerPage: number;
  };
  pictureBasket: PicDto[];
}
export const usePictopiaStore = create<PictopiaState>((set) => ({
  gridStyle: 5, // 1 -> with Details / increment 1 to 5
  pagination: {
    currentPage: 0,
    postPerPage: 20,
  },
  pictureBasket: [] as PicDto[],

  setCurrentPage: () =>
    set((state) => ({
      pagination: {
        currentPage: state.pagination.currentPage + 1,
        postPerPage: 20,
      },
    })),

  setGridStyle: (styleNumber: number) =>
    set(() => ({ gridStyle: styleNumber })),

  setPictureBasket: (picture: PicDto) =>
    set((state) => ({ pictureBasket: [...state.pictureBasket, picture] })),
}));
