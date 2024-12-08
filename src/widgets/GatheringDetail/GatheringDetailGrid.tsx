import styles from './GatheringDetailGrid.module.scss';

import { GatheringInfoItem } from '@/features';

interface GatheringDetailGridProps {
  sort: string;
  username: string;
  createTime: string;
  subject: string;
  contact: string;
  personnel: number;
  period: string;
  deadLine: string;
  positions: string[];
  gatheringTag: string[];
  contactUrl: string;
}

export const GatheringDetailGrid = ({
  sort,
  username,
  createTime,
  subject,
  contact,
  personnel,
  period,
  deadLine,
  positions,
  gatheringTag,
  contactUrl,
}: GatheringDetailGridProps) => {
  return (
    <ul className={styles.container}>
      <GatheringInfoItem label='프로젝트' value={sort} />
      <GatheringInfoItem label='유저이름' value={username} />
      <GatheringInfoItem label='작성일' value={createTime} />
      <GatheringInfoItem label='모집구분' value={subject} />
      <GatheringInfoItem label='만남방법' value={contact} />
      <GatheringInfoItem label='모집하는 인원' value={personnel} />
      <GatheringInfoItem label='활동 기간' value={period} />
      <GatheringInfoItem label='마감일' value={deadLine} />
      <GatheringInfoItem label='모집하는 직무' value={positions} />
      <GatheringInfoItem label='태그' value={gatheringTag} />
      <GatheringInfoItem label='연락링크' value={contactUrl} />
    </ul>
  );
};
