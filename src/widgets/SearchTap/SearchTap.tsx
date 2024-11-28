import styles from './SearchTap.module.scss';

const renderingSearchTap = (activeTab: string) => {
  if (activeTab === '전체') {
    return <div>전체</div>;
  } else if (activeTab === '아카이브') {
    return <div>아카이브</div>;
  } else if (activeTab === '소모임') {
    return <div>소모임</div>;
  }
};

export const SearchTap = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (t: string) => void;
}) => {
  const tabs = ['전체', '아카이브', '소모임'];

  return (
    <div className={styles.wrapper}>
      <ul className={styles.tabList}>
        {tabs.map(tab => (
          <li
            className={activeTab === tab ? styles.active : ''}
            key={tab}
            onClick={() => {
              setActiveTab(tab);
            }}
          >
            {tab}
          </li>
        ))}
      </ul>
      {renderingSearchTap(activeTab)}
    </div>
  );
};
