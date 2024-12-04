// import type { GatheringSortType } from '../model/dto/gathering.dto';
export type SelectOption = {
  value: string;
  label: string;
};

export interface GatheringFilterOptions {
  contact: SelectOption[];
  sort: SelectOption[];
  period: SelectOption[];
  personnel: SelectOption[];
  position: SelectOption[];
  subject: {
    project: SelectOption[];
    study: SelectOption[];
    club: SelectOption[];
    etc: SelectOption[];
  };
}
