import styles from './GatheringGrid.module.scss';

import type { GatheringItemDto } from '@/features/gathering/model/gathering.dto';
import { GatheringCard } from '@/features/gathering/ui/GatheringCard';

interface GatheringGridProps {
  items: GatheringItemDto[];
}

export const GatheringGrid = ({ items }: GatheringGridProps) => {
  return (
    <article className={styles.container}>
      <ul className={styles.list}>
        {items.map(gathering => (
          <GatheringCard
            deadline={gathering.deadLine}
            gatheringId={gathering.gatheringId}
            introduction={`${gathering.sort} · ${gathering.subject}`}
            key={gathering.gatheringId}
            name={gathering.username}
            tag={gathering.tags}
            title={gathering.title}
          />
        ))}
      </ul>
    </article>
  );
};
