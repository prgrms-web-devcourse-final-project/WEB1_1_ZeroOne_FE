import styles from './GatheringDetailHeader.module.scss';

import { GatheringDetailUserInfo } from '@/features/gathering/ui/GatheringDetail';
import { Breadcrumb } from '@/shared/ui';

interface GatheringDetailHeaderProps {
  title?: string;
}

export const GatheringDetailHeader = ({ title }: GatheringDetailHeaderProps) => {
  return (
    <section className={styles.container}>
      <Breadcrumb />
      <h1 className={styles.title}>{title}</h1>
      <GatheringDetailUserInfo position='string' profileImage='string' username='유저네임' />
    </section>
  );
};
