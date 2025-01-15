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
  loading: boolean;
}

interface UserActions {
  actions: {
    setUserData: (data: UserDataState | null) => void;
    updateUserData: (updatedData: Partial<UserDataState>) => void;
    clearUserData: () => void;
    load: () => void;
    done: () => void;
  };
}

const initialState = {
  userData: null,
  loading: true,
};

export const useUserStore = create(
  immer<UserState & UserActions>(set => ({
    ...initialState,
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
        set({
          userData: null,
          loading: false,
        });
      },
      load: () => {
        set({ loading: true });
      },
      done: () => {
        set({ loading: false });
      },
    },
  })),
);
