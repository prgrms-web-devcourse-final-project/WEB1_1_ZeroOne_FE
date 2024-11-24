import { create } from 'zustand';

type ModalType = 'login' | null;

interface ModalState {
  isOpen: boolean;
  modalKey: ModalType;
}

interface ModalAction {
  actions: {
    open: (modalKey: ModalType) => void;
    close: () => void;
  };
}

const initialState: ModalState = {
  isOpen: false,
  modalKey: null,
};

export const useModalStore = create<ModalState & ModalAction>(set => ({
  ...initialState,
  actions: {
    open: (modalKey: ModalType) => {
      set({ modalKey, isOpen: true });
    },
    close: () => {
      set({ isOpen: false });
    },
  },
}));
