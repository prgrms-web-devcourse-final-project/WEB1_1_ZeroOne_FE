import { useSearchParams } from 'react-router-dom';

import type { tabType } from '../model/tab.type';
import { TAB_LIST } from '../model/tab.type';

export const useUserTab = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');

  const isValidTab = (tabParam: string | null): tabParam is tabType =>
    TAB_LIST.map(tab => tab.value).includes(tabParam as tabType);

  const activeTab = isValidTab(tabParam) ? tabParam : 'gathering';

  const isActive = (value: tabType) => value === activeTab;

  const setActiveTab = (tab: tabType) => {
    setSearchParams({ tab });
  };

  return { activeTab, isActive, setActiveTab };
};
