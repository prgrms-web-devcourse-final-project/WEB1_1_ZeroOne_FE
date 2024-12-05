import cn from 'classnames';

import styles from './NoticeContainer.module.scss';

import { NoticeItem } from '@/features/notification';

export const NoticeContainer = ({ isNotice }: { isNotice: boolean }) => {
  return (
    <div className={cn(styles.container, { [styles.visible]: isNotice })}>
      <NoticeItem type='LIKE' />
      <NoticeItem type='FEEDBACK' />
      <NoticeItem type='GATHERING' />
      <NoticeItem type='COFFEE_CHAT' />
    </div>
  );
};
