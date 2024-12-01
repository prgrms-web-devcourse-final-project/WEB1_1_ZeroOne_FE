export type SelectOption = {
  value: string;
  label: string;
};

export interface GatheringFormData {
  contact: string;
  sort: string;
  subject: string;
  period: string;
  personnel: string;
  position: string[];
  gatheringTag: string[];
  title: string;
  url: string;
  content: string;
  deadLine: string;
}

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
