import { create } from 'zustand';

type ModalType = 'login' | 'chatting' | 'contact' | null;

interface ModalState {
  isOpen: boolean;
  modalKey: ModalType;
  selectedUser?: string; // optional chaining을 사용하기 위해 optional로 설정
}

interface ModalAction {
  actions: {
    open: (modalKey: ModalType, username?: string) => void;
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
    open: (modalKey: ModalType, username?: string) => {
      set({ modalKey, isOpen: true, selectedUser: username });
    },
    close: () => {
      set({ isOpen: false, modalKey: null }); // selectedUser는 undefined로 자동 초기화
    },
  },
}));
