import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './SearchBar.module.scss';

export const SearchBar = ({
  isSearch,
  setIsSearch,
}: {
  isSearch: boolean;
  setIsSearch: (s: boolean) => void;
}) => {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearch]);

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigate(`/search?searchText=${searchText}`);
      setIsSearch(false);
    }
  };

  return (
    <div className={cn(styles.container, { [styles.visible]: isSearch })}>
      <input
        onChange={e => {
          setSearchText(e.target.value);
        }}
        onKeyDown={handleEnter}
        placeholder='다양한 스토리의 아카이브를 검색해보세요!'
        ref={inputRef}
        type='text'
        value={searchText}
      />
      <FontAwesomeIcon
        className={styles.icon}
        icon={faSearch}
        onClick={() => {
          navigate(`/search?searchText=${searchText}`);
          setIsSearch(false);
        }}
      />
    </div>
  );
};
