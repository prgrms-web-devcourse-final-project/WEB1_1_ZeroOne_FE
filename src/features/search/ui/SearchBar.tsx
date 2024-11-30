import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './SearchBar.module.scss';

export const SearchBar = ({
  searchText,
  setSearchText,
}: {
  searchText: string;
  setSearchText: (t: string) => void;
}) => {
  return (
    <div className={styles.container}>
      <input
        onChange={e => {
          setSearchText(e.target.value);
        }}
        placeholder='검색어를 입력해주세요'
        type='text'
        value={searchText}
      />
      <FontAwesomeIcon className={styles.icon} icon={faSearch} />
    </div>
  );
};
