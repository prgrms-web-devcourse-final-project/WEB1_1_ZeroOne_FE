import { useParams } from 'react-router-dom';

import styles from './GatheringDetailPage.module.scss';
export const GatheringDetailPage = () => {
  const { gatheringId } = useParams();
  return <div className={styles.container}>GatheringDetail{gatheringId}</div>;
};
