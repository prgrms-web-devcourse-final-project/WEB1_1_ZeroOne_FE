import { useState } from 'react';

import styles from './SearchPage.module.scss';

import { SearchBar } from '@/features';
import { SearchTap } from '@/widgets';

export const SearchPage = () => {
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('전체');

  return (
    <div className={styles.wrapper}>
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <SearchTap activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};
