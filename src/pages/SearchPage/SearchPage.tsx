import { useState } from 'react';

import styles from './SearchPage.module.scss';

import { SearchBar } from '@/features';

export const SearchPage = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <div className={styles.wrapper}>
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
    </div>
  );
};
