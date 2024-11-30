import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

import styles from './LikeListPage.module.scss';

import { LikeTab } from '@/widgets';

export const LikeListPage = () => {
  const [activeTab, setActiveTab] = useState('포트폴리오');

  return (
    <div className={styles.wrapper}>
      <span className={styles.path}>
        <FontAwesomeIcon icon={faChevronRight} size='xs' />
        Likes
      </span>
      <LikeTab activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};
