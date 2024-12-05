import { useNavigate } from 'react-router-dom';
import type { MultiValue, SingleValue } from 'react-select';

import styles from './GatheringSelectCon.module.scss';

import { gatheringFilterOptions } from '@/features';
import type {
  GatheringPeriod,
  GatheringPosition,
  GatheringPersonnel,
  GatheringContactType,
} from '@/features/gathering/model/dto/gathering.dto';
import type { Option } from '@/shared/model/SelectBtnTypes';
import { Button, SelectBtn } from '@/shared/ui';

type GatheringFilterKey = Exclude<keyof typeof gatheringFilterOptions, 'subject'>;

interface SelectConfig {
  key: GatheringFilterKey;
  isMulti: boolean;
  placeholder: string;
}

interface SelectFilters {
  contact?: GatheringContactType;
  period?: GatheringPeriod;
  positions?: GatheringPosition[];
  personnel?: GatheringPersonnel;
}

interface GatheringSelectConProps {
  onFilterChange?: (filters: Partial<SelectFilters>) => void;
}

export const GatheringSelectCon = ({ onFilterChange }: GatheringSelectConProps) => {
  const navigate = useNavigate();
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
      key: 'positions',
      isMulti: true,
      placeholder: '포지션',
    },
    {
      key: 'personnel',
      isMulti: false,
      placeholder: '모집 인원',
    },
  ];

  const handleSelectChange = (
    key: GatheringFilterKey,
    value: MultiValue<Option> | SingleValue<Option>,
  ) => {
    if (key === 'positions' && Array.isArray(value)) {
      // 다중 선택 처리
      const positions = value.map(option => option.value) as GatheringPosition[];
      onFilterChange?.({ [key]: positions.length > 0 ? positions : undefined });
    } else if (key === 'personnel' && value && 'value' in value) {
      // personnel은 숫자로 변환
      const numberValue = Number(value.value) as GatheringPersonnel;
      onFilterChange?.({ [key]: !isNaN(numberValue) ? numberValue : undefined });
    } else if (!Array.isArray(value) && value && 'value' in value) {
      // 나머지 단일 선택 처리
      onFilterChange?.({ [key]: value.value });
    } else {
      // 선택 해제된 경우
      onFilterChange?.({ [key]: undefined });
    }
  };

  return (
    <div className={styles.container}>
      {selectConfigs.map(config => {
        const options = gatheringFilterOptions[config.key] as Option[];

        return (
          <SelectBtn
            isMulti={config.isMulti}
            key={config.key}
            onChange={newValue => {
              handleSelectChange(config.key, newValue);
            }}
            options={options}
            placeholder={config.placeholder}
            value={config.isMulti ? [] : null}
          />
        );
      })}
      <Button
        onClick={() => {
          navigate('/gathering/write');
        }}
      >
        게더링 등록하기
      </Button>
    </div>
  );
};
