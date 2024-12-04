import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import type { UserRole } from '../user.dto';

export interface UserDataState {
  userId: number;
  name: string;
  imageUrl: string;
  role: UserRole;
}

interface UserState {
  userData: UserDataState | null;
}

interface UserActions {
  actions: {
    setUserData: (data: UserDataState | null) => void;
    updateUserData: (updatedData: Partial<UserDataState>) => void;
    clearUserData: () => void;
  };
}

const initialState = {
  userId: -1,
  userData: null,
};

export const useUserStore = create(
  immer<UserState & UserActions>(set => ({
    userData: null,
    actions: {
      setUserData: data => {
        set({ userData: data });
      },
      updateUserData: updatedData => {
        set(state => {
          if (state.userData) {
            Object.assign(state.userData, updatedData);
          }
        });
      },
      clearUserData: () => {
        set(initialState);
      },
    },
  })),
);
