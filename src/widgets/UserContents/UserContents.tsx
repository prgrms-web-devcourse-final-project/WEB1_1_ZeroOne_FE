import styles from './UserContents.module.scss';
import { ArchiveGrid } from '../ArchiveGrid';
//import { GatheringGrid } from '../GatheringGrid';
import { ContentsTab } from './ContentsTab';
import { useUserTab } from './hook/useUserTab';

import type { ColorCountDTO } from '@/features';
import { ColorMap, useMyArchiveList, useUserArchiveColors } from '@/features';
//import type { GatheringItemDto } from '@/features/gathering/model/gathering.dto';
import { Loader } from '@/shared/ui';
import { PieChart } from '@/shared/ui/Chart/PieChart';

interface ArchiveContentProps {
  userId: number;
}

const ArchiveContent = ({ userId }: ArchiveContentProps) => {
  const { data: archives, isPending } = useMyArchiveList();
  const { data: colorData, isPending: isColorPending } = useUserArchiveColors(userId);

  if (!colorData?.data || isColorPending || isPending || !archives?.data) {
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
      <ArchiveGrid archives={archives?.data?.archives} />
    </div>
  );
};

const ContentComponents = {
  gathering: ArchiveContent,
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
