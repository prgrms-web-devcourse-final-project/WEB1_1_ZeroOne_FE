// import type { GatheringSortType } from '../model/dto/gathering.dto';
export type SelectOption = {
  value: string;
  label: string;
};

export type SelectOptNum = {
  value: number;
  label: string;
};

export interface GatheringFilterOptions {
  contact: SelectOption[];
  sort: SelectOption[];
  period: SelectOption[];
  personnel: SelectOptNum[];
  positions: SelectOption[];
  subject: {
    project: SelectOption[];
    study: SelectOption[];
    club: SelectOption[];
    etc: SelectOption[];
    
  };
}
