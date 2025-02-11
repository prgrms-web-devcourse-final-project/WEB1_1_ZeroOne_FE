import styles from './GatheringGrid.module.scss';

import type { GatheringItem } from '@/features/gathering/model/dto/gathering.dto';
import { GatheringCard } from '@/features/gathering/ui/GatheringCard';

interface GatheringGridProps {
  items: GatheringItem[];
}

export const GatheringGrid = ({ items }: GatheringGridProps) => {
  return (
    <article className={styles.container}>
      <ul className={styles.list}>
        {items.map(gathering => (
          <GatheringCard
            deadline={gathering.deadLine}
            gatheringId={gathering.gatheringId}
            key={gathering.gatheringId}
            name={gathering.username}
            positions={gathering.positions}
            sort={gathering.sort}
            subject={gathering.subject}
            title={gathering.title}
            userId={gathering.userId}
            username={gathering.username}
          />
        ))}
      </ul>
    </article>
  );
};
