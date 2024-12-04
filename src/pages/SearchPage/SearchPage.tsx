import { faChevronRight, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from 'react-router-dom';

import styles from './SearchPage.module.scss';

import { useSearchArchive } from '@/features';
import { Loader, TripleDot } from '@/shared/ui';
import { ArchiveGrid } from '@/widgets';

export const SearchPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchText = searchParams.get('searchText');

  const {
    items: archives,
    ref,
    isFetchingNextPage,
    isLoading,
  } = useSearchArchive(searchText ?? '');

  if (isLoading) return <Loader />;

  return (
    <div className={styles.wrapper}>
      <span className={styles.path}>
        <FontAwesomeIcon icon={faHome} size='xs' />
        <FontAwesomeIcon icon={faChevronRight} size='xs' />
        Search
      </span>
      <ArchiveGrid archives={archives} />
      <div ref={ref}>{isFetchingNextPage && <TripleDot />}</div>
    </div>
  );
};
