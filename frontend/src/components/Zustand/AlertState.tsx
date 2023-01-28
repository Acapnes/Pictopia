import create from "zustand";

interface AlertState {
  toastState: boolean;
  toastMassage: string;
}

export const useAlertStore = create<AlertState>((set) => ({
  toastState: false,
  toastMassage: "",

  setToastState: (_toastMassage: string) => {
    set((state: any) => ({ toastState: true, toastMassage: _toastMassage }));
    setTimeout(() => {
      set(() => ({ toastState: false }));
    }, 3000);
  },
}));
