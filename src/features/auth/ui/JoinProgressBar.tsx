import cn from 'classnames';
import React from 'react';

import styles from './JoinProgressBar.module.scss';
import type { JoinProgressStage, StageState } from '../progress.type';

interface ProgressBarProps {
  currentStage: number;
  prevStage: number;
}

interface JoinProgressBarProps {
  currentStage: number;
  joinStages: JoinProgressStage[];
  dirtyStages: StageState[];
}

const ProgressDot = ({ dirty, stage, name }: JoinProgressStage & { dirty: StageState }) => {
  return (
    <div
      className={cn(styles.progressDot, {
        [styles.done]: dirty === 'done',
        [styles.dirty]: dirty === 'dirty',
      })}
    >
      <i>{stage}</i>
      <span>{name}</span>
    </div>
  );
};

const ProgressBar = ({ currentStage, prevStage }: ProgressBarProps) => {
  const isProgressed = currentStage > prevStage;

  return (
    <div className={styles.progressBar}>
      <div className={cn({ [styles.activeBar]: isProgressed })} />
    </div>
  );
};

export const JoinProgressbar = ({
  currentStage,
  joinStages,
  dirtyStages,
}: JoinProgressBarProps) => {
  return (
    <div className={styles.progressWrapper}>
      {joinStages.map((stage, idx) => (
        <React.Fragment key={stage.name}>
          <ProgressDot dirty={dirtyStages[idx]} name={stage.name} stage={stage.stage} />
          {idx !== joinStages.length - 1 && (
            <ProgressBar currentStage={currentStage} prevStage={stage.stage} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
