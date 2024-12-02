import { useLocation } from 'react-router-dom';

type TabItemType = {
  path: string;
  label: string;
};

interface TabConfigType {
  title: string;
  tabList: TabItemType[];
}

export const MYPAGE_TAB: TabConfigType[] = [
  {
    title: '내 정보',
    tabList: [
      {
        path: '/my',
        label: '프로필 정보',
      },
      {
        path: '/my/archive',
        label: '아카이브',
      },
      {
        path: '/my/badge',
        label: '뱃지',
      },
    ],
  },
];

const tabList = MYPAGE_TAB.map(tabSec => tabSec.tabList).flat();

export const useMyTab = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const activeTabItem = tabList.find(tab => tab.path === pathname) || tabList[0];

  const isActivePath = (path: string) => path === activeTabItem.path;

  return { isActivePath, activeTabItem };
};
