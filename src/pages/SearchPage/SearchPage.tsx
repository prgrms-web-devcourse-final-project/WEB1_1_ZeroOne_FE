import { useState } from 'react';

import styles from './SearchPage.module.scss';

import { SearchBar, useSearchArchive } from '@/features';
import { TripleDot } from '@/shared/ui';
import { ArchiveGrid } from '@/widgets';

export const SearchPage = () => {
  const [text, setText] = useState('');
  const [searchText, setSearchText] = useState('');

  const { items: archives, ref, isFetchingNextPage, refetch } = useSearchArchive(searchText);

  const handleSearch = () => {
    setSearchText(text);
    refetch().catch(() => {
      console.error('Failed to fetch next page');
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={styles.wrapper}>
      <SearchBar
        onKeyDown={handleKeyDown}
        onSearch={handleSearch}
        searchText={text}
        setSearchText={setText}
      />
      <ArchiveGrid archives={archives} />
      <div ref={ref}>{isFetchingNextPage && <TripleDot />}</div>
    </div>
  );
};
