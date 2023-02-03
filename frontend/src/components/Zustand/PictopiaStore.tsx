import create from "zustand";
import { PicDto } from "../../Api/Pic/picDtos";

interface PictopiaState {
  pictures: PicDto[];
  pagination: {
    currentPage: number;
    postPerPage: number;
  };
  gridStyle: number;
  pictureBasket: PicDto[];
}
export const usePictopiaStore = create<PictopiaState>((set) => ({
  pictures: [] as PicDto[],
  pagination: {
    currentPage: 0,
    postPerPage: 20,
  },
  gridStyle: 5, // 1 -> with Details / increment 1 to 5
  pictureBasket: [] as PicDto[],

  setPictures: (_pictures: PicDto[]) =>
    set((state) => ({ pictures: [...state.pictures, ..._pictures] })),

  setCurrentPage: () =>
    set((state) => ({
      pagination: {
        currentPage: state.pagination.currentPage + 1,
        postPerPage: 20,
      },
    })),

  setGridStyle: (styleNumber: number) =>
    set(() => ({ gridStyle: styleNumber })),

  setPictureBasket: (picture: PicDto[]) =>
    set(() => ({ pictureBasket: picture })),
}));
