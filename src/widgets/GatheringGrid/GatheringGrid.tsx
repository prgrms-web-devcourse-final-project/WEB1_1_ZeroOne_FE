import styles from './GatheringGrid.module.scss';

import { GatheringCard, SelectBtn } from '@/shared/ui';
export const GatheringGrid = () => {
  return (
    <>
      <ul className={styles.list}>
        <GatheringCard
          deadline='deadline'
          introduction='introduction'
          name='name'
          tag={['tag1', 'tag2']}
          title='title'
        />
        <GatheringCard
          deadline='deadline'
          introduction='introduction'
          name='name'
          tag={['tag1', 'tag2']}
          title='title'
        />
        <GatheringCard
          deadline='deadline'
          introduction='introduction'
          name='name'
          tag={['tag1', 'tag2']}
          title='title'
        />
      </ul>
      <SelectBtn
        isMulti={false}
        onChange={option => {
          console.log(option);
        }}
        options={[
          { value: '1', label: '1' },
          { value: '2', label: '2' },
          { value: '3', label: '3' },
        ]}
        value={null}
      />
      <SelectBtn
        isMulti={true}
        onChange={option => {
          console.log(option);
        }}
        options={[
          { value: '1', label: '1' },
          { value: '2', label: '2' },
          { value: '3', label: '3' },
        ]}
        value={null}
      />
    </>
  );
};
