import { create } from 'zustand';

type ModalType = 'login' | 'chatting' | 'contact' | null;

interface ModalState {
  isOpen: boolean;
  modalKey: ModalType;
  selectedUser?: string; // optional chaining을 사용하기 위해 optional로 설정
  targetId?: number;
}

interface ModalAction {
  actions: {
    open: (modalKey: ModalType, username?: string, targetId?: number) => void;
    close: () => void;
  };
}

const initialState: ModalState = {
  isOpen: false,
  modalKey: null,
  selectedUser: undefined,
  targetId: undefined,
};

export const useModalStore = create<ModalState & ModalAction>(set => ({
  ...initialState,
  actions: {
    open: (modalKey: ModalType, username?: string, targetId?: number) => {
      set({ modalKey, isOpen: true, selectedUser: username, targetId: targetId });
    },
    close: () => {
      set({ isOpen: false, modalKey: null, selectedUser: undefined, targetId: undefined }); // 모든 상태 초기화
    },
  },
}));
