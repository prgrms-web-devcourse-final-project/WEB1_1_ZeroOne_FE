import styles from './MainGatheringGrid.module.scss';

import { GatheringCard, useMainGathering } from '@/features';
import { Loader, TripleDot } from '@/shared/ui';

export const MainGatheringGrid = () => {
  const { items, isLoading, isError } = useMainGathering();
  console.log('메인게더링', items);

  if (isLoading) return <Loader />;
  if (isError) {
    return (
      <div>
        <Loader />
        에러가 발생했습니다.
      </div>
    );
  }

  // 데이터가 없는 경우
  if (!items || items.length === 0) {
    return (
      <div>
        <TripleDot />
        충분한 데이터가 모일 때까지 잠시만 기다려 주세요.
      </div>
    );
  }
  return (
    <div className={styles.grid}>
      {items.map(gathering => (
        <GatheringCard key={gathering.gatheringId} {...gathering} />
      ))}
    </div>
  );
};
