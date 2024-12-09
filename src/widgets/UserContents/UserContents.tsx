import styles from './UserContents.module.scss';
import { ArchiveGrid } from '../ArchiveGrid';
//import { GatheringGrid } from '../GatheringGrid';
import { ContentsTab } from './ContentsTab';
import { GatheringGrid } from '../GatheringGrid';
import { useUserTab } from './hook/useUserTab';

import type { ColorCountDTO } from '@/features';
import { ColorMap, useUserArchiveColors, useUserArchiveList } from '@/features';
//import type { GatheringItemDto } from '@/features/gathering/model/gathering.dto';
import { useUserGathering } from '@/features/gathering/lib/hooks/useUserGathering';
import { Loader } from '@/shared/ui';
import { PieChart } from '@/shared/ui/Chart/PieChart';

interface ContentProps {
  userId: number;
}

const ArchiveContent = ({ userId }: ContentProps) => {
  const { items: archives, isFetchingNextPage, isPending, ref } = useUserArchiveList(userId);
  const { data: colorData, isPending: isColorPending } = useUserArchiveColors(userId);

  if (!colorData?.data || isColorPending || isPending) {
    return <Loader />;
  }

  const convertToChartData = (data: ColorCountDTO) =>
    Object.entries(data).map(([color, value]) => ({
      id: color,
      value,
      label: color.toLocaleLowerCase(),
      color: ColorMap[color as keyof typeof ColorMap].hex,
    }));

  return (
    <div className={styles.colorTrendWrapper}>
      <div className={styles.colorTrendContainer}>
        <h2>나의 아카이브 현황</h2>
        <div>
          <PieChart data={convertToChartData(colorData.data)} />
        </div>
      </div>
      <ArchiveGrid archives={archives} isMine />
      <div ref={ref}>{isFetchingNextPage && <Loader />}</div>
    </div>
  );
};

const GatheringContent = ({ userId }: ContentProps) => {
  const { items: gatherings, isFetchingNextPage, isPending, ref } = useUserGathering(userId);
  console.log(gatherings);
  if (isPending) {
    return <Loader />;
  }

  return (
    <div>
      <GatheringGrid items={gatherings} />
      <div ref={ref}>{isFetchingNextPage && <Loader />}</div>
    </div>
  );
};

const ContentComponents = {
  gathering: GatheringContent,
  archive: ArchiveContent,
};

interface UserContentsProps {
  userId: number;
}

export const UserContents = ({ userId }: UserContentsProps) => {
  const { activeTab, isActive, setActiveTab } = useUserTab();

  const ContentComponent = ContentComponents[activeTab];

  return (
    <section className={styles.userContentSection}>
      <ContentsTab isActive={isActive} setActiveTab={setActiveTab} />

      <div className={styles.sectionContents}>
        <ContentComponent userId={userId} />
      </div>
    </section>
  );
};
