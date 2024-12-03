import { faChevronRight, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

import styles from './SearchPage.module.scss';

import { SearchBar, usePopularArchiveList, useSearchArchive } from '@/features';
import { TripleDot } from '@/shared/ui';
import { ArchiveGrid } from '@/widgets';

export const SearchPage = () => {
  const [text, setText] = useState('');
  const [searchText, setSearchText] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const { items: archives, ref, isFetchingNextPage, refetch } = useSearchArchive(searchText);
  const { data: defaultArchives } = usePopularArchiveList(9);

  const handleSearch = async () => {
    setSearchText(text);
    setIsSearching(true);
    try {
      await refetch();
    } catch {
      console.error('Failed to fetch data');
    } finally {
      setIsSearching(false);
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
      {searchText !== '' && isSearching ? (
        <>
          <ArchiveGrid archives={archives} />
          <div ref={ref}>{isFetchingNextPage && <TripleDot />}</div>
        </>
      ) : (
        <ArchiveGrid archives={defaultArchives?.data?.archives ?? []} />
      )}
    </div>
  );
};
