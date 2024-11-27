import { produce } from 'immer';
import { create } from 'zustand';

import type { BaseArchiveDTO } from '../archive.dto';

interface ArchiveStore {
  archiveId: number;
  setArchiveId: (id: number) => void;
  archiveData: BaseArchiveDTO;
  setArchiveData: (newData: BaseArchiveDTO) => void;
  updateArchiveData: <T extends keyof BaseArchiveDTO>(key: T, value: BaseArchiveDTO[T]) => void;
  resetArchiveData: () => void;
}

export const initialArchiveState: BaseArchiveDTO = {
  title: '',
  description: '',
  type: 'red',
  canComment: false,
  tags: [],
  imageUrls: [{ url: 'https://source.unsplash.com/random/800x600' }],
};

export const useArchiveStore = create<ArchiveStore>(set => ({
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
}));
