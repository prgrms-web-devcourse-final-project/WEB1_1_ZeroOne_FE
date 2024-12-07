import {
  MajorJobGroup,
  DeveloperJobGroup,
  PromoterJobGroup,
  DesignJobGroup,
  MarketingJobGroup,
  EtcJobGroup,
} from '../model/types';

export const getJobGroupDisplayName = (value: string) => {
  for (const group of [
    MajorJobGroup,
    DeveloperJobGroup,
    PromoterJobGroup,
    DesignJobGroup,
    MarketingJobGroup,
    EtcJobGroup,
  ]) {
    for (const [key, val] of Object.entries(group)) {
      if (key === value) return val;
    }
  }
  return value;
};
