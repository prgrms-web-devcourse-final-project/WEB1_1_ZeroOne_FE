import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './SearchBar.module.scss';

export const SearchBar = ({
  searchText,
  setSearchText,
  onSearch,
  onKeyDown,
}: {
  searchText: string;
  setSearchText: (t: string) => void;
  onSearch: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className={styles.container}>
      <input
        onChange={e => {
          setSearchText(e.target.value);
        }}
        onKeyDown={onKeyDown}
        placeholder='다양한 스토리의 아카이브를 검색해보세요!'
        type='text'
        value={searchText}
      />
      <FontAwesomeIcon className={styles.icon} icon={faSearch} onClick={onSearch} />
    </div>
  );
};
