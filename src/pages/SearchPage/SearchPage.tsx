import { faChevronRight, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

import styles from './SearchPage.module.scss';

import { SearchBar, useSearchArchive } from '@/features';
import { TripleDot } from '@/shared/ui';
import { ArchiveGrid } from '@/widgets';

export const SearchPage = () => {
  const [text, setText] = useState('');
  const [searchText, setSearchText] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const { items: archives, ref, isFetchingNextPage, refetch } = useSearchArchive(searchText);

  const handleSearch = async () => {
    setSearchText(text);
    setIsSearching(true);
    try {
      await refetch();
    } catch {
      console.error('Failed to fetch data');
    } finally {
      setIsSearching(false);
      setText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch().catch(console.error);
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
      <span className={styles.path}>
        <FontAwesomeIcon icon={faHome} size='xs' />
        <FontAwesomeIcon icon={faChevronRight} size='xs' />
        Search
      </span>
      {searchText !== '' ? (
        isSearching ? (
          <div className={styles.loading}>Searching...</div>
        ) : (
          <>
            <ArchiveGrid archives={archives} />
            <div ref={ref}>{isFetchingNextPage && <TripleDot />}</div>
          </>
        )
      ) : null}
    </div>
  );
};
