import styles from './GatheringSelectCon.module.scss';

import { gatheringFilterOptions } from '@/features';
import { SelectBtn } from '@/shared/ui';

interface SelectConfig {
  key: keyof typeof gatheringFilterOptions;
  isMulti: boolean;
  placeholder: string;
}

export const GatheringSelectCon = () => {
  const selectConfigs: SelectConfig[] = [
    {
      key: 'processType',
      isMulti: false,
      placeholder: '진행 방식',
    },
    {
      key: 'term',
      isMulti: false,
      placeholder: '진행 기간',
    },
    {
      key: 'position',
      isMulti: true,
      placeholder: '포지션',
    },
    {
      key: 'recruitment',
      isMulti: false,
      placeholder: '모집 인원',
    },
  ];

  return (
    <div className={styles.container}>
      {selectConfigs.map(config => (
        <SelectBtn
          isMulti={config.isMulti}
          key={config.key}
          options={gatheringFilterOptions[config.key]}
          placeholder={config.placeholder}
          value={null}
        />
      ))}
    </div>
  );
};
