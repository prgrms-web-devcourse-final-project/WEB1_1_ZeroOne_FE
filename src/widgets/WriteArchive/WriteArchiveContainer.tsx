import type { PropsWithChildren } from 'react';

import styles from './WriteArchiveContainer.module.scss';

interface WriteArchiveContainerProps extends PropsWithChildren {
  guide: string;
  children: React.ReactNode;
}

export const WriteArchiveContainer = ({ guide, children }: WriteArchiveContainerProps) => {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2>아카이브 작성</h2>
        <p>{guide}</p>
      </div>
      <div className={styles.contents}>{children}</div>
    </section>
  );
};
