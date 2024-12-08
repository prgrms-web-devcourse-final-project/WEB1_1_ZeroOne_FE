import styles from './GatheringDetailHeader.module.scss';

import { GatheringDetailUserInfo } from '@/features/gathering/ui/GatheringDetail';
import { Breadcrumb } from '@/shared/ui';

interface GatheringDetailHeaderProps {
  title?: string;
  username: string;
}

export const GatheringDetailHeader = ({ title, username }: GatheringDetailHeaderProps) => {
  return (
    <section className={styles.container}>
      <Breadcrumb />
      <h1 className={styles.title}>{title}</h1>
      <GatheringDetailUserInfo position='string' profileImage='string' username={username} />
    </section>
  );
};
