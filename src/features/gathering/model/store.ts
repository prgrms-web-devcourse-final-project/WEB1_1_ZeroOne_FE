import { create } from 'zustand';

import type {
  GatheringCategory,
  GatheringPosition,
  GatheringProcessType,
  GatheringRecruitment,
  GatheringTerm,
} from './types';

interface FilterState {
  processType: GatheringProcessType | null;
  category: GatheringCategory[];
  term: GatheringTerm | null;
  recruitment: GatheringRecruitment | null;
  position: GatheringPosition[];
}

interface FilterStore {
  filters: FilterState;
  setProcessType: (type: GatheringProcessType | null) => void;
  setCategory: (categories: GatheringCategory[]) => void;
  setTerm: (term: GatheringTerm | null) => void;
  setRecruitment: (recruitment: GatheringRecruitment | null) => void;
  setPosition: (positions: GatheringPosition[]) => void;
}

export const useGatheringFilters = create<FilterStore>(set => ({
  filters: {
    processType: null,
    category: [],
    term: null,
    recruitment: null,
    position: [],
  },
  setProcessType: type => {
    set(state => ({
      filters: { ...state.filters, processType: type },
    }));
  },
  setCategory: categories => {
    set(state => ({
      filters: { ...state.filters, category: categories },
    }));
  },
  setTerm: term => {
    set(state => ({
      filters: { ...state.filters, term },
    }));
  },
  setRecruitment: recruitment => {
    set(state => ({
      filters: { ...state.filters, recruitment },
    }));
  },
  setPosition: positions => {
    set(state => ({
      filters: { ...state.filters, position: positions },
    }));
  },
}));
