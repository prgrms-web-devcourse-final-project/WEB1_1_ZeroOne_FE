// SelectBtn.tsx는 그대로 유지하고, GatheringSelectCon을 수정합니다

import styles from './GatheringSelectCon.module.scss';

import { gatheringFilterOptions } from '@/features';
import type { Option } from '@/shared/model/SelectBtnTypes';
import { SelectBtn } from '@/shared/ui';

// subject를 제외한 키만 허용하도록 타입 수정
type GatheringFilterKey = Exclude<keyof typeof gatheringFilterOptions, 'subject'>;

interface SelectConfig {
  key: GatheringFilterKey;
  isMulti: boolean;
  placeholder: string;
}

export const GatheringSelectCon = () => {
  const selectConfigs: SelectConfig[] = [
    {
      key: 'contact',
      isMulti: false,
      placeholder: '진행 방식',
    },
    {
      key: 'period',
      isMulti: false,
      placeholder: '진행 기간',
    },
    {
      key: 'position',
      isMulti: true,
      placeholder: '포지션',
    },
    {
      key: 'personnel',
      isMulti: false,
      placeholder: '모집 인원',
    },
  ];

  return (
    <div className={styles.container}>
      {selectConfigs.map(config => {
        // options가 Option[] 타입임을 보장
        const options = gatheringFilterOptions[config.key] as Option[];

        return (
          <SelectBtn
            isMulti={config.isMulti}
            key={config.key}
            options={options}
            placeholder={config.placeholder}
            value={config.isMulti ? [] : null}
          />
        );
      })}
    </div>
  );
};
