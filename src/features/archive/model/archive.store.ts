import { produce } from 'immer';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import type { BaseArchiveDTO } from '../archive.dto';
import type { Color } from '../colors.type';

interface ArchiveStore {
  archiveId: number;
  setArchiveId: (id: number) => void;
  archiveData: BaseArchiveDTO;
  setArchiveData: (newData: BaseArchiveDTO) => void;
  updateArchiveData: <T extends keyof BaseArchiveDTO>(key: T, value: BaseArchiveDTO[T]) => void;
  resetArchiveData: () => void;
  color: Color | null;
  setColor: (color: Color) => void;
  clearStorage: () => void;
}

export const initialArchiveState: BaseArchiveDTO = {
  title: '',
  description: '',
  introduction: '',
  type: 'red',
  canComment: false,
  tags: [],
  imageUrls: [{ url: 'https://source.unsplash.com/random/800x600' }],
};

export const useArchiveStore = create(
  persist<ArchiveStore>(
    set => ({
      archiveId: 0,
      setArchiveId: id => {
        set(() => ({
          archiveId: id,
        }));
      },

      archiveData: initialArchiveState,
      setArchiveData: newData => {
        set(() => ({
          archiveData: newData,
        }));
      },

      updateArchiveData: (key, value) => {
        set(
          produce((state: ArchiveStore) => {
            state.archiveData[key] = value;
          }),
        );
      },

      resetArchiveData: () => {
        set(() => ({
          archiveData: initialArchiveState,
        }));
      },

      color: null,
      setColor: color => {
        set(
          produce((state: ArchiveStore) => {
            state.archiveData.type = color;
          }),
        );
        set(() => ({
          color,
        }));
      },

      clearStorage: () => {
        set(() => ({
          archiveId: 0,
          archiveData: initialArchiveState,
          color: null,
        }));
        useArchiveStore.persist.clearStorage();
      },
    }),
    {
      name: 'archive-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
